namespace Application.DTO
{
    public class OutputTrainingClassessQueryParams
    {
        public bool isGoing { get; set; }
        public bool isHost { get; set; }
#nullable enable
        public int? skip { get; set; }
        public int? take { get; set; }
        public string? StartTime { get; set; }


    }
}