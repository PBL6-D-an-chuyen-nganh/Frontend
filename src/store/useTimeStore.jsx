import { create } from 'zustand';

const useTimeStore = create((set) => ({
  busySlots: [],
  setBusySlots: (slots) => set({ busySlots: slots }),
  clearBusySlots: () => set({ busySlots: [] })
}));


export default useTimeStore;