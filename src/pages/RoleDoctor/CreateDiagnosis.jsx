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
    const [errors, setErrors] = useState({});

    const initialFormData = {
        description: '',
        conclusion: '',
        treatmentPlan: ''
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
            if (data) {
                setFormPatientData({
                    patientName: data.patientInfo?.name || '',
                    gender: data.patientInfo?.gender || '',
                    patientId: data.patientInfo?.id || '',
                    doctorName: data.doctor?.name || '',
                    location: data.doctor?.specialty || ''
                });
            }
        };
        fetchDetail();
    }, [appointmentID]);

    const validateForm = () => {
        const newErrors = {};

        if (!formPatientData.patientName.trim()) newErrors.patientName = 'Vui lòng nhập tên bệnh nhân';
        if (!formPatientData.gender) newErrors.gender = 'Vui lòng chọn giới tính';
        if (!formPatientData.patientId.trim()) newErrors.patientId = 'Vui lòng nhập mã bệnh nhân';
        if (!formData.description.trim()) newErrors.description = 'Vui lòng nhập mô tả';
        if (!formData.conclusion.trim()) newErrors.conclusion = 'Vui lòng nhập kết luận';
        if (!formData.treatmentPlan.trim()) newErrors.treatmentPlan = 'Vui lòng nhập hướng điều trị';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;
        if (!appointmentID) {
            setToast({ message: 'Không tìm thấy ID lịch hẹn.', type: 'error' });
            return;
        }

        const payload = {
            patientId: formPatientData.patientId,
            doctorUserId: doctorId,
            disease: formData.description,
            doctorNotes: formData.conclusion,
            treatmentPlan: formData.treatmentPlan,
            appointmentId: appointmentID,
            dateOfDiagnosis: new Date().toISOString().slice(0, 10)
        };

        try {
            setIsSubmitting(true);
            await createDiagnosis(payload);
            setToast({ message: 'Lưu chẩn đoán thành công!', type: 'success' });
            setFormData(initialFormData);
            setErrors({});
        } catch (err) {
            setToast({ message: 'Lưu chẩn đoán không thành công.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const genderOptions = [
        { id: 'Male', label: 'Nam' },
        { id: 'Female', label: 'Nữ' },
        { id: 'Other', label: 'Khác' }
    ];

    const getSelectedLabel = (options, value, defaultText) => {
        const selected = options.find((opt) => opt.id === value);
        return selected ? selected.label : defaultText;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}

            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-green-900 text-center mb-8">PHIẾU KẾT QUẢ CHẨN ĐOÁN</h1>

                {/* TÊN BỆNH NHÂN */}
                <input
                    value={formPatientData.patientName}
                    onChange={(e) => {
                        setFormPatientData({ ...formPatientData, patientName: e.target.value });
                        setErrors({ ...errors, patientName: '' });
                    }}
                    className="w-full border p-2 rounded"
                    placeholder="Tên bệnh nhân"
                />
                {errors.patientName && <p className="text-red-600 text-sm">{errors.patientName}</p>}

                {/* GIỚI TÍNH */}
                <Dropdown
                    options={genderOptions}
                    selected={getSelectedLabel(genderOptions, formPatientData.gender, 'Chọn giới tính')}
                    onSelect={(opt) => {
                        setFormPatientData({ ...formPatientData, gender: opt.id });
                        setErrors({ ...errors, gender: '' });
                    }}
                />
                {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}

                {/* MÔ TẢ */}
                <textarea
                    value={formData.description}
                    onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        setErrors({ ...errors, description: '' });
                    }}
                    className="w-full border p-2 rounded mt-4"
                    placeholder="Mô tả"
                />
                {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}

                {/* KẾT LUẬN */}
                <textarea
                    value={formData.conclusion}
                    onChange={(e) => {
                        setFormData({ ...formData, conclusion: e.target.value });
                        setErrors({ ...errors, conclusion: '' });
                    }}
                    className="w-full border p-2 rounded mt-4"
                    placeholder="Kết luận"
                />
                {errors.conclusion && <p className="text-red-600 text-sm">{errors.conclusion}</p>}

                {/* ĐIỀU TRỊ */}
                <textarea
                    value={formData.treatmentPlan}
                    onChange={(e) => {
                        setFormData({ ...formData, treatmentPlan: e.target.value });
                        setErrors({ ...errors, treatmentPlan: '' });
                    }}
                    className="w-full border p-2 rounded mt-4"
                    placeholder="Hướng điều trị"
                />
                {errors.treatmentPlan && <p className="text-red-600 text-sm">{errors.treatmentPlan}</p>}

                <div className="flex justify-end gap-4 mt-8">
                    <Btn title="Lưu" onClick={handleSave} disabled={isSubmitting} />
                </div>
            </div>
        </div>
    );
}

export default CreateDiagnosis;
