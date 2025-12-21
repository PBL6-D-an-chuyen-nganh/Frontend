import { create } from "zustand";

const getTodayLocal = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const usePatientFilterStore = create((set) => ({
  date: getTodayLocal(),
  patients: [],
  setDate: (date) => set({ date }),
  setPatients: (patients) => set({ patients }),
  reset: () =>
    set({
      date: getTodayLocal(),
      patients: [],
    }),
}));
