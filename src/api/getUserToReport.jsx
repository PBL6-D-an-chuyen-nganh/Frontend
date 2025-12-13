import { axiosPrivate } from "./axios";

export const GetUsetToReport = async () => {  
  const response = await axiosPrivate.get(
    "/api/admin/statistics/cancellations"
  );
  return response.data; 
};
