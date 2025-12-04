import React,  { useState, useEffect, use } from 'react';
import pageimg from '../../assets/img/pageimg.png'
import Infor from '../../components/Home/infor'
import { CiEdit } from "react-icons/ci";
import { MdDisplaySettings } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { GrArticle } from "react-icons/gr";
import Article from '../../components/Home/Article';
import { getAllArticles } from '../../api/GetAllArticles';
import Pagination from '../../components/Home/Page'
import SearchInput from '../../components/Search';
import { searchArticles } from '../../api/searchArticles';
function HomePage() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortDir, setSortDir] = useState('desc');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
   
    const load = async (p) => {
      setLoading(true);
      try {
        const data = await getAllArticles(p);
       setArticles(data.content || []);
        setTotalPages(Number(data?.totalPages || 1)); 
      } finally {
        setLoading(false);
      }
    };

    const handleSearch = async(keyword) => {
      setKeyword(keyword);
      setLoading(true);
      try {
        const data = await searchArticles(keyword, sortBy, sortDir);
        setArticles(data.content || []);
        setTotalPages(Number(data.totalPages || 1));
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => { load(page); }, [page]);

  const options = [
  { id: 'all', label: 'Tất cả' },
  { id: 1, label: 'Phương pháp điều trị' },
  { id: 2, label: 'Thông tin bệnh' },
  { id: 3, label: 'Thành tích & hoạt động' },
  { id: 4, label: 'Khác' },
];


  const inforList = [
    {
      id: 1,
      title: "THÔNG TIN GIỚI THIỆU",
      p1:"Da là cơ quan lớn nhất của cơ thể, diện tích bao phủ lên đến 2,2 m, có chức năng bảo vệ các cơ quan chống mầm bệnh và mất nước quá mức, điều hòa nhiệt độ, tổng hợp vitamin D… Da thường chịu nhiều tác động từ khói, bụi, tia cực tím.",
      p2:"Các bệnh da liễu là tập hợp các bệnh ảnh hưởng đến da, cấu trúc dưới da, móng, lông, tóc và cả những bệnh từ các cơ quan khác biểu hiện ra ngoài. Một số bệnh phổ biến bao gồm: viêm da dị ứng, nám, chàm, mề đay, mụn…",
      p3:"Các bệnh da liễu thường do nhiều nguyên nhân như do sự tấn công của vi khuẩn, virus; tác động của ký sinh trùng – côn trùng; dị ứng – miễn dịch; nhóm rối loạn sắc tố… Dù khá dễ quan sát, nhiều người thường bỏ qua, bỏ sót hay chủ quan về các bệnh của da.",
      icon: <CiEdit />
    },
    {
      id: 2,
      title: "HỆ THỐNG THIẾT BỊ",
      p1: "Bình phun nitơ lỏng – sự lựa chọn hàng đầu điều trị về da",
      p2:"Bình phun nitơ lỏng Brymill Cry-AC nhập khẩu từ Mỹ giúp điều trị các tình trạng tổn thương da như sẩn ngứa, u máu, mụn có, mụn thịt,… Brymill Cry-AC là lựa chọn hàng đầu của các bác sĩ da liễu với tính năng vượt trội, an toàn khi sử dụng, thao tác dễ dàng, kiểm soát áp suất ổn định và cắt lạnh chính xác.",
      p3:"Ngoài ra, phòng khám còn trang bị các thiết bị hiện đại khác như máy soi da, máy phân tích da, máy laser CO2 Fractional,... nhằm hỗ trợ chẩn đoán và điều trị hiệu quả các bệnh lý về da.",
      icon: <MdDisplaySettings />
    },
    {
      id: 3,
      title:"KỸ THUẬT ĐIỀU TRỊ",
      p1:"Phòng khám da liễu Skin+ áp dụng các kỹ thuật điều trị tiên tiến, hiện đại, được cập nhật thường xuyên nhằm mang lại hiệu quả tối ưu cho khách hàng. Các kỹ thuật điều trị bao gồm: liệu pháp ánh sáng, laser, tiêm truyền chất dinh dưỡng,...",
      p2:"Đội ngũ bác sĩ tại phòng khám đều có trình độ chuyên môn cao, giàu kinh nghiệm và luôn tận tâm với khách hàng. Họ không ngừng học hỏi và áp dụng các phương pháp điều trị mới nhất để đảm bảo mang lại kết quả tốt nhất.",
      p3:"Phòng khám cam kết sử dụng các sản phẩm và thiết bị chất lượng cao, tuân thủ nghiêm ngặt các quy định về an toàn và vệ sinh trong quá trình điều trị.",
      icon: <FaUserDoctor />
    }
  ]
  return (
    <div className=''>
      <div>
        <img src={pageimg} alt="homepage" className='w-full h-min object-cover'/>
      </div>
      <div className='border-t-46 border-green-900'></div>
      <div className='mb-14'>
        <div className='space-y-8 mt-8'>
          {inforList.map((infor) => (
            <Infor
              key={infor.id}
              title={infor.title}
              p1={infor.p1}
              p2={infor.p2}
              p3={infor.p3}
              icon={infor.icon}
            />
          ))}
        </div>
      </div>
      <div className='max-w-6xl mx-auto mb-4 flex'>
        <SearchInput
          placeholder="Tìm kiếm bài viết..."
          onSearch = {handleSearch}
        />
      </div>
      <div className="flex items-center gap-2 max-w-6xl mx-auto border-b-1 border-green-900">
        <div className='w-6 h-6 text-green-900'>
          <GrArticle />
        </div>
        <h2 className="text-green-900 font-semibold text-lg m-0">
          BÀI VIẾT LIÊN QUAN
        </h2>
        </div>    
          <div className="max-w-6xl mx-auto mt-6 space-y-6">
            {loading && <div className="text-gray-500">Đang tải…</div>}
            {!loading && articles.map(a => (
              <Article
                key={a.articleID}    
                articleID={a.articleID}                        
                image={a.imageUrl}
                title={a.title}
                description={a.content}
              />
            ))}
            {!loading && !articles.length && (
              <div className="text-gray-500">Chưa có bài viết.</div>
            )}
          </div>
         <Pagination current={page} total={totalPages} onChange={(p) => setPage(p)} />
    </div>
  )
}

export default HomePage