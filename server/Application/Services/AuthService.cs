using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Auth.GoogleLogin;
using Application.DTOs.Auth.Login;
using Application.DTOs.Auth.Register;
using Application.Interfaces;
using Google.Apis.Auth;
using Infrastructure.Indentity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole<string>> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole<string>> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
                {
                    return new LoginResponse
                    {
                        Succeeded = false,
                        Errors = new List<string> { "Người dùng hoặc mật khẩu không hợp lệ." }
                    };
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]);
                var roles = await _userManager.GetRolesAsync(user);
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.UserName)
                };

                claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(1),
                    Issuer = _configuration["JWT:ValidIssuer"],
                    Audience = _configuration["JWT:ValidAudience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                string tokenString = tokenHandler.WriteToken(token);

                return new LoginResponse
                {
                    Succeeded = true,
                    Token = tokenString
                };
            }
            catch (Exception ex)
            {
                return new LoginResponse
                {
                    Succeeded = false,
                    Errors = new List<string> { $"Đã xảy ra lỗi: {ex.Message}" }
                };
            }
        }

        public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            try
            {
                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = request.Username,
                    Email = request.Email,
                    FullName = request.FullName
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    if (!await _roleManager.RoleExistsAsync("Guest"))
                    {
                        var createRoleResult = await _roleManager.CreateAsync(new IdentityRole<string>("Guest"));
                        if (!createRoleResult.Succeeded)
                        {
                            return new RegisterResponse
                            {
                                Succeeded = false,
                                Errors = createRoleResult.Errors.Select(e => e.Description)
                            };
                        }
                    }

                    var roleResult = await _userManager.AddToRoleAsync(user, "Guest");

                    if (!roleResult.Succeeded)
                    {
                        return new RegisterResponse
                        {
                            Succeeded = false,
                            Errors = roleResult.Errors.Select(e => e.Description)
                        };
                    }
                }

                return new RegisterResponse
                {
                    Succeeded = result.Succeeded,
                    Errors = result.Errors.Select(e => e.Description)
                };
            }
            catch (Exception ex)
            {
                return new RegisterResponse
                {
                    Succeeded = false,
                    Errors = new List<string> { $"Xảy ra lỗi: {ex.Message}" }
                };
            }

        }

        public async Task<LoginResponse> GoogleLoginAsync(GoogleLoginRequest request)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.IdToken);
                if (payload == null)
                {
                    return new LoginResponse
                    {
                        Succeeded = false,
                        Errors = new List<string> { "Google token không hợp lệ." }
                    };
                }

                var email = payload.Email;
                var user = await _userManager.FindByEmailAsync(email);

                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        Id = Guid.NewGuid().ToString(), 
                        UserName = email,
                        Email = email,
                        FullName = payload.Name
                    };

                    var createResult = await _userManager.CreateAsync(user);
                    if (!createResult.Succeeded)
                    {
                        return new LoginResponse
                        {
                            Succeeded = false,
                            Errors = createResult.Errors.Select(e => e.Description).ToList()
                        };
                    }

                    if (!await _roleManager.RoleExistsAsync("Guest"))
                    {
                        var roleCreateResult = await _roleManager.CreateAsync(new IdentityRole<string>("Guest"));
                        if (!roleCreateResult.Succeeded)
                        {
                            return new LoginResponse
                            {
                                Succeeded = false,
                                Errors = roleCreateResult.Errors.Select(e => e.Description).ToList()
                            };
                        }
                    }

                    var roleAddResult = await _userManager.AddToRoleAsync(user, "Guest");
                    if (!roleAddResult.Succeeded)
                    {
                        return new LoginResponse
                        {
                            Succeeded = false,
                            Errors = roleAddResult.Errors.Select(e => e.Description).ToList()
                        };
                    }
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]);
                var roles = await _userManager.GetRolesAsync(user);

                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName)
        };

                claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role))); 

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(1),
                    Issuer = _configuration["JWT:ValidIssuer"],
                    Audience = _configuration["JWT:ValidAudience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return new LoginResponse
                {
                    Succeeded = true,
                    Token = tokenString
                };
            }
            catch (Exception ex)
            {
                return new LoginResponse
                {
                    Succeeded = false,
                    Errors = new List<string> { $"Đã xảy ra lỗi: {ex.Message}" }
                };
            }
        }




    }
}