import "./MoviesCard.css";
import React from "react";

function MoviesCard({ movie, isSaved }) {
  const [isLiked, setIsLiked] = React.useState(false);

  function toggleLike() {
    setIsLiked(!isLiked);
  }

  return (
    <li className="movies-card">
      <img
        className="movies-card__image"
        alt={movie.nameRU}
        src={`https://api.nomoreparties.co${movie.image.url}`}
      ></img>
      <h2 className="movies-card__title">{movie.nameRU}</h2>
      {isSaved ? (
        <button className="movies-card__button  movies-card__button_type_delete" />
      ) : (
        <button
          className={`movies-card__button ${
            isLiked
              ? "movies-card__button_type_liked"
              : "movies-card__button_type_unliked"
          }`}
          onClick={toggleLike}
        ></button>
      )}

      <p className="movies-card__length">{`${Math.floor(movie.duration / 60)}ч${movie.duration % 60}м`}</p>
    </li>
  );
}

export default MoviesCard;
