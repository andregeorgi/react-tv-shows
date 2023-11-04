import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function EpisodesList({ seasonId }) {
  const [episodes, setEpisodes] = useState([]);

  function removeHtmlTags(str) {
    if (!str) return "";
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }

  function formatAirstamp(airstamp) {
    const date = new Date(airstamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  useEffect(() => {
    fetch(`https://api.tvmaze.com/seasons/${seasonId}/episodes`)
      .then((response) => response.json())
      .then((data) => setEpisodes(data));
  }, [seasonId]);

  return (
    <div className="episodes-container">
      {episodes.map((episode) => (
        <Card key={episode.id} sx={{ maxWidth: 333 }}>
          {episode.image ? (
            <CardMedia sx={{ height: 200 }} image={episode.image.original} />
          ) : (
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              image="/no_data.jpeg"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Episode {episode.number}: {episode.name}
            </Typography>
            <Typography variant="body2">
              {removeHtmlTags(episode.summary)}
            </Typography>
            <br></br>
            <Typography variant="body2">
              Episode airstamp: {formatAirstamp(episode.airstamp)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default EpisodesList;
