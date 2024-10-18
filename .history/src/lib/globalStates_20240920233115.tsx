import { create } from 'zustand';

type useUserType = {
  user: userType,
  setUser: (user:userType)=> void,
}

export const useUser = create<useUserType>((set) => ({
  user: {
    id: "",
    username: "",
    krates:[],
  },
  setUser: (user:userType) => set({user:user}),
}))