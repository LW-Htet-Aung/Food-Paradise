/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserType = {
  user: { name: string } | null;
  handleLogin: (data: any) => void;
  handleLogout: () => void;
};
export const useAuthStore = create<UserType>()(
  persist(
    (set) => ({
      user: null,
      handleLogin: (data) => set(() => ({ user: data })),
      handleLogout: () => {
        set(() => ({ user: null }));
      },
    }),
    {
      name: "recipe-user-store",
      getStorage: () => localStorage,
    }
  )
);
