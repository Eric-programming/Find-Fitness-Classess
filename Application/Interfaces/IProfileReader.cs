using System.Threading.Tasks;
using Application.DTO;
using Application.UserProfile;

namespace Application.Interfaces {
    public interface IProfileReader {
        Task<OutputUserProfile> ReadProfile (string username);
    }
}