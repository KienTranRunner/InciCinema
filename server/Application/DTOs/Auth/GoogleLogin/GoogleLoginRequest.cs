using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Auth.GoogleLogin
{
    public class GoogleLoginRequest
    {
        public string IdToken { get; set; }
    }
}