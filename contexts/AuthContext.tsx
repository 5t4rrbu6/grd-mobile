import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { User, ShiftStatus, Settings } from '@/types';
import { mockUser, defaultSettings } from '@/mocks/data';

const AUTH_KEY = '@auth_user';
const SETTINGS_KEY = '@app_settings';

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shiftStatus, setShiftStatus] = useState<ShiftStatus>({
    status: 'not_checked_in',
    nextShiftSite: 'No Site',
    nextShiftDateTime: 'No Shift',
  });
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    loadAuthState();
    loadSettings();
  }, []);

  const loadAuthState = async () => {
    try {
      const stored = await AsyncStorage.getItem(AUTH_KEY);
      if (stored) {
        const userData = JSON.parse(stored);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        const userData = { ...mockUser, email };
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
      setUser(null);
      setIsAuthenticated(false);
      setShiftStatus({
        status: 'not_checked_in',
        nextShiftSite: 'No Site',
        nextShiftDateTime: 'No Shift',
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const checkIn = async (site: string) => {
    const now = new Date();
    setShiftStatus({
      status: 'checked_in',
      site,
      checkInTime: now.toLocaleString(),
      checkOutTime: new Date(now.getTime() + 8 * 60 * 60 * 1000).toLocaleString(),
    });
  };

  const checkOut = async () => {
    setShiftStatus({
      status: 'not_checked_in',
      nextShiftSite: 'No Site',
      nextShiftDateTime: 'No Shift',
    });
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    shiftStatus,
    settings,
    drawerOpen,
    login,
    logout,
    checkIn,
    checkOut,
    updateSettings,
    toggleDrawer,
    closeDrawer,
  };
});
