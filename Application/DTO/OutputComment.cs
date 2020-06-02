using System;

namespace Application.DTO {
    public class OutputComment {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public string userName { get; set; }
        public string fullName { get; set; }
        public string Image { get; set; }
    }
}