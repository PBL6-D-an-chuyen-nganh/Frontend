import { create } from 'zustand';

const useDateStore = create((set) => ({
  busyDates: [],
  setBusyDates: (dates) => set({ busyDates: dates }),
  clearBusyDates: () => set({ busyDates: [] })
}));


export default useDateStore;