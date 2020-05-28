using System;

namespace Domain {
    public class UserTrainingClass {
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid TrainingClassId { get; set; }
        public TrainingClass TrainingClass { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}