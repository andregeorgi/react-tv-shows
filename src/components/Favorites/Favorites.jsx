import React, { useContext } from "react";
import { ShowsContext } from "../../context/ShowsContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";

function Favorites() {
  const { favorites, removeFavorite } = useContext(ShowsContext);

  const columns = [];
  for (let i = 0; i < favorites.length; i += 4) {
    columns.push(favorites.slice(i, i + 4));
  }

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <div className="favorites-columns">
        {columns.map((column, index) => (
          <div key={index} className="favorites-column">
            {column.map((show) => (
              <div key={show.id} className="favorite-item">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <StarIcon onClick={() => removeFavorite(show.id)} />
                    </ListItemIcon>
                    <ListItemText primary={show.name} />
                  </ListItemButton>
                </ListItem>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;