using WebMacDonalds.Data.Entities.Identity;

namespace WebMacDonalds.Interfaces
{
    public interface IJwtTokenService
    {
        Task<string> CreateTokenAsync(UserEntity user);
    }
}
