import create from "zustand";

import { User } from "../types";

export type ImageMetaData = {
  name: "";
  description: "";
  image: "";
};

interface ChainData {
  imageUploadAddress: string;
}
interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  storeUser: (user: User) => void;
  removeUser: () => void;
  imageMetaData: ImageMetaData | null;
  setImageMetaData: (imageMetaData: ImageMetaData) => void;
  chainData: ChainData;
}

export const useStore = create<AppState>((set) => ({
  // initial state
  user: null,
  isAuthenticated: false,
  imageMetaData: null,
  chainData: {
    imageUploadAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },

  // methods for manipulating state
  storeUser: (user: User) => {
    console.log("user store", user);
    set((state) => ({
      ...state,
      isAuthenticated: true,
      user,
    }));
  },

  removeUser: () => {
    set((state) => ({
      ...state,
      isAuthenticated: false,
      user: null,
    }));
  },

  setImageMetaData: (imageMetaData: ImageMetaData) => {
    set((state) => ({
      ...state,
      imageMetaData,
    }));
  },
}));
