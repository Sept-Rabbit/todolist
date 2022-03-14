import create from "zustand";

export const useStore = create(
  persist((set) => ({
    list: [],
    addTodo: (newTodo) => {
      set((state) => ({
        list: (state.list = [newTodo, ...state.list]),
      }));
    },
    deleteTodo: (id) => {
      set((state) => {
        list: state.list = state.list.filter((l) => l.id !== id);
      });
    },
  }))
);
