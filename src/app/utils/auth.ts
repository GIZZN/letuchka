import { User, LoginData, RegisterData } from '../types/user';

const USERS_KEY = 'travel_app_users';
const CURRENT_USER_KEY = 'travel_app_current_user';

export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const register = (data: RegisterData): User | null => {
  const users = getUsers();
  
  if (users.some(user => user.email === data.email)) {
    throw new Error('Пользователь с таким email уже существует');
  }

  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: data.email,
    name: data.name,
    phone: data.phone,
    preferences: {
      notifications: true,
      newsletter: true,
      theme: 'light'
    },
    favoriteDestinations: []
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  return newUser;
};

export const login = (data: LoginData): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === data.email);

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const updateUser = (userData: Partial<User>): User => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Пользователь не авторизован');
  }

  const users = getUsers();
  const updatedUser = { ...currentUser, ...userData };
  
  const updatedUsers = users.map(user => 
    user.id === currentUser.id ? updatedUser : user
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

  return updatedUser;
}; 