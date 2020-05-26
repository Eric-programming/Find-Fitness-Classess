namespace Application.Interfaces
{
    public interface IJWTGen
    {
        string CreateToken(Domain.User user);
    }
}