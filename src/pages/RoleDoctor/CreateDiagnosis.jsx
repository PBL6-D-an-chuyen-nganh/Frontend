import React, { useState, useEffect } from 'react'
import { FaUser, FaVenusMars, FaIdCard, FaHospital, FaUserMd } from 'react-icons/fa';
import Dropdown from '../../components/Dropdown';
import Btn from '../../components/Button';
import Toast from '../../components/Notification';
import { useAuthStore } from '../../store/useAuthStore';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { createDiagnosis } from '../../api/createDiagnosis';
import { getAppointmentByIdDoctor } from '../../api/getAppointmentByIdDoctor';

function CreateDiagnosis() {
    const user = useAuthStore((state) => state.user);
    const doctorId = user?.userId;
    const appointmentID = useAppointmentStore((state) => state.appointmentID);
    const [toast, setToast] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log("Doctor ID:", doctorId);
    console.log("AppointmentID nhận được:", appointmentID);  

    const initialFormData = {
        patientId: '',
        doctorUserId: '',
        disease: '',
        dateOfDiagnosis: new Date().toISOString().slice(0, 10),
        doctorNotes: '',
        treatmentPlan: '',
        appointmentId: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const [formPatientData, setFormPatientData] = useState({
        patientName: '',
        gender: '',
        patientId: '',
        doctorName: '',
        location: ''
    });

    useEffect(() => {
    const fetchDetail = async () => {
        if (!appointmentID) return;
        const data = await getAppointmentByIdDoctor(appointmentID);
        console.log("DATA APPOINTMENT:", data);
        if (data) {
        setFormPatientData(prev => ({
            ...prev,
            patientName: data.patientInfo?.name || '',
            gender: data.patientInfo?.gender || '',
            patientId: data.patientInfo?.id || '',
            doctorName: data.doctor?.name || '',
            location: data.doctor?.specialty || ''
        }));
        }
    };

    fetchDetail();
    }, [appointmentID]);

    const handleSave = async () => {
        if (!appointmentID) {
            setToast({
                message: 'Không tìm thấy ID lịch hẹn.',
                type: 'error'
            });
            return;
        }

        const today = new Date().toISOString().slice(0, 10);

        const diagnosisData = {
            patientId: formPatientData.patientId,
            doctorUserId: doctorId,
            disease: formData.description,        
            dateOfDiagnosis: today,
            doctorNotes: formData.conclusion,
            treatmentPlan: formData.treatmentPlan,
            appointmentId: formPatientData.patientId
        };
        console.log("PAYLOAD GỬI LÊN:", diagnosisData);

        try {
            const res = await createDiagnosis(diagnosisData);
            setIsSubmitting(true);
            if (res) {
                setToast({
                    message: 'Lưu chẩn đoán thành công!',
                    type: 'success'
                });
                setFormData(initialFormData);
                }

        } catch (err) {
            console.error("Lỗi lưu chẩn đoán:", err);
            setToast({
                message: 'Lưu chẩn đoán không thành công.',
                type: 'error'
            });
        }
    };  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleReset = () => {
        setFormPatientData({
            patientName: '',
            gender: '',
            patientId: '',
            doctorName: '',
            location: ''
        });

        setFormData({
            disease: '',
            doctorNotes: '',
            description: '',
            conclusion: '',
            dateOfDiagnosis: new Date().toISOString().slice(0, 10),
            doctorUserId: '',
            treatmentPlan: ''
        });
    };


    const genderOptions = [
        { id: 'Male', label: 'Nam' },
        { id: 'Female', label: 'Nữ' },
        { id: 'Other', label: 'Khác' }
    ]

    const getSelectedLabel = (options, value, defaultText) => {
        const selected = options.find((opt) => opt.id === value)
        return selected ? selected.label : defaultText
    }

    const handleDropdownSelect = (option) => {
        setFormData((prev) => ({
        ...prev,
        gender: option.id
        }))
    }



  return (
     <div className="min-h-screen bg-gray-50 p-8">
        {toast && (
                <Toast
                  message={toast.message}
                  type={toast.type}
                  onClose={() => {
                  setToast(null)
                  setIsSubmitting(false) 
                }}
                />
        )}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-900 text-center mb-8">
          PHIẾU KẾT QUẢ CHẨN ĐOÁN
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-green-900 mb-6">THÔNG TIN BỆNH NHÂN:</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center font-medium mb-2">
                <FaUser className="mr-2 text-green-900" />
                Tên bệnh nhân:
              </label>
              <input
                type="text"
                name="patientName"
                value={formPatientData.patientName}
                onChange={handleChange}
                className="w-full px-4 py-2 from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300"
                placeholder="Nhập tên bệnh nhân"
              />
            </div>

            <div>
              <label className="flex items-center font-medium mb-2">
                <FaVenusMars className="mr-2 text-green-900" />
                Giới tính:
              </label>
                <Dropdown
                  options={genderOptions}
                  selected={getSelectedLabel(genderOptions, formPatientData.gender, 'Chọn giới tính')}
                  onSelect={handleDropdownSelect}
                />
            </div>

            <div>
              <label className="flex items-center font-medium mb-2">
                <FaIdCard className="mr-2 text-green-900" />
                Mã bệnh nhân:
              </label>
              <input
                type="text"
                name="patientId"
                value={formPatientData.patientId}
                onChange={handleChange}
                className="w-full px-4 py-2 from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300"
                placeholder="Nhập mã bệnh nhân"
              />
            </div>

            <div>
              <label className="flex items-center font-medium mb-2">
                <FaUserMd className="mr-2 text-green-900" />
                Bác sĩ chỉ định:
              </label>
              <input
                type="text"
                name="doctorName"
                value={formPatientData.doctorName}
                onChange={handleChange}
                className="w-full px-4 py-2 from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300"
                placeholder="Nhập tên bác sĩ"
              />
            </div>

            <div className="">
              <label className="flex items-center font-medium mb-2">
                <FaHospital className="mr-2 text-green-900" />
                Nơi chỉ định:
              </label>
              <input
                type="text"
                name="location"
                value={formPatientData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300"
                placeholder="Nhập nơi chỉ định"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">MÔ TẢ</h2>
          <div className="bg-green-50 border-l-4 border-green-900 p-4 rounded">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300 resize-none"
              placeholder="Nhập mô tả..."
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">KẾT LUẬN</h2>
          <div className="bg-green-50 border-l-4 border-green-900 p-4 rounded">
            <textarea
              name="conclusion"
              value={formData.conclusion}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300 resize-none"
              placeholder="Nhập kết luận..."
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">ĐIỀU TRỊ</h2>
          <div className="bg-green-50 border-l-4 border-green-900 p-4 rounded">
            <textarea
              name="treatmentPlan"
              value={formData.treatmentPlan}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-300 resize-none"
              placeholder="Nhập hướng dẫn..."
            />
          </div>
        </div>

        {/* --- Phần đã chỉnh sửa --- */}
        {/* Container cha dùng justify-end để đẩy cả khối sang phải */}
        <div className="mt-12 flex justify-end">
            {/* Container con dùng flex-col items-center để căn giữa chữ Bác sĩ và nhóm nút */}
            <div className="flex flex-col items-center">
                
                {/* Phần ký tên */}
                <div className="flex flex-col items-center mb-8">
                    <p className="text-green-900 font-bold text-lg mb-16">BÁC SĨ</p>
                    <p className="text-lg font-bold text-gray-800">{formPatientData.doctorName}</p>
                </div>

                {/* Phần các nút bấm */}
                <div className="flex gap-4">
                    <Btn
                        title={"Đặt lại"}
                        onClick={handleReset}
                    />
                    <Btn
                        title={"Hủy"}
                        path={`/doctor/${doctorId}/appointments`}
                        disabled={isSubmitting}
                    />
                    <Btn
                        title={"Lưu"}
                        onClick={handleSave}
                        path={`/doctor/${doctorId}/patients`}
                    />
                </div>
            </div>
        </div>
        {/* ------------------------- */}
      </div>
    </div>
  )
}

export default CreateDiagnosis