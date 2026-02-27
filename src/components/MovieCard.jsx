import React, { useState } from 'react';
import './MovieCard.css';

function MovieCard({ movie, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div 
      className="movie-card"
      style={{ zIndex: isHovered ? 100 : 10 - index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`movie-card-inner ${isHovered ? 'hovered' : ''}`}>
        <div className="movie-poster-container">
          <img
            src={posterUrl}
            alt={movie.Title}
            className={`movie-poster ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="poster-skeleton"></div>
          )}
        </div>
        
        {isHovered && (
          <div className="movie-info">
            <div className="movie-actions">
              <button className="action-btn play-btn" title="Play">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <button className="action-btn add-btn" title="Add to My List">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>
              <button className="action-btn like-btn" title="Like">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
                </svg>
              </button>
              <button className="action-btn more-btn" title="More Info">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </button>
            </div>
            
            <div className="movie-meta-info">
              <span className="match-score">98% Match</span>
              <span className="age-rating">{movie.Rated}</span>
              <span className="duration">{movie.Runtime}</span>
            </div>
            
            <div className="movie-genres">
              {movie.Genre && movie.Genre.split(', ').slice(0, 3).map((genre, idx) => (
                <span key={idx} className="genre-item">
                  {genre}{idx < Math.min(movie.Genre.split(', ').length, 3) - 1 && 
                    <span className="genre-dot"></span>
                  }
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
