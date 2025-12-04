import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { registerDoctorSchedule } from "../../api/registerDoctorSchedule";
import DateSelector from "../../components/RoleDoctor/Schedule/DateSelector";
import ShiftSelector from "../../components/RoleDoctor/Schedule/ShiftSelector";
import SelectedList from "../../components/RoleDoctor/Schedule/SelectedList";
import SubmitButton from "../../components/RoleDoctor/Schedule/SubmitButton";
import { getNextWeekDates } from "../../components/RoleDoctor/Schedule/GetNextWeekDays";
import { FiCalendar} from "react-icons/fi";

function ScheduleRegister() {
    const { doctorId } = useParams();
    const [weekDates, setWeekDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedShifts, setSelectedShifts] = useState([]);
    const [selections, setSelections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const dates = getNextWeekDates();
        setWeekDates(dates);
        if (dates.length > 0) {
            setSelectedDate(dates[0].date);
        }
    }, []);

    const toggleShift = (shift) => {
        setSelectedShifts((prev) =>
            prev.includes(shift) ? prev.filter((s) => s !== shift) : [...prev, shift]
        );
    };

    const addSelection = () => {
        if (!selectedDate) {
            setMessage("Vui lòng chọn ngày làm việc.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        if (selections.some((sel) => sel.workDate === selectedDate)) {
            setMessage("Ngày này đã được chọn rồi.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        if (selectedShifts.length === 0) {
            setMessage("Vui lòng chọn ít nhất một ca làm việc.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        setSelections((prev) => [
            ...prev,
            { workDate: selectedDate, shifts: [...selectedShifts] },
        ]);
        setSelectedShifts([]);
        setMessage("");
    };

    const removeSelection = (workDate) => {
        setSelections((prev) => prev.filter((sel) => sel.workDate !== workDate));
    };

    const handleSubmit = async () => {
        if (!selections.length) {
            setMessage("Vui lòng chọn ít nhất một ngày làm việc.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        setLoading(true);
        setMessage("");
        try {
            const res = await registerDoctorSchedule({ doctorId, selections });
            setMessage("Đăng ký lịch làm việc thành công!");
            console.log(res);
            setSelections([]);
            setSelectedShifts([]);
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            console.error(err);
            setMessage("Lỗi khi đăng ký lịch làm việc.");
            setTimeout(() => setMessage(""), 3000);
        } finally {
            setLoading(false);
        }   
    };

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-green-900 px-8 py-6">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                            <FiCalendar className="w-8 h-8" />
                            Đăng ký lịch làm việc tuần tới
                        </h2>
                        <p className="text-green-100 mt-2">
                            Chọn ngày và ca làm việc từ thứ 2 đến thứ 6
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="p-8 space-y-6">
                        <DateSelector
                            weekDates={weekDates}
                            selections={selections}
                            setSelections={setSelections}
                        />
                        {/* Message */}
                        {message && (
                            <div
                                className={`px-4 py-3 rounded-xl text-center font-medium ${message.includes("thành công")
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {message}
                            </div>
                        )}
                    </div>

                    {/* Selected Dates List */}
                    <SelectedList
                        selections={selections}
                        removeSelection={removeSelection}
                        weekDates={weekDates}
                    />

                    {/* Submit Button */}
                    {selections.length > 0 && (
                        <SubmitButton
                            loading={loading}
                            onSubmit={handleSubmit}
                            disabled={selections.length === 0}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ScheduleRegister;
