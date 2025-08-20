using AutoMapper;
using WebMacDonalds.Data.Entities.Identity;
using WebMacDonalds.Models.Users;

namespace WebMacDonalds.Mapper;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<UserEntity, UserItemModel>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));
    }
}
