import { create } from "zustand";

type NavState = {
  sidebarOpen: boolean;
  isMobile: boolean;
  setSidebarOpen: (open: boolean) => void;
  setIsMobile: (mobile: boolean) => void;
  toggleSidebar: () => void;
};

export const useNavStore = create<NavState>((set) => ({
  sidebarOpen: true,
  isMobile: false,
  setSidebarOpen: (open) => set(() => ({ sidebarOpen: open })),
  setIsMobile: (mobile) => set(() => ({ isMobile: mobile })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
