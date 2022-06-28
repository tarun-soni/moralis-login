import create from "zustand";

import { User } from "../types";

interface AppState {
  user: User;
  isAuthenticated: boolean;
  storeUser: (user: User) => void;
  removeUser: () => void;
}

export const useStore = create<AppState>((set) => ({
  // initial state
  user: null,
  isAuthenticated: false,

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
}));

// addTodo: (description: string) => {
//   set((state) => ({
//     todos: [
//       ...state.todos,
//       {
//         id: Math.random().toString(),
//         description,
//         completed: false,
//       } as Todo,
//     ],
//   }));
// },

// removeTodo: (id) => {
//   set((state) => ({
//     todos: state.todos.filter((todo) => todo.id !== id),
//   }));
// },

// toggleCompletedState: (id) => {
//   set((state) => ({
//     todos: state.todos.map((todo) =>
//       todo.id === id
//         ? ({ ...todo, completed: !todo.completed } as Todo)
//         : todo
//     ),
//   }));
// },
