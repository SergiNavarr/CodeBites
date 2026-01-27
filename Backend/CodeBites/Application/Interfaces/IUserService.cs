using Application.DTOs.User;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<UserResponseDto> RegisterAsync(UserRegisterDto userRegisterDto);
        Task<UserLoginResponseDto> LoginAsync(UserLoginDto userLoginDto);
        Task<UserResponseDto> GetByIdAsync(Guid userId);
        Task<UserProfileDto> GetUserProfileAsync(Guid userId);
    }
}
