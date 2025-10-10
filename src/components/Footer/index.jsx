import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';

export default function HospitalFooter() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Thông tin bệnh viện */}
          <div>
            <div className="flex items-center mb-4">
              <MdLocalHospital className="text-3xl mr-2" />
              <h3 className="text-xl font-bold">Phòng khám Da Liễu</h3>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              Chuyên khoa hàng đầu về điều trị các bệnh lý da liễu với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.
            </p>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-green-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-green-100 text-sm">193, Nguyễn Lương Bằng, Tp. Đà Nẵng</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-green-300 mr-3 flex-shrink-0" />
                <span className="text-green-100 text-sm">1900 xxxx</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-green-300 mr-3 flex-shrink-0" />
                <span className="text-green-100 text-sm">info@benhviendalieu.vn</span>
              </li>
              <li className="flex items-start">
                <FaClock className="text-green-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-green-100 text-sm">Thứ 2 - Thứ 6: 7:00 - 17:00</span>
              </li>
            </ul>
          </div>

          {/* Dịch vụ */}
          <div>
            <h3 className="text-lg font-bold mb-4">Dịch Vụ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Khám tổng quát da liễu</a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Điều trị mụn trứng cá</a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Trị liệu laser</a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Chăm sóc da thẩm mỹ</a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Điều trị viêm da</a>
              </li>
            </ul>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liên Kết</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Đặt lịch khám</a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Bác sĩ</a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Tin tức</a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Hỏi đáp</a>
              </li>
            </ul>
            
            <h4 className="text-sm font-semibold mb-3">Theo dõi chúng tôi</h4>
            <div className="flex space-x-3">
              <a href="#" className="bg-green-800 hover:bg-green-700 p-2 rounded-full transition-colors">
                <FaFacebookF className="text-lg" />
              </a>
              <a href="#" className="bg-green-800 hover:bg-green-700 p-2 rounded-full transition-colors">
                <FaYoutube className="text-lg" />
              </a>
              <a href="#" className="bg-green-800 hover:bg-green-700 p-2 rounded-full transition-colors">
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-800 mt-8 pt-6 text-center">
          <p className="text-green-200 text-sm">
            © 2025 Phòng khám Da Liễu. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}