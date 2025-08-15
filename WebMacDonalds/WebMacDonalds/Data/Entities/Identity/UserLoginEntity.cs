using Microsoft.AspNetCore.Identity;

namespace WebMacDonalds.Data.Entities.Identity;

public class UserLoginEntity : IdentityUserLogin<long>
{
    public UserEntity User { get; set; }
}
