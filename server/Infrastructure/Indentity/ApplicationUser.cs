using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Indentity
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string FullName { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
        
    }
}