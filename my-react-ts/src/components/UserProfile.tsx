import React, { useState } from 'react';
//@ts-ignore
import { Avatar, Dropdown, Menu, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const menuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Мій профіль',
            onClick: handleProfileClick
        },
        {
            type: 'divider' as const
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Вийти',
            onClick: handleLogout
        }
    ];

    const getUserInitials = () => {
        if (!user) return 'U';
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    const getUserName = () => {
        if (!user) return 'Користувач';
        return `${user.firstName} ${user.lastName}`;
    };

    return (
        <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            trigger={['click']}
            open={isDropdownVisible}
            onOpenChange={setIsDropdownVisible}
        >
            <div className="user-profile-btn">
                <Avatar
                    size={32}
                    className="user-avatar"
                >
                    {getUserInitials()}
                </Avatar>
                <span className="user-name">
                    {getUserName()}
                </span>
            </div>
        </Dropdown>
    );
};

export default UserProfile;
