using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebMacDonalds.Data;
using WebMacDonalds.Data.Entities.Identity;
using WebMacDonalds.Interfaces;
using WebMacDonalds.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<AppDbAutoriaContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
})
    .AddEntityFrameworkStores<AppDbAutoriaContext>()
    .AddDefaultTokenProviders();


builder.Services.AddControllers();

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
