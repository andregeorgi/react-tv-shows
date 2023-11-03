import React, { useEffect, useState } from "react";
import SeasonList from "../../components/SeasonList/SeasonList";
import { useParams } from "react-router-dom";

function SeasonsPage() {
  const { showId } = useParams();

  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${showId}`)
      .then((response) => response.json())
      .then((data) => setShow(data));
  }, [showId]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="season-header">
      <h1>Seasons of {show.name}</h1>
      <SeasonList showId={showId} />
    </div>
  );
}

export default SeasonsPage;
