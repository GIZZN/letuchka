export interface Tour {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  category: 'popular' | 'exotic' | 'europe';
  features: string[];
  bookingDate?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    theme: 'light' | 'dark';
  };
  favoriteDestinations?: string[];
  bookedTours?: Tour[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
} 