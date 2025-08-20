using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebMacDonalds.Data;
using WebMacDonalds.Models.Users;

namespace WebMacDonalds.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(AppDbAutoriaContext dbContext,
        IMapper mapper) : ControllerBase
    {
        [HttpGet("list")]
        public async Task<IActionResult> GetUsers()
        {
            var items = await dbContext.Users
                .ProjectTo<UserItemModel>(mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(items);
        }
    }
}
