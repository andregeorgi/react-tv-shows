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

function ShowsList() {
  const { addFavorite } = useContext(ShowsContext);
  const savedPage = Number(localStorage.getItem("currentPage")) || 0;
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(savedPage);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setShows(data);
        }
      });
  }, [page]);

  console.log(shows.length);

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

  return (
    <div>
      <div className="shows-container">
        <h2>TV Shows</h2>
      </div>

      <div className="shows-cards">
        {shows.map((show) => (
          <Card key={show.id} sx={{ minWidth: 333 }} className="card">
            {show.image && (
              <CardHeader
                avatar={
                  <img
                    src={show.image.original}
                    height={40}
                    width={40}
                    className="rounded-image"
                  ></img>
                }
                action={
                  <Tooltip title="Add to favorites">
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => {
                        addFavorite(show);
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
      <div className="pagination">
        <Button variant="contained" onClick={prevPage} disabled={page === 0}>
          Previous
        </Button>

        <span>{page + 1}</span>
        <Button variant="contained" onClick={nextPage} disabled={!hasMore}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default ShowsList;
