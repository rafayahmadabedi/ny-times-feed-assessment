import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { fetchMostPopular } from "../../api";
import { FetchStatus, NYTimesResponse } from "../../types";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import ArticleCard from "../../components/ArticleCard";
import './styles.css';
import { useCallback, useState } from "react";

const HomePage = () => {
    const navigate = useNavigate();

    const [selectedDays, setSelectedDays] = useState<number>(7);
    
    const { data, status, error } = useFetch<NYTimesResponse>(() => fetchMostPopular(selectedDays), [selectedDays]);

    const articleClickHandler = useCallback((id: number) => {
        navigate(`/article/${id}?period=${selectedDays}`);
      }, [navigate, selectedDays]);

    const handleDaysChange = (days: number) => {
        setSelectedDays(days);
    };

    if (status === FetchStatus.LOADING) return <Loading />;
    if (status === FetchStatus.ERROR) return <Error message={error || 'Failed to Load Articles'} />;
    return (
        <div className="home">
            <div className="home__header">
                <h2 className="home__title">Trending</h2>
                <div className="days-selector">
                    <span className="days-selector__label">Trending from:</span>
                    {[1, 7, 30].map((days) => (
                        <button
                        key={days}
                        className={`days-selector__button ${selectedDays === days ? 'active' : ''}`}
                        onClick={() => handleDaysChange(days)}
                        >
                        {days} {days === 1 ? 'Day' : 'Days'}
                        </button>
                    ))}
                </div>
            </div>
            <div className="home__articles">
                {data?.results.map((article) => (
                    <ArticleCard 
                        key={article.id}
                        article={article}
                        onClick={articleClickHandler} 
                    />
                ))}
            </div>
        </div>
    )
}

export default HomePage;