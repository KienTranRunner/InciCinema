using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Auth.GoogleLogin;
using Application.DTOs.Auth.Login;
using Application.DTOs.Auth.Register;

namespace Application.Interfaces
{
    public interface IAuthService
    {
        Task<RegisterResponse> RegisterAsync(RegisterRequest request);
        Task<LoginResponse> LoginAsync(LoginRequest request);

        Task<LoginResponse> GoogleLoginAsync(GoogleLoginRequest request);



    }
}