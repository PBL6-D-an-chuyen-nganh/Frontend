import { create } from 'zustand'

const useDoctorStore = create((set) => ({
  doctorsBySpecialty: {},
  setDoctorsBySpecialty: (specialtyId, doctors) => 
    set((state) => ({
      doctorsBySpecialty: {
        ...state.doctorsBySpecialty,
        [specialtyId]: doctors
      }
    }))
}))

export default useDoctorStore
