using Application.DTOs.Category;
using Application.DTOs.Lesson;
using Application.DTOs.User;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User Mappings
            CreateMap<User, UserResponseDto>();
            CreateMap<User, UserRegisterDto>().ReverseMap();
            CreateMap<UserLoginDto, User>();
            CreateMap<User, UserLoginResponseDto>();

            // Category Mappings
            CreateMap<Category, CategoryResponseDto>()
            .ForMember(dest => dest.LessonsCount, opt => opt.MapFrom(src => src.Lessons.Count));

            CreateMap<Category, CategoryDetailDto>();

            // Lesson Mappings
            CreateMap<Lesson, LessonResponseDto>();
        }
    }
}
