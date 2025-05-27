using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Auth.Login
{
    public class LoginResponse
    {
        public bool Succeeded { get; set; }
        public string Token { get; set; } 
        public IEnumerable<string> Errors { get; set; }
    }
}