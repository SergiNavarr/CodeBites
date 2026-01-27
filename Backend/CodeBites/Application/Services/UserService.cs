using Application.DTOs.User;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public UserService(IUserRepository userRepository, IMapper mapper, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        public async Task<UserResponseDto> RegisterAsync(UserRegisterDto userRegisterDto)
        {
            // Validar si el usuario ya existe
            var existingUser = await _userRepository.GetByEmailAsync(userRegisterDto.Email);
            if (existingUser != null)
            {
                throw new Exception("El email ya está registrado.");
            }

            // Mapear DTO a Entidad de Dominio
            var user = _mapper.Map<User>(userRegisterDto);

            // Hashear la contraseña antes de guardar
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userRegisterDto.Password);

            // Asignar un rol predeterminado
            user.RoleId = Guid.Parse("a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d");

            // Guardar en la base de datos
            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            // Mapear la entidad creada al DTO de respuesta
            return _mapper.Map<UserResponseDto>(user);
        }

        public async Task<UserLoginResponseDto> LoginAsync(UserLoginDto userLoginDto)
        {
            var user = await _userRepository.GetByEmailAsync(userLoginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(userLoginDto.Password, user.PasswordHash))
            {
                throw new Exception("Email o contraseña incorrectos.");
            }

            // Mapeamos los datos básicos del usuario
            var response = _mapper.Map<UserLoginResponseDto>(user);

            // Generamos el Token y lo asignamos al DTO
            response.Token = _tokenService.CreateToken(user);

            return response;
        }

        public async Task<bool> DeactivateAccountAsync(Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return false;

            user.IsActive = false;
            await _userRepository.SaveChangesAsync();
            return true;
        }

        public async Task<UserResponseDto> GetByIdAsync(Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new Exception("Usuario no encontrado.");
            return _mapper.Map<UserResponseDto>(user);
        }

        public async Task<UserProfileDto> GetUserProfileAsync(Guid userId)
        {
            var user = await _userRepository.GetUserWithDetailsAsync(userId);
            if (user == null) throw new Exception("Usuario no encontrado");

            var profile = _mapper.Map<UserProfileDto>(user);

            profile.RecentActivities = user.Progress
                .OrderByDescending(p => p.CompletedAt)
                .Take(5)
                .Select(p => new RecentActivityDto
                {
                    Title = $"Completó: {p.Lesson.Title}",
                    Date = p.CompletedAt,
                    PointsGained = p.Lesson.PointsReward
                }).ToList();

            return profile;
        }
    }
}
