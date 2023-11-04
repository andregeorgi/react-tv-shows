import React, { useState } from "react";
import Favorites from "../../components/Favorites/Favorites";
import SearchBox from "../../components/SearchBox/SearchBox";
import ShowsList from "../../components/ShowsList/ShowsList";

function Homepage() {
  const [shows, setShows] = useState([]);

  const handleSearch = (searchTerm) => {
    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        const searchResults = data.map((item) => item.show);
        setShows(searchResults);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <Favorites />
      <ShowsList searchedShows={shows} />
    </div>
  );
}

export default Homepage;
