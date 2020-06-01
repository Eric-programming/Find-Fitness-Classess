using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser
    {
        public string photoUrl { get; set; }
        public string photoId { get; set; }
        public string FullName { get; set; }
        public string Bio { get; set; }
        public ICollection<UserTrainingClass> UserTrainingClasses { get; set; }
    }
}