using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Auth.GoogleLogin;
using Application.DTOs.Auth.Login;
using Application.DTOs.Auth.Register;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class authController : ControllerBase
    {
        private readonly IAuthService _authService;
        

        public authController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);

            if (result.Succeeded)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await _authService.LoginAsync(request);
            if (result.Succeeded)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            var result = await _authService.GoogleLoginAsync(request);
            if (result.Succeeded)
                return Ok(result);

            return BadRequest(result);
        }

    }
}