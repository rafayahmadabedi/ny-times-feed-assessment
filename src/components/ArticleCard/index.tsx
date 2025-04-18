import { Article } from "../../types";
import './styles.css';

export type ArticleCardProps = {
    article: Article;
    onClick: (id: number) => void;
}

const ArticleCard = ({article, onClick}: ArticleCardProps) => {
  return (
    <div className="article-card" onClick={() => onClick(article.id)}>
      <div className="article-card__image-container">
        {article.media?.[0]?.['media-metadata']?.[0]?.url && (
          <img 
            src={article.media[0]['media-metadata'][0].url} 
            alt={article.media[0].caption || article.title}
            className="article-card__image"
          />
        )}
      </div>
      <div className="article-card__content">
        <h3 className="article-card__title">{article.title}</h3>
        <p className="article-card__abstract">{article.abstract}</p>
        <div className="article-card__meta">
          <span className="article-card__byline">{article.byline}</span>
          <span className="article-card__date">
            {new Date(article.published_date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;