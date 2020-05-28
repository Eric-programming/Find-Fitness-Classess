using System;

namespace Domain
{
    public class UserTrainingClass
    {
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public Guid TrainingClassId { get; set; }
        public virtual TrainingClass TrainingClass { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}