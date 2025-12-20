import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Btn from '../../components/Button';
import Toast from '../../components/Notification';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { ChangePasswordModal } from '../../components/Modal/ChangePassModal';
import { GetProfileUser } from '../../api/getProfileUser';
import { UpdateProfile } from '../../api/updateProfile';
import { DeleteAccountUser } from '../../api/deleteAccountUser';
import { ChangePassword } from '../../api/changePassUser';

export default function UserProfile() {
    const [toast, setToast] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState({
        userId: null,
        name: '',
        email: '',
        phoneNumber: '',
        role: '',
        authStatus: ''
    });

    const [editingField, setEditingField] = useState(null); 
    const [editValues, setEditValues] = useState({
        name: '',
        phoneNumber: '',
    });
    
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { profile, error } = await GetProfileUser();
                if (error) {
                    setToast({ type: 'error', message: error });
                } else if (profile) {
                    setUserData({
                        userId: profile.userId,
                        name: profile.name,
                        email: profile.email,
                        phoneNumber: profile.phoneNumber,
                        role: profile.role,
                        authStatus: profile.authStatus
                    });
                    setEditValues({
                        name: profile.name || '',
                        phoneNumber: profile.phoneNumber || '',
                    });
                }
            } finally {
                setIsFetching(false);
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
        const originalValue = userData[field];
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
        const changed = values.name !== userData.name || values.phoneNumber !== userData.phoneNumber;
        setHasChanges(changed);
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        const payload = {
            ...userData,
            name: editValues.name,
            phoneNumber: editValues.phoneNumber
        };
        const { data, error } = await UpdateProfile(payload);
        if (error) {
            setToast({ type: 'error', message: error });
        } else {
            setUserData(payload);
            setHasChanges(false);
            setEditingField(null); 
            setToast({ type: 'success', message: 'Cập nhật thông tin thành công!' });
        }
        setLoading(false);
    };

    const handleChangePasswordSubmit = async (passwordData) => {
        const { message, error } = await ChangePassword(passwordData);

        if (error) {
            setToast({ type: 'error', message: error });
        } else {
            setIsPasswordModalOpen(false);
            setToast({ type: 'success', message: 'Đổi mật khẩu thành công!' });
        }
    };

    const onDelete = async () => {
        setIsConfirmOpen(false);
        try {
            setLoading(true);
            const { error } = await DeleteAccountUser();
            if (error) {
            setToast({ type: 'error', message: `Xoá tài khoản thất bại: ${error}` });
            return;
            }
            localStorage.clear();
            sessionStorage.clear();
            document.cookie.split(";").forEach((c) => {
            const cookieName = c.split("=")[0].trim();
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            });

            setToast({ type: 'success', message: 'Tài khoản đã được xoá thành công.' });
            window.location.replace('/accounts/login');
        }finally {
            setLoading(false);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmOpen(false);
    };

    if (isFetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-gray-500 text-lg font-medium">Đang tải...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-xl w-full">
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
                                <button onClick={() => handleConfirmEdit('name')} className="text-green-700 hover:text-green-900 p-1 cursor-pointer">
                                    <FaCheck size={20} />
                                </button>
                                <button onClick={() => handleCancelEdit('name')} className="text-red-600 hover:text-red-700 p-1 cursor-pointer">
                                    <FaTimes size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold text-gray-800 text-center">
                                    {editValues.name}
                                </h1>
                                <button onClick={() => handleEditClick('name')} className="text-gray-400 hover:text-green-900 transition-colors p-1 cursor-pointer">
                                    <FaEdit size={20} />
                                </button>
                            </>
                        )}
                    </div>

                    <div className="border-t border-gray-200 my-6"></div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center">
                                <FaEnvelope className="text-white text-lg" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                                <p className="text-gray-800 font-medium truncate">{userData.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center">
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
                                        <button onClick={() => handleConfirmEdit('phoneNumber')} className="text-green-700 hover:text-green-900 cursor-pointer">
                                            <FaCheck />
                                        </button>
                                        <button onClick={() => handleCancelEdit('phoneNumber')} className="text-red-600 hover:text-red-700 cursor-pointer">
                                            <FaTimes />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-800 font-medium flex-1">{editValues.phoneNumber}</p>
                                        <button onClick={() => handleEditClick('phoneNumber')} className="text-gray-400 hover:text-green-900 transition-colors cursor-pointer">
                                            <FaEdit />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button
                            onClick={handleSaveChanges}
                            disabled={!hasChanges || loading || editingField !== null}
                            className={`rounded-lg flex-1 h-12 font-medium transition-all duration-200 focus:outline-none
                                ${hasChanges && !loading && editingField === null
                                    ? 'bg-green-900 text-white hover:bg-green-800 cursor-pointer shadow-md' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {loading ? 'Đang lưu...' : 'Lưu chỉnh sửa'}
                        </button>
                        
                        <Btn
                            title="Đổi mật khẩu"
                            onClick={() => setIsPasswordModalOpen(true)}
                        />
                        
                        <button
                            onClick={() => setIsConfirmOpen(true)}
                            className="rounded-lg w-40 h-12 font-medium transition-all duration-200 bg-red-800 text-white border-red-800 hover:bg-white hover:text-red-800 focus:outline-none hover:border-red-800 cursor-pointer border-2"
                        >
                            Xoá tài khoản
                        </button>
                    </div>
                </div>

                <ConfirmModal
                    isOpen={isConfirmOpen}
                    onConfirm={onDelete}
                    onCancel={handleCancelDelete}
                    label={"XOÁ TÀI KHOẢN"}
                    question={`Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.`}
                    confirmLabel="Xóa"
                    cancelLabel="Hủy"
                />

                <ChangePasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                    onSave={handleChangePasswordSubmit}
                />
            </div>
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