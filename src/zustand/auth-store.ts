import api from "@/lib/api";
import { UserProfile } from "@/typing/api";
import { create } from "zustand";

type AuthUserState = {
  authUser?: UserProfile | null;
  token?: string | null;
  setToken: (token: string) => void;
  setAuthUser: (profile: UserProfile) => void;
  logout: () => void;
};

const useAuthUser = create<AuthUserState>()((set) => ({
  authUser: null,
  token: null,
  setToken: (token) => set((state) => ({ ...state, token: token })),
  setAuthUser: (profile) => {
    set((state) => ({ ...state, authUser: profile }));
  },
  logout: async () => {
    await api.logout();
    window.location.reload();
    set({ authUser: null });
  },
}));

export default useAuthUser;
