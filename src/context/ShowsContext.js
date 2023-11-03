import React, { createContext, useState } from "react";

export const ShowsContext = createContext();

export const ShowsProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const addFavorite = (show) => {
    const updatedFavorites = [...favorites, show];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((show) => show.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <ShowsContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </ShowsContext.Provider>
  );
};
