﻿namespace WebMacDonalds.Models.Account
{
    public class LoginModel
    {
        /// <summary>
        /// Електронна пошта користувача
        /// </summary>
        /// <example>admin@example.com</example>
        public string Email { get; set; } = string.Empty;
        /// <summary>
        /// Пароль користувача
        /// </summary>
        /// <example>Admin123!</example>
        public string Password { get; set; } = string.Empty;
    }
}
