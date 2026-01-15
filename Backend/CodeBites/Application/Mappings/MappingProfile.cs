using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Application.DTOs.User;
using Domain.Entities;

namespace Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserResponseDto>();
            CreateMap<User, UserRegisterDto>().ReverseMap();
            CreateMap<UserLoginDto, User>();
            CreateMap<User, UserLoginResponseDto>();
        }
    }
}
