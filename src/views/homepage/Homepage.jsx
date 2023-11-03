import React from "react";
import Favorites from "../../components/Favorites/Favorites";
import SearchBox from "../../components/SearchBox/SearchBox";
import ShowsList from "../../components/ShowsList/ShowsList";

function Homepage() {
  return (
    <div>
      <SearchBox />
      <Favorites />
      <ShowsList />
    </div>
  );
}

export default Homepage;
