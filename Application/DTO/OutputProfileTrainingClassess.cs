using System;

namespace Application.DTO
{
    public class OutputProfileTrainingClassess
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Time { get; set; }
        public int dayOfWeek { get; set; }
    }
}