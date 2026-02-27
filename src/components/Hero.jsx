import React from 'react';
import './Hero.css';

function Hero({ movie }) {
  if (!movie) return null;

  return (
    <div className="hero">
      <div className="hero-background">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/1920x1080?text=No+Image'}
          alt={movie.Title}
          className="hero-image"
        />
        <div className="hero-gradient"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">{movie.Title}</h1>
        <div className="hero-meta">
          <span className="hero-year">{movie.Year}</span>
          <span className="hero-rating">{movie.Rated}</span>
          <span className="hero-runtime">{movie.Runtime}</span>
        </div>
        <p className="hero-description">{movie.Plot}</p>
        <div className="hero-genre">
          {movie.Genre && movie.Genre.split(', ').map((genre, index) => (
            <span key={index} className="genre-tag">{genre}</span>
          ))}
        </div>
        <div className="hero-buttons">
          <button className="hero-button play-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play
          </button>
          <button className="hero-button more-info-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
