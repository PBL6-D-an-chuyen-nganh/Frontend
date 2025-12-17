import React, { useEffect, useState } from 'react'
import Professor from '../../components/Professor'
import Pagination from '../../components/Home/Page'
import pageimg from '../../assets/img/professor.jpg'
import { getAllDoctors } from '../../api/getAllDoctors'
import { searchDoctors } from '../../api/searchDoctors'
import SearchInput from '../../components/Search'
import Dropdown from '../../components/Dropdown'
import Toast from '../../components/Notification'
function GuestProfessor() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    position: '',
    degree: ''
  });
  const [selectedPositionLabel, setSelectedPositionLabel] = useState('Chức vụ');
  const [selectedDegreeLabel, setSelectedDegreeLabel] = useState('Học vị');

  const positionOptions = [
    { id: 'all', label: 'Tất cả' },
    { id: 1, label: 'Trưởng khoa' },
    { id: 2, label: 'Phó khoa' },
    { id: 3, label: 'Bác sĩ tư vấn' },
    { id: 4, label: 'Bác sĩ điều trị' },
  ];

  const degreeOptions = [
    { id: 'all', label: 'Tất cả' },
    { id: 'GS', label: 'Giáo sư' },
    { id: 'PGS', label: 'Phó giáo sư' },
    { id: 'TS', label: 'Tiến sĩ' },
    { id: 'ThS', label: 'Thạc sĩ' },
    { id: 'BS', label: 'Bác sĩ' },
  ];

  const hasActiveFilters = () => {
    return !!(filters.name.trim() || filters.position || filters.degree);
  };

  const loadDoctors = async (currentPage) => {
    setLoading(true);
    try {
      let data;
      if (hasActiveFilters()) {
        data = await searchDoctors(
          filters.name.trim(),
          filters.degree,      
          filters.position,    
          currentPage - 1,
          5
        );
      } else {
        data = await getAllDoctors(currentPage - 1, 5);
      }

      setProfessors(data?.content || []);
      setTotalPages(Number(data?.totalPages || 1));
    } catch (error) {
      console.error('Error loading doctors:', error);
      setProfessors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors(page);
  }, [page, filters.name, filters.position, filters.degree]);

  const handleSearch = (value) => {
    setFilters(prev => ({
      ...prev,
      name: value.trimStart()
    }));
    setPage(1);
  };

  const handlePositionChange = (option) => {
    setSelectedPositionLabel(option.label); 
    setFilters(prev => ({
      ...prev,
      position: option.id === 'all' ? '' : option.label
    }));
    setPage(1);
  };

  const handleDegreeChange = (option) => {
    setSelectedDegreeLabel(option.label); 
    setFilters(prev => ({
      ...prev,
      degree: option.id === 'all' ? '' : option.id 
    }));
    setPage(1);
  };

  return (
    <div className='min-h-screen'>
      <div className='w-full overflow-hidden mb-8'>
        <img src={pageimg} alt="homepage" className='w-full h-min object-cover'/>
      </div>

      <div>
        <SearchInput
          placeholder="Tìm bác sĩ..."
          onSearch={handleSearch}
        />
      </div>

      <div>
        <h1 className="text-3xl font-semibold text-green-900 text-center mt-6">
          CHUYÊN GIA - BÁC SĨ
        </h1>
      </div>

      <div className='flex justify-center mt-6 mb-8'>
        <Dropdown
          options={positionOptions}
          selected={selectedPositionLabel}   
          onSelect={handlePositionChange}
        />
        <div className='w-4'></div>
        <Dropdown
          options={degreeOptions}
          selected={selectedDegreeLabel}     
          onSelect={handleDegreeChange}
        />
      </div>

      <div className="max-w-6xl mx-auto mt-6 space-y-6 bg-w">
        {loading && <div className="text-gray-500 text-center">Đang tải…</div>}

        {!loading && professors.map(doctor => (
          <Professor
            key={doctor.userId}
            image={doctor.avatarFilepath}
            name={doctor.name}
            position={doctor.position}
            introdution={doctor.introduction}
            degree={doctor.degree}
            userId={doctor.userId}
          />
        ))}

        {!loading && !professors.length && (
          <div className="text-gray-500 text-center">Không tìm thấy bác sĩ phù hợp.</div>
        )}
      </div>

      <Pagination
        current={page}
        total={totalPages}
        onChange={(p) => setPage(p)}
      />
    </div>
  )
}

export default GuestProfessor
