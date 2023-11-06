import React, { useContext } from "react";
import { ShowsContext } from "../../context/ShowsContext";
import { yellow } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { Tooltip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Favorites() {
  const { favorites, removeFavorite } = useContext(ShowsContext);

  const columns = [];
  for (let i = 0; i < favorites.length; i += 4) {
    columns.push(favorites.slice(i, i + 4));
  }

  return (
    <div className="favorites-container">
      <ToastContainer />
      {favorites.length > 0 && <h2>Favorites ⭐️</h2>}

      <div className="favorites-columns">
        {columns.map((column, index) => (
          <div key={index} className="favorites-column">
            {column.map((show) => (
              <div key={show.id} className="favorite-item">
                <ListItem disablePadding>
                  <Link
                    to={`/seasons/${show.id}`}
                    key={show.id}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemIcon
                        sx={{
                          minWidth: 34,
                        }}
                      >
                        <Tooltip title="Remove from favorites">
                          <StarIcon
                            sx={{
                              color: yellow[600],
                            }}
                            fontSize="medium"
                            onClick={(event) => {
                              event.preventDefault();
                              removeFavorite(show.id);
                              toast.info(
                                <div>
                                  <div>{`${show.name} has been removed from favorites!`}</div>
                                </div>,
                                {
                                  position: "top-right",
                                  autoClose: 3000,
                                  hideProgressBar: true,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                }
                              );
                            }}
                          />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText primary={show.name} />
                    </ListItemButton>
                  </Link>
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
