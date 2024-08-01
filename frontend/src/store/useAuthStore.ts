/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "../helpers/axios";
export type UserType = {
  user: any | null;
  handleLogin: (data: any) => void;
  handleLogout: () => void;
  fetchCurrentUser: () => Promise<void>;
};
export const useAuthStore = create<UserType>()((set) => ({
  user: null,
  handleLogin: (data) => set(() => ({ user: data })),
  handleLogout: () => {
    set(() => ({ user: null }));
  },
  fetchCurrentUser: async () => {
    try {
      const res = await axios.get(`/api/users/token`);
      set(() => ({ user: res.data }));
      return res.data;
    } catch (error) {
      set(() => ({ user: null }));
      return error;
    }
  },
}));
