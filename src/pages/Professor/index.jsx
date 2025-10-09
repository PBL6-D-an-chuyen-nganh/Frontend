import React from 'react'
import Professor from '../../components/Professor'
import { useEffect, useState } from 'react'
import Pagination from '../../components/Home/Page'
import pageimg from '../../assets/img/professor.jpg'
import { getAllDoctors } from '../../api/getAllDoctors'
import SearchInput from '../../components/Search'
import Dropdown from '../../components/Dropdown'
function ProfessorPage() {
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [professors, setProfessors] = useState([]);
      const [loading, setLoading] = useState(false);

      const positionOptions = [
        { id: 'all', label: 'Tất cả' },
        { id: 1, label: 'Trưởng khoa' },
        { id: 2, label: 'Phó khoa' },
        { id: 3, label: 'Bác sĩ nội trú' },
        { id: 4, label: 'Bác sĩ điều trị' },
        { id: 5, label: 'Bác sĩ chuyên khoa I' },
        { id: 6, label: 'Bác sĩ chuyên khoa II' },
      ];

      const degreeOptions = [
        { id: 'all', label: 'Tất cả' },
        { id: 1, label: 'Giáo sư' },
        { id: 2, label: 'Phó giáo sư' },
        { id: 3, label: 'Tiến sĩ' },
        { id: 4, label: 'Thạc sĩ' },
        { id: 5, label: 'Bác sĩ' },
      ];
  
      const load = async (p) => {
        setLoading(true); 
        try {
          const data = await getAllDoctors(p, 5);
          setProfessors(data?.content || []);
          setTotalPages(Number(data?.totalPages || 1)); // dùng totalPages từ BE
          // data.page là 0-based -> có thể kiểm tra nếu cần: data.page + 1 === p
        } finally {
          setLoading(false);
        }
      };
  
    useEffect(() => { load(page); }, [page]);
  return (
    <div>
        <div className='w-full overflow-hidden mb-8'>
            <img src={pageimg} alt="homepage" className='w-full h-min object-cover'/>
        </div>
        <div>
          <SearchInput 
            placeholder="Tìm bác sĩ..." 
            onSearch={(value) => {
            if (!value) {
              load(1);
              return;
            }
            const filtered = professors.filter(professor => 
              professor.name.toLowerCase().includes(value.toLowerCase()) ||
              professor.position.toLowerCase().includes(value.toLowerCase()) ||
              professor.degree.toLowerCase().includes(value.toLowerCase())
            );
            setProfessors(filtered);
          }}/>
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-green-900 text-center mt-6">CHUYÊN GIA - BÁC SĨ</h1>
        </div>
        <div className='flex justify-center mt-6 mb-8'>
          <Dropdown 
            options={positionOptions}
            selected="Chức vụ"
            onSelect={(option) => {
              if (option.id === 'all') {
                load(1);
                return;
              }
              const filtered = professors.filter(professor => 
                professor.position === option.label
              );
              setProfessors(filtered);
            }}
          /> 
          <div className='w-4'></div>
          <Dropdown 
            options={degreeOptions}
            selected="Học vị"
            onSelect={(option) => {
              if (option.id === 'all') {
                load(1);
                return;
              }
              const filtered = professors.filter(professor => 
                professor.degree === option.label
              );
              setProfessors(filtered);
            }}
          />
        </div>
        <div className="max-w-6xl mx-auto mt-6 space-y-6">
              {loading && <div className="text-gray-500">Đang tải…</div>}
              {!loading && professors.map(a => (
                <Professor
                  key={a.userId}                            
                  image={a.avatarFilepath}
                  name={a.name}
                  position={a.position}
                  introdution={a.introduction}
                  degree={a.degree}
                  userId={a.userId}
                />
              ))}
              {!loading && !professors.length && (
                <div className="text-gray-500">Chưa có bài viết.</div>
              )}
            </div>
          <Pagination current={page} total={totalPages} onChange={(p) => setPage(p)} />
    </div>
  )
}

export default ProfessorPage