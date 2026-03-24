import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = authService.getCurrentUser();
                const token = authService.getAccessToken();

                if (currentUser && token) {
                    // Set user immediately, don't wait for token validation
                    setUser(currentUser);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            setLoading(true);
            const response = await authService.login(credentials);
            const { user: loggedInUser } = response;
            
            console.log('Login response:', response);
            console.log('Logged in user:', loggedInUser);
            
            setUser(loggedInUser);
            setIsAuthenticated(true);
            toast.success('Başarıyla giriş yapıldı!');
            
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            setUser(null);
            setIsAuthenticated(false);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await authService.register(userData);
            toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
            return response;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            toast.info('Çıkış yapıldı');
        } catch (error) {
            console.error('Logout failed:', error);
            // Clear state even if logout request fails
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (passwordData) => {
        try {
            const response = await authService.changePassword(passwordData);
            toast.success('Şifre başarıyla değiştirildi');
            return response;
        } catch (error) {
            console.error('Password change failed:', error);
            throw error;
        }
    };

    const refreshAuthToken = async () => {
        try {
            const response = await authService.refreshToken();
            return response;
        } catch (error) {
            console.error('Token refresh failed:', error);
            await logout();
            throw error;
        }
    };

    // Check if user has specific role
    const hasRole = (role) => {
        if (!user) return false;
        
        // Check different possible role structures
        if (user.roles && Array.isArray(user.roles)) {
            return user.roles.includes(role);
        }
        
        if (user.role && typeof user.role === 'string') {
            return user.role === role;
        }
        
        if (user.role && user.role.name) {
            return user.role.name === role;
        }
        
        return false;
    };

    // Check if user is admin
    const isAdmin = () => {
        return hasRole('Admin') || hasRole('admin');
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        changePassword,
        refreshAuthToken,
        hasRole,
        isAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;