import React, {useEffect, useState} from 'react'
import { getDoctorByID } from '../../api/getDoctorByID';
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import Btn from '../../components/Button';
function DoctorDetail() {
    const { userId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const data = await getDoctorByID(userId);
                setDoctor(data);
            } catch (err) {
                setError('Failed to fetch doctor');
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [userId]);

    if (loading) {
        return <div className='max-w-6xl mx-auto gap-3 mb-6 text-center mt-10'>Đang tải...</div>;
    }
  return (
    <div className='max-w-6xl mx-auto gap-3 mb-6'>
        <div className='flex justify-center item-center mt-10 mb-2 border-b-2 border-green-900 max-w-6xl mx-auto pb-3 space-x-2'>
            <h1 className='text-3xl font-semibold text-center text-green-900'>{doctor?.degree}</h1>
            <h1 className='text-3xl font-semibold text-center text-green-900'>{doctor?.name}</h1>
        </div>
        <div className='flex-col items-center my-4 mb-6'>
            <h2 className='text-green-900 text-2xl font-semibold'>{doctor?.position}</h2>
        </div>
        <div className='max-w-6xl mx-auto mb-10 flex justify-center my-4'>
            <img src={doctor?.avatarFilepath} alt='article' className='max-w-min max-h-min object-cover rounded-lg'/>
        </div>
       <div className='space-y-4 mb-10'>
            <div className='flex items-center space-x-3 mb-6'>
                <div className='h-8 w-1 bg-green-900'></div>
                    <h2 className='text-2xl font-bold text-green-900'>
                        Giới thiệu
                    </h2>
            </div>
            <div className='prose prose-lg max-w-none'>
                <p className='ml-4 text-gray-700 leading-relaxed text-justify whitespace-pre-line'>
                    {doctor?.introduction}
                </p>
            </div>
        </div>         
         <div className='space-y-4 mb-10'>
            <div className='flex items-center space-x-3 mb-6'>
                <div className='h-8 w-1 bg-green-900'></div>
                    <h2 className='text-2xl font-bold text-green-900'>
                        Thành tựu
                    </h2>
            </div>
            <div className='prose prose-lg max-w-none'>
                <p className='ml-4 text-gray-700 leading-relaxed text-justify whitespace-pre-line'>
                    {doctor?.achievements}
                </p>
            </div>
        </div>
          <div className='space-y-4 mb-10'>
            <div className='flex items-center space-x-3 mb-6'>
                <div className='h-8 w-1 bg-green-900'></div>
                    <h2 className='text-2xl font-bold text-green-900'>
                        Thông tin liên hệ
                    </h2>
            </div>
            <div className='ml-4 flex items-center prose prose-lg max-w-none space-x-2'>
                <MdOutlineAttachEmail size="24" className='text-gray-700'/>
                <p className='text-gray-700 leading-relaxed text-justify whitespace-pre-line'>
                    {doctor?.email}
                </p>
            </div>
              <div className='ml-4 flex items-center prose prose-lg max-w-none space-x-2'>
                <FaPhoneAlt size="24" className='text-gray-700'/>
                <p className='text-gray-700 leading-relaxed text-justify whitespace-pre-line'>
                    {doctor?.phoneNumber}
                </p>
            </div>
        </div>
        <div className='flex justify-center mb-4 mr-4'>
        <Btn
          title="ĐẶT LỊCH HẸN"
          path={`/services`}
        />            
      </div>
    </div>
  )
}

export default DoctorDetail