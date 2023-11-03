import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function SeasonList({ showId }) {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${showId}/seasons`)
      .then((response) => response.json())
      .then((data) => setSeasons(data));
  }, [showId]);

  return (
    <div className="season-container">
      {seasons.map((season) => (
        <Link
          to={`/episodes/${season.id}`}
          key={season.id}
          style={{ textDecoration: "none" }}
        >
          <Card key={season.id} sx={{ maxWidth: 345 }}>
            {season.image && (
              <CardMedia sx={{ height: 150 }} image={season.image.original} />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Season number: {season.number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Episodes: {season.episodeOrder}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Premiere Year: {new Date(season.premiereDate).getFullYear()}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default SeasonList;
