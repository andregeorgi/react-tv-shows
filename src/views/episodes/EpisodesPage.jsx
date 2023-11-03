import React, { useEffect, useState } from "react";
import EpisodesList from "../../components/EpisodesList/EpisodesList";
import { useParams } from "react-router-dom";

function EpisodesPage() {
  const { seasonId } = useParams();

  const [season, setSeason] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/seasons/${seasonId}`)
      .then((response) => response.json())
      .then((data) => setSeason(data));
  }, [seasonId]);

  if (!season) {
    return <div>Loading...</div>;
  }

  return (
    <div className="episode-header ">
      <h1>Episodes of season: {season.number}</h1>
      <EpisodesList seasonId={seasonId} />
    </div>
  );
}

export default EpisodesPage;
