using System.Threading.Tasks;
using Application.UserProfile;

namespace Application.Interfaces
{
    public interface IProfileReader
    {
        Task<ProfileModel> ReadProfile(string username);
    }
}