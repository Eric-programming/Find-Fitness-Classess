using Microsoft.AspNetCore.Identity;

namespace Domain {
    public class User : IdentityUser {
        public string FullName { get; set; }

    }
}