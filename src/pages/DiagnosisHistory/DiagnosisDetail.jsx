import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaUserMd, FaUser, FaVenusMars, FaIdCard, FaHospital } from 'react-icons/fa';
import Btn from '../../components/Button';
import { useAuthStore} from '../../store/useAuthStore';
import { getDiagnosisDetailByUser } from '../../api/getDiagnosisDetailByUser';
import { useReactToPrint } from 'react-to-print';

export default function DiagnosisDetail() {
    const { diagnosisId } = useParams();
    const user = useAuthStore((state) => state.user);
    const [diagnosisDetail, setDiagnosisDetail] = useState(null);
    const printRef = useRef(null);

    useEffect(() => {
        const fetchDiagnosisDetailByUser = async () => {
            try {
                const data = await getDiagnosisDetailByUser(diagnosisId);
                setDiagnosisDetail(data);
            } catch (error) {
                console.error("Error fetching diagnosis detail:", error);
            }
        };
        fetchDiagnosisDetailByUser();
    }, [diagnosisId]);

      const handlePrint = useReactToPrint({
      contentRef: printRef,
      documentTitle: `phieu-chan-doan-${diagnosisId}`,
    });

  if (!diagnosisDetail) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-2">
        <p className="max-w-6xl mx-auto gap-3 mb-6 text-center text-gray-500 mt-10">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div 
        ref={printRef}
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center text-green-900 mb-8">
          PHIẾU KẾT QUÁ CHẨN ĐOÁN 
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">THÔNG TIN BỆNH NHÂN:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaUser className="text-green-900 mr-3" />
              <div>
                <span className="font-semibold">Tên bệnh nhân:</span>
                <span className="ml-2">{diagnosisDetail.patientName}</span>
              </div>
            </div>

            <div className="flex items-center">
              <FaVenusMars className="text-green-900 mr-3" />
              <div>
                <span className="font-semibold">Giới tính:</span>
                <span className="ml-2">{diagnosisDetail.gender}</span>
              </div>
            </div>

            <div className="flex items-center">
              <FaIdCard className="text-green-900 mr-3" />
              <div>
                <span className="font-semibold">Mã bệnh nhân:</span>
                <span className="ml-2">{diagnosisDetail.diagnosisID}</span>
              </div>
            </div>

            <div className="flex items-center">
              <FaUserMd className="text-green-900 mr-3" />
              <div>
                <span className="font-semibold">Bác sĩ chỉ định:</span>
                <span className="ml-2">{diagnosisDetail.doctorName}</span>
              </div>
            </div>

            <div className="flex items-center md:col-span-2">
              <FaHospital className="text-green-900 mr-3" />
              <div>
                <span className="font-semibold">Nơi chỉ định:</span>
                <span className="ml-2">{diagnosisDetail.speciality}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">MÔ TẢ</h2>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-900">
            <p className="text-gray-700 leading-relaxed">{diagnosisDetail.doctorNotes}</p>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">KẾT LUẬN</h2>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-900">
            <div className="space-y-3">
              <p className="text-gray-800 font-semibold">{diagnosisDetail.disease}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">ĐIỀU TRỊ</h2>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-900">
            <div className="space-y-3">
              <p className="text-gray-800 font-semibold">{diagnosisDetail.treatmentPlan}</p>
            </div>
          </div>
        </div>

        {/* Doctor Signature */}
        <div className="mt-12">
          <p className="text-green-900 font-bold text-lg mb-1 text-right mr-28">BÁC SĨ</p>
          <div className='flex items-end justify-end gap-2'>
            <p className='text-lg font-bold text-gray-800 mt-16'>{diagnosisDetail.degree}</p>
            <p className="text-lg font-bold text-gray-800 mt-16">{diagnosisDetail.doctorName}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 mr-32 flex gap-4 justify-end">
            <Btn
              title={"Quay lại"}
              path={`/diagnosis-history/${user?.userId}`}
            />

            <Btn
              title={"In phiếu kết quả"}
              onClick={() => handlePrint()} 
            />
        </div>
    </div>
  );
}