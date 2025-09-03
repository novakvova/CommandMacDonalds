import React, { useState } from 'react';
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
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2 transition-colors">
                <Avatar
                    size={32}
                    style={{ 
                        backgroundColor: '#dc2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}
                >
                    {getUserInitials()}
                </Avatar>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                    {getUserName()}
                </span>
            </div>
        </Dropdown>
    );
};

export default UserProfile;
