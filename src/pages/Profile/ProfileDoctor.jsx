import React, { useEffect, useState } from 'react';
import { FaUser, FaPhone, FaEdit, FaCheck, FaTimes, FaGraduationCap, FaBriefcase, FaTrophy } from 'react-icons/fa';
import Btn from '../../components/Button';
import Toast from '../../components/Notification';
import { ChangePasswordModal } from '../../components/Modal/ChangePassModal';
import { updateDoctorProfile } from '../../api/updateDoctorProfile';
import { getDoctorProfile } from '../../api/getDoctorProfile';
import { changePassDoctor } from '../../api/changePassDoctor';

export default function DoctorProfile() {
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [doctorData, setDoctorData] = useState({
        userId: null,
        name: '', 
        phoneNumber: '',
        yoe: 0,
        introduction: '',
        degree: '',
        achievements: ''
    });

    const [editingField, setEditingField] = useState(null); 
    const [editValues, setEditValues] = useState({
        name: '',
        phoneNumber: '',
        yoe: 0,
        introduction: '',
        degree: '',
        achievements: ''
    });
    
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await getDoctorProfile();
                if (response) {
                    const profile = response;
                    setDoctorData({
                        userId: profile.userId,
                        name: profile.name || '',
                        phoneNumber: profile.phoneNumber || '',
                        yoe: profile.yoe || 0,
                        introduction: profile.introduction || '',
                        degree: profile.degree || '',
                        achievements: profile.achievements || ''
                    });
                    setEditValues({
                        name: profile.name || '',
                        phoneNumber: profile.phoneNumber || '',
                        yoe: profile.yoe || 0,
                        introduction: profile.introduction || '',
                        degree: profile.degree || '',
                        achievements: profile.achievements || ''
                    });
                }
            } catch (error) {
                setToast({ type: 'error', message: 'Không thể tải thông tin bác sĩ' });
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        checkForChanges(editValues);
    }, [editValues]);   

    const handleEditClick = (field) => {
        setEditingField(field);
    };

    const handleCancelEdit = (field) => {
        const originalValue = doctorData[field];
        const newEditValues = {
            ...editValues,
            [field]: originalValue
        };
        setEditValues(newEditValues);
        setEditingField(null);
        checkForChanges(newEditValues);
    };

    const handleConfirmEdit = (field) => {
        setEditingField(null); 
    };

    const handleInputChange = (field, value) => {
        const newEditValues = {
            ...editValues,
            [field]: value
        };
        setEditValues(newEditValues);
    };

    const checkForChanges = (values) => {
        const changed = 
            values.name !== doctorData.name || 
            values.phoneNumber !== doctorData.phoneNumber ||
            values.yoe !== doctorData.yoe ||
            values.introduction !== doctorData.introduction ||
            values.degree !== doctorData.degree ||
            values.achievements !== doctorData.achievements;
        setHasChanges(changed);
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            const payload = {
                userId: doctorData.userId,
                name: editValues.name,
                phoneNumber: editValues.phoneNumber,
                yoe: editValues.yoe,
                introduction: editValues.introduction,
                degree: editValues.degree,
                achievements: editValues.achievements,
            };
            const updatedProfile = await updateDoctorProfile(payload);
            if (updatedProfile?.error) {
                setToast({ type: "error", message: updatedProfile.error });
                return;
            }
            setDoctorData({
                userId: updatedProfile.userId,
                name: updatedProfile.name || "",
                phoneNumber: updatedProfile.phoneNumber || "",
                yoe: updatedProfile.yoe || 0,
                introduction: updatedProfile.introduction || "",
                degree: updatedProfile.degree || "",
                achievements: updatedProfile.achievements || "",
            });
            setEditValues({
                name: updatedProfile.name || "",
                phoneNumber: updatedProfile.phoneNumber || "",
                yoe: updatedProfile.yoe || 0,
                introduction: updatedProfile.introduction || "",
                degree: updatedProfile.degree || "",
                achievements: updatedProfile.achievements || "",
            });
            setHasChanges(false);
            setEditingField(null);
            setToast({
                type: "success",
                message: "Cập nhật thông tin bác sĩ thành công",
            });
        } catch (err) {
            setToast({
                type: "error",
                message: "Có lỗi xảy ra khi cập nhật thông tin",
            });
        } finally {
            setLoading(false);
        }
    };

    // --- Xử lý thay đổi mật khẩu ---
    const handleChangePassword = async (passwordData) => {
        // passwordData bao gồm { oldPassword, newPassword } được truyền từ Modal
        try {
            // Kiểm tra userId có tồn tại không
            if (!doctorData.userId) {
                setToast({ type: 'error', message: 'Không tìm thấy thông tin người dùng' });
                return;
            }

            setLoading(true);
            
            const payload = {
                userId: doctorData.userId,
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            };

            const response = await changePassDoctor(payload);

            if (response?.error) {
                setToast({ type: 'error', message: response.error });
            } else {
                setToast({ type: 'success', message: 'Đổi mật khẩu thành công!' });
                setIsPasswordModalOpen(false); // Đóng modal khi thành công
            }
        } catch (error) {
            setToast({ type: 'error', message: 'Lỗi hệ thống khi đổi mật khẩu' });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !doctorData.userId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600 text-xl">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
                <div className="h-32 relative">
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                            <div className="w-full h-full rounded-full flex items-center justify-center">
                                <FaUser className="text-green-900 text-5xl" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-20 pb-8 px-8">
                    {/* Name Section */}
                    <div className="flex items-center justify-center gap-3 mb-2 min-h-12">
                        {editingField === 'name' ? (
                            <>
                                <input
                                    type="text"
                                    value={editValues.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="text-3xl font-bold text-gray-800 text-center border-b-2 border-green-900 focus:outline-none px-2 bg-transparent w-full"
                                    autoFocus
                                />
                                <button onClick={() => handleConfirmEdit('name')} className="text-green-700 hover:text-green-900 p-1">
                                    <FaCheck size={20} />
                                </button>
                                <button onClick={() => handleCancelEdit('name')} className="text-red-600 hover:text-red-700 p-1">
                                    <FaTimes size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold text-gray-800 text-center">
                                    {editValues.name}
                                </h1>
                                <button onClick={() => handleEditClick('name')} className="text-gray-400 hover:text-green-900 transition-colors p-1">
                                    <FaEdit size={20} />
                                </button>
                            </>
                        )}
                    </div>

                    <div className="border-t border-gray-200 my-6"></div>

                    <div className="space-y-4">
                        {/* Phone Section */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaPhone className="text-white text-lg" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Số điện thoại</p>
                                {editingField === 'phoneNumber' ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={editValues.phoneNumber}
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                            className="text-gray-800 font-medium border-b-2 border-green-900 focus:outline-none flex-1 bg-transparent"
                                            autoFocus
                                        />
                                        <button onClick={() => handleConfirmEdit('phoneNumber')} className="text-green-700 hover:text-green-900">
                                            <FaCheck />
                                        </button>
                                        <button onClick={() => handleCancelEdit('phoneNumber')} className="text-red-600 hover:text-red-700">
                                            <FaTimes />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-800 font-medium flex-1">{editValues.phoneNumber}</p>
                                        <button onClick={() => handleEditClick('phoneNumber')} className="text-gray-400 hover:text-green-900 transition-colors">
                                            <FaEdit />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Degree Section */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center    ">
                                <FaGraduationCap className="text-white text-lg" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Học vị</p>
                                {editingField === 'degree' ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={editValues.degree}
                                            onChange={(e) => handleInputChange('degree', e.target.value)}
                                            className="text-gray-800 font-medium border-b-2 border-green-900 focus:outline-none flex-1 bg-transparent"
                                            autoFocus
                                        />
                                        <button onClick={() => handleConfirmEdit('degree')} className="text-green-700 hover:text-green-900">
                                            <FaCheck />
                                        </button>
                                        <button onClick={() => handleCancelEdit('degree')} className="text-red-600 hover:text-red-700">
                                            <FaTimes />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-800 font-medium flex-1">{editValues.degree}</p>
                                        <button onClick={() => handleEditClick('degree')} className="text-gray-400 hover:text-green-900 transition-colors">
                                            <FaEdit />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Years of Experience Section */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center">
                                <FaBriefcase className="text-white text-lg" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Số năm kinh nghiệm</p>
                                {editingField === 'yoe' ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={editValues.yoe}
                                            onChange={(e) => handleInputChange('yoe', parseInt(e.target.value) || 0)}
                                            className="text-gray-800 font-medium border-b-2 border-green-900 focus:outline-none flex-1 bg-transparent"
                                            autoFocus
                                        />
                                        <button onClick={() => handleConfirmEdit('yoe')} className="text-green-700 hover:text-green-900">
                                            <FaCheck />
                                        </button>
                                        <button onClick={() => handleCancelEdit('yoe')} className="text-red-600 hover:text-red-700">
                                            <FaTimes />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-800 font-medium flex-1">{editValues.yoe} năm</p>
                                        <button onClick={() => handleEditClick('yoe')} className="text-gray-400 hover:text-green-900 transition-colors">
                                            <FaEdit />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Introduction Section */}
                        <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center">
                                    <FaUser className="text-white text-lg" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Giới thiệu</p>
                                        {editingField !== 'introduction' && (
                                            <button onClick={() => handleEditClick('introduction')} className="text-gray-400 hover:text-green-900 transition-colors">
                                                <FaEdit />
                                            </button>
                                        )}
                                    </div>
                                    {editingField === 'introduction' ? (
                                        <div>
                                            <textarea
                                                value={editValues.introduction}
                                                onChange={(e) => handleInputChange('introduction', e.target.value)}
                                                className="w-full text-gray-800 border-2 border-green-900 focus:outline-none p-2 rounded-lg bg-white min-h-24"
                                                autoFocus
                                            />
                                            <div className="flex gap-2 mt-2">
                                                <button onClick={() => handleConfirmEdit('introduction')} className="text-green-700 hover:text-green-900 px-3 py-1 ">
                                                    <FaCheck/>
                                                </button>
                                                <button onClick={() => handleCancelEdit('introduction')} className="text-red-600 hover:text-red-700 px-3 py-1">
                                                    <FaTimes/> 
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-800 whitespace-pre-wrap">{editValues.introduction}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Achievements Section */}
                        <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center">
                                    <FaTrophy className="text-white text-lg" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Thành tích</p>
                                        {editingField !== 'achievements' && (
                                            <button onClick={() => handleEditClick('achievements')} className="text-gray-400 hover:text-green-900 transition-colors">
                                                <FaEdit />
                                            </button>
                                        )}
                                    </div>
                                    {editingField === 'achievements' ? (
                                        <div>
                                            <textarea
                                                value={editValues.achievements}
                                                onChange={(e) => handleInputChange('achievements', e.target.value)}
                                                className="w-full text-gray-800 border-2 border-green-900 focus:outline-none p-2 rounded-lg bg-white min-h-[120px]"
                                                autoFocus
                                            />
                                            <div className="flex gap-2 mt-2">
                                                <button onClick={() => handleConfirmEdit('achievements')} className="text-green-700 hover:text-green-900 px-3 py-1 ">
                                                    <FaCheck/> 
                                                </button>
                                                <button onClick={() => handleCancelEdit('achievements')} className="text-red-600 hover:text-red-700 px-3 py-1">
                                                    <FaTimes/>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-800 whitespace-pre-wrap">{editValues.achievements}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="mt-8 flex justify-center gap-3 w-full">
                            <Btn
                                title="Lưu chỉnh sửa"
                                onClick={handleSaveChanges}
                                disabled={!hasChanges || loading || editingField !== null}
                                className={`rounded-lg flex-1 h-12 font-medium transition-all duration-200 focus:outline-none
                                    ${hasChanges && !loading && editingField === null
                                        ? 'bg-green-900 text-white hover:bg-green-800 cursor-pointer shadow-md' 
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {loading ? 'Đang lưu...' : 'Lưu chỉnh sửa'}
                            </Btn>
                            {/* Nút mở Modal đổi mật khẩu */}
                            <Btn
                                title="Đổi mật khẩu"
                                onClick={() => setIsPasswordModalOpen(true)}
                            />
                        </div>
                </div>
            </div>
            
            {/* Modal Thay Đổi Mật Khẩu */}
            <ChangePasswordModal 
                isOpen={isPasswordModalOpen} 
                onClose={() => setIsPasswordModalOpen(false)} 
                onSave={handleChangePassword} 
            />

            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}