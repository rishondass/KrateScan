import { create } from 'zustand';

type useUserType = {
  user: userType,
  setUser: (user:userType)=> void,
}

type useKrateType = {
  krates: krateType[],
  setKrates: (krates:krateType[])=> void
}

export const useUser = create<useUserType>((set) => ({
  user: {
    id: "",
    username: "",
    krates:[],
  },
  setUser: (user:userType) => set({user:user}),
}))

export const useKrates = create<useKrateType>((set)=>({
  krates: [],
  setKrates: (krates:krateType[])=> set({krates:[]}),
}))