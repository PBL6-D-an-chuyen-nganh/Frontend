import React from 'react'
import Professor from '../../components/Professor'
import { useEffect, useState } from 'react'
import Pagination from '../../components/Home/Page'
import pageimg from '../../assets/img/pageimg.png'
import { getAllDoctors } from '../../api/getAllDoctors'
function ProfessorPage() {
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [professors, setProfessors] = useState([]);
      const [loading, setLoading] = useState(false);
  
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
        <div>
            <img src={pageimg} alt="homepage" className='w-full h-min object-cover'/>
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