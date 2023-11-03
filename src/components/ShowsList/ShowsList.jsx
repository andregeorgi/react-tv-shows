import React, { useState, useEffect, useContext } from "react";
import { ShowsContext } from "../../context/ShowsContext";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

function ShowsList() {
  const { addFavorite } = useContext(ShowsContext);
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
      .then((response) => response.json())
      .then((data) => setShows(data));
  }, [page]);

  return (
    <div>
      <div className="shows-container">
        <h2>TV Shows</h2>
      </div>

      <div className="shows-cards">
        {shows.map((show) => (
          <Card key={show.id} sx={{ minWidth: 333 }} className="card">
            <CardHeader
              avatar={
                <img
                  src={show.image["original"]}
                  height={40}
                  width={40}
                  className="rounded-image"
                ></img>
              }
              action={
                <IconButton aria-label="add to favorites">
                  <StarIcon onClick={() => addFavorite(show)} />
                </IconButton>
              }
              title={show.name}
              subheader={show.genres.join(", ")}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Rating: {show.rating["average"]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Premiered date: {show.premiered}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <button onClick={() => setPage((prevPage) => prevPage - 1)}>
        Previous
      </button>
      <button onClick={() => setPage((prevPage) => prevPage + 1)}>Next</button>
    </div>
  );
}

export default ShowsList;
