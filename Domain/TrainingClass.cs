using System;
using System.Collections.Generic;

namespace Domain
{
    public class TrainingClass
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Time { get; set; }
        public int DayOfWeek { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string Province { get; set; }
        public int TotalSpots { get; set; }
        public ICollection<UserTrainingClass> UserTrainingClasses { get; set; }
        // public virtual ICollection<UserActivity> UserActivities { get; set; }
        // public virtual ICollection<Comment> Comments { get; set; }
    }
}