import { create } from "zustand";

type UserState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null, // Initially no user
  setUser: (user) => set(() => ({ user })),
}));
