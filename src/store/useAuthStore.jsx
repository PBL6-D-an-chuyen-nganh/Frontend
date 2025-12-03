import { create } from 'zustand';
import Cookies from 'js-cookie';

const syncCookies = (state) => {
  const { token, user } = state;

  if (token) Cookies.set('token', token);
  else Cookies.remove('token');

  if (user) Cookies.set('user', JSON.stringify(user));
  else Cookies.remove('user');
};

export const useAuthStore = create((set, get) => ({
  token: Cookies.get('token') || null,
  user: (() => {
    const stored = Cookies.get('user');
    if (!stored) return null;
    return JSON.parse(stored);
  })(),

  login: ({ token, user }) => {
    console.log("typeof token in store:", typeof token, token);
    set({ token, user });
    syncCookies(get());
  },

  logout: () => {
    set({ token: null, user: null });
    syncCookies(get());
  },

  updateUser: (updates) => {
    set((state) => {
      const merged = { ...state.user, ...updates };
      return { user: merged };
    });

    syncCookies(get());
    return get().user;
  },

  setToken: (token) => {
    set({ token });
    syncCookies(get());
  },
}));
