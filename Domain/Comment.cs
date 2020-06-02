using System;

namespace Domain {
    public class Comment {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public User Author { get; set; }
        public TrainingClass TrainingClass { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}