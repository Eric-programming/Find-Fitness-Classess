namespace Application.DTO {
    public class OutputUserProfile {

        public string FullName { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
        public string Bio { get; set; }
        public bool isFollowed { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}