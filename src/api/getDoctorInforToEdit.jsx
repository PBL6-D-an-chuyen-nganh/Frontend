import { axiosPrivate } from "./axios";

export const editDoctorInfor = async (doctorId) => {
    const url = `/api/admin/doctors/${doctorId}/edit-info`;
    const response = await axiosPrivate.get(url);
    return response.data;
}