import { create } from "zustand";
export const usePatientFilterStore = create((set) => ({
  date: new Date().toISOString().slice(0, 10),
  patients: [],
  setDate: (date) => set({ date }),
  setPatients: (patients) => set({ patients }),
  reset: () =>
    set({
      date: new Date().toISOString().slice(0, 10),
      patients: [],
    }),
}));
