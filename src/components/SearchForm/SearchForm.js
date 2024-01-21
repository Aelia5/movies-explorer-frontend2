import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import React from "react";

function SearchForm({
  handleSearchSubmit,
  apiError,
  changeApiError,
  switchPreloader,
  checkboxOn,
  handleCheckboxClick,
}) {
  const [query, setQuery] = React.useState("");

  function handleSearchMovie(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) {
      changeApiError("Нужно ввести ключевое слово");
    } else {
      switchPreloader(true);
      handleSearchSubmit(query, checkboxOn);
    }
  }

  React.useEffect(() => {
    if (apiError) {
      changeApiError("");
    }
  }, [query]);

  return (
    <section aria-label="Форма поиска фильмов">
      <form className="search-form" name="search-form" onSubmit={handleSubmit}>
        <div className="search-form__line">
          <input
            className="search-form__input"
            type="text"
            name="movie"
            id="movie"
            onChange={handleSearchMovie}
            placeholder="Фильм"
            value={query || ""}
          />
          <button className="search-form__submit-button" type="submit" />
        </div>
        <p className="api-error">{apiError}</p>
        <FilterCheckbox
          checkboxOn={checkboxOn}
          handleCheckboxClick={handleCheckboxClick}
        />
      </form>
    </section>
  );
}

export default SearchForm;
