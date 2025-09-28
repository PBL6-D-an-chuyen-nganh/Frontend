import React, {useEffect, useState} from 'react'
import { FaRegCalendarDays } from "react-icons/fa6";
import { getArticleByID } from '../../api/getArticleByID';
import { useParams } from 'react-router-dom';
function ArticleDetail() {
    const { articleID } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await getArticleByID(articleID);
                setArticle(data);
            } catch (err) {
                setError('Failed to fetch article');
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [articleID]);

    if (loading) {
        return <div className='max-w-6xl mx-auto gap-3 mb-6 text-center mt-10'>Đang tải...</div>;
    }
  return (
    <div className='max-w-6xl mx-auto gap-3 mb-6'>
        <div className='mt-10 mb-2 border-b-2 border-green-900 max-w-6xl mx-auto pb-3'>
            <h1 className='text-3xl font-semibold text-center text-green-900'>{article?.title}</h1>
        </div>
        <div>
            <div className='flex items-center my-4'>
                <div className='text-green-900 mr-1'>
                    <FaRegCalendarDays/>
                </div>
                    <span className='text-gray-500 font-normal text-sm'>
                        {new Date(article?.createdAt).toLocaleDateString("vi-VN")}
                    </span>
            </div>
        </div>
        <div className='flex items-center my-4 mb-6'>
            <h2 className='text-green-900 text-2xl font-semibold'>{article?.category}</h2>
        </div>
        <div className='max-w-6xl mx-auto mb-10 flex justify-center my-4'>
            <img src={article.imageUrl} alt='article' className='max-w-min max-h-min object-cover rounded-lg'/>
        </div>
        <div className='max-w-6xl mx-auto space-y-6 mb-20'>
            <p className='text-gray-600 leading-relaxed'>
                {article?.content}
            </p>
        </div>
    </div>
  )
}

export default ArticleDetail