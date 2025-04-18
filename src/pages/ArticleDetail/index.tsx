import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import './styles.css';
import useFetch from "../../hooks/useFetch";
import { Article, FetchStatus } from "../../types";
import { fetchArticleById } from "../../api";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const ArticleDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const period = Number(searchParams.get('period')) || 7;

    const navigate = useNavigate();
    
    const { data: article, status, error } = useFetch<Article>(() => fetchArticleById(period, Number(id)));

    const goBackClickHandler = () => {
        navigate(-1);
    }

    if (status === FetchStatus.LOADING) return (<Loading />)
    if (status === FetchStatus.ERROR) return (<Error message={error || 'Failed to load article'} />)

        return (
            <div className="article-detail">
              <button className="article-detail__back" onClick={goBackClickHandler}>
                ← Back to Articles
              </button>
              {article && (
                <>
                  <h1 className="article-detail__title">{article.title}</h1>
                  <p className="article-detail__byline">{article.byline}</p>
                  <p className="article-detail__date">
                    Published: {new Date(article.published_date).toLocaleDateString()}
                  </p>
                  {article.media?.[0]?.['media-metadata']?.[2]?.url && (
                    <img
                      className="article-detail__image"
                      src={article.media[0]['media-metadata'][2].url}
                      alt={article.media[0].caption}
                    />
                  )}
                  <div className="article-detail__content">
                    <p className="article-detail__abstract">{article.abstract}</p>
                    <a
                      className="article-detail__link"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read full article on NYTimes.com
                    </a>
                  </div>
                </>
              )}
            </div>
          );
}

export default ArticleDetail;