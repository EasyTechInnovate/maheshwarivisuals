import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
    devtools(
        (set) => ({
            // User data
            user: null,

            // Auth state
            isAuthenticated: false,
            isLoading: true,

            // Actions
            setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),

            setAuthenticated: (isAuthenticated) => set({ isAuthenticated, isLoading: false }),

            setLoading: (isLoading) => set({ isLoading }),

            clearAuth: () => set({ user: null, isAuthenticated: false, isLoading: false }),
        }),
        { name: 'AuthStore' }
    )
);
