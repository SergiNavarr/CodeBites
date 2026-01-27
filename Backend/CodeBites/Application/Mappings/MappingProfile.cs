using Application.DTOs.Category;
using Application.DTOs.Lesson;
using Application.DTOs.Quiz;
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
            CreateMap<User, UserResponseDto>()
                .ForMember(dest => dest.ActiveCategoriesCount,
                    opt => opt.MapFrom(src => src.UserCategories.Count));
            CreateMap<User, UserRegisterDto>().ReverseMap();
            CreateMap<UserLoginDto, User>();
            CreateMap<User, UserLoginResponseDto>();
            CreateMap<UserAchievement, UserAchievementDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Achievement.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Achievement.Description))
                .ForMember(dest => dest.IconUrl, opt => opt.MapFrom(src => src.Achievement.IconUrl));
            CreateMap<User, UserProfileDto>()
                .ForMember(dest => dest.ActiveCategoriesCount, opt => opt.MapFrom(src => src.UserCategories.Count))
                .ForMember(dest => dest.CompletedLessonsCount, opt => opt.MapFrom(src => src.Progress.Count))
                .ForMember(dest => dest.Achievements, opt => opt.MapFrom(src => src.Achievements));

            // Category Mappings
            CreateMap<Category, CategoryResponseDto>()
                .ForMember(dest => dest.LessonsCount, opt => opt.MapFrom(src => src.Lessons.Count));
            
            CreateMap<Category, CategoryDetailDto>();

            // Lesson Mappings
            CreateMap<Lesson, LessonResponseDto>();
            CreateMap<Lesson, LessonDetailDto>();

            // Quiz Mappings
            CreateMap<Quiz, QuizDetailDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.LessonId));
            CreateMap<Question, QuestionDto>();
            CreateMap<Option, OptionDto>();
        }
    }
}
