import { create } from "zustand";

export const useAppointmentStore = create((set) => ({
  appointmentID: null,
  setAppointmentID: (appointmentID) => set({ appointmentID: appointmentID })
}));
