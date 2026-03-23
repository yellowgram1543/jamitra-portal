import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('janmitra_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (mobile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        localStorage.setItem('janmitra_user', JSON.stringify(data));
        return { success: true };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('janmitra_user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: user.mobile, ...profileData })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        localStorage.setItem('janmitra_user', JSON.stringify(data));
        return { success: true };
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (error) {
      toast.error(error.message);
      return { success: false, error: error.message };
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
