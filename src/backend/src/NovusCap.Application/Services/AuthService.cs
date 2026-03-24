using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using NovusCap.Application.DTOs;
using NovusCap.Application.DTOs.Auth;
using NovusCap.Application.Interfaces;
using NovusCap.Domain.Entities;
using NovusCap.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
// Using Domain's IJwtService explicitly
using IJwtService = NovusCap.Domain.Interfaces.IJwtService;

namespace NovusCap.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;

        public AuthService(
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IUnitOfWork unitOfWork,
            IJwtService jwtService,
            IMapper mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
            _mapper = mapper;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            if (user.IsDeleted)
            {
                throw new UnauthorizedAccessException("User account is not active.");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var token = _jwtService.GenerateToken(user.Id.ToString(), user.Email, roles);
            var refreshToken = _jwtService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            user.LastLoginDate = DateTime.UtcNow;

            await _userManager.UpdateAsync(user);

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Roles = roles.ToList();

            return new AuthResponseDto
            {
                Token = token,
                RefreshToken = refreshToken,
                User = userDto
            };
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("User with this email already exists.");
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                IsDeleted = false
                // CreatedAt otomatik olarak ayarlanıyor
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"User registration failed: {errors}");
            }

            // Assign default role
            await _userManager.AddToRoleAsync(user, "User");

            var roles = await _userManager.GetRolesAsync(user);
            var token = _jwtService.GenerateToken(user.Id.ToString(), user.Email, roles);
            var refreshToken = _jwtService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _userManager.UpdateAsync(user);

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Roles = roles.ToList();

            return new AuthResponseDto
            {
                Token = token,
                RefreshToken = refreshToken,
                User = userDto
            };
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
        {
            // Refresh token'ı veritabanında arayarak kullanıcıyı bul
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
            
            if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                throw new UnauthorizedAccessException("Invalid or expired refresh token.");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var newToken = _jwtService.GenerateToken(user.Id.ToString(), user.Email, roles);
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _userManager.UpdateAsync(user);

            return new AuthResponseDto
            {
                Token = newToken,
                RefreshToken = newRefreshToken,
                User = _mapper.Map<UserDto>(user)
            };
        }

        public async Task<bool> LogoutAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user != null)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = null;
                var result = await _userManager.UpdateAsync(user);
                return result.Succeeded;
            }
            return false;
        }

        public async Task<bool> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return false;
            }

            var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
            return result.Succeeded;
        }

        public async Task<bool> ForgotPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                // Güvenlik nedeniyle kullanıcı bulunamasa bile true döndürüyoruz
                return true;
            }

            // Gerçek uygulamada, şifre sıfırlama token'ı oluşturup e-posta gönderme işlemi yapılacaktır
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            
            // Burada e-posta gönderme işlemi yapılacaktır
            // Mail servisi entegrasyonu gerekecektir
            
            return true;
        }

        public async Task<bool> ResetPasswordAsync(string token, string newPassword)
        {
            // Token içerisinden kullanıcı bilgisini çıkarmalıyız
            // Gerçek uygulamada token içerisinde kullanıcı ID'si veya e-posta adresi olacaktır
            // Basit bir implementasyon için token'ı e-posta adresi olarak kabul ediyoruz
            
            var user = await _userManager.FindByEmailAsync(token);
            if (user == null)
            {
                return false;
            }
            
            // Normalde token, _userManager.GeneratePasswordResetTokenAsync ile oluşturulmuş bir token olacaktır
            // Ve ResetPasswordAsync metodu ile doğrulanacaktır
            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, resetToken, newPassword);
            
            return result.Succeeded;
        }

        public async Task<UserDto?> GetCurrentUserAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return null;
            }
            
            var userDto = _mapper.Map<UserDto>(user);
            var roles = await _userManager.GetRolesAsync(user);
            userDto.Roles = roles.ToList();
            
            return userDto;
        }

        public async Task<bool> ValidateTokenAsync(string token)
        {
            // Since the method is marked as async, we should use an awaitable operation.  
            // If no asynchronous operation is required, we can remove the async modifier and return a Task directly.  
            return await Task.FromResult(_jwtService.ValidateToken(token));
        }
    }
}