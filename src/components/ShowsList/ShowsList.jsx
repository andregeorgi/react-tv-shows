import React, { useState, useEffect, useContext } from "react";
import { ShowsContext } from "../../context/ShowsContext";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import { yellow } from "@mui/material/colors";
import { Tooltip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShowsList({ searchedShows }) {
  const { addFavorite } = useContext(ShowsContext);

  const [shows, setShows] = useState([]);
  const savedPage = Number(localStorage.getItem("currentPage")) || 0;
  const [page, setPage] = useState(savedPage);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!searchedShows || searchedShows.length === 0) {
      fetch(`https://api.tvmaze.com/shows?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            setHasMore(false);
          } else {
            setShows(data);
          }
        });
    }
  }, [page, searchedShows]);

  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  const nextPage = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const showsToDisplay =
    searchedShows && searchedShows.length > 0 ? searchedShows : shows;

  return (
    <div>
      <ToastContainer />
      <div className="shows-container">
        <h2>TV Shows</h2>
      </div>

      <div className="shows-cards">
        {showsToDisplay.map((show) => (
          <Card key={show.id} sx={{ minWidth: 333 }} className="card">
            {show.image && (
              <CardHeader
                avatar={
                  <img
                    src={show.image.original}
                    height={40}
                    width={40}
                    className="rounded-image"
                    alt={show.name}
                  ></img>
                }
                action={
                  <Tooltip title="Add to favorites">
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => {
                        addFavorite(show);
                        toast.info(
                          <div>
                            <div>{`${show.name} added to favorites!`}</div>
                          </div>,
                          {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          }
                        );
                      }}
                    >
                      <StarIcon sx={{ color: yellow[600] }} fontSize="medium" />
                    </IconButton>
                  </Tooltip>
                }
                title={<b>{show.name}</b>}
                subheader={show.genres.join(", ")}
              />
            )}
            <Link
              to={`/seasons/${show.id}`}
              key={show.id}
              style={{ textDecoration: "none" }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Rating: {show.rating.average}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Premiered date: {show.premiered}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
      {searchedShows.length === 0 && (
        <div className="pagination">
          <Button variant="contained" onClick={prevPage} disabled={page === 0}>
            Previous
          </Button>

          <span>{page + 1}</span>
          <Button variant="contained" onClick={nextPage} disabled={!hasMore}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default ShowsList;
