import React, { useEffect, useState } from "react";
import EpisodesList from "../../components/EpisodesList/EpisodesList";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment-timezone";

function EpisodesPage() {
  const { seasonId } = useParams();

  const [season, setSeason] = useState(null);
  const [timeZone, setTimeZone] =
    useState(localStorage.getItem("timeZone")) ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    fetch(`https://api.tvmaze.com/seasons/${seasonId}`)
      .then((response) => response.json())
      .then((data) => setSeason(data));
  }, [seasonId]);

  useEffect(() => {
    localStorage.setItem("timeZone", timeZone);
  }, [timeZone]);

  const handleTimeZoneChange = (event) => {
    setTimeZone(event.target.value);
  };

  if (!season) {
    return <div>Loading...</div>;
  }

  const timeZones = moment.tz.names();

  return (
    <div className="episode-header">
      <h1>Episodes of season: {season.number}</h1>
      <div className="episode-dropdown">
        <Box sx={{ width: 200 }}>
          <FormControl fullWidth>
            <InputLabel>Time zone</InputLabel>
            <Select
              value={timeZone}
              label="Time zone"
              onChange={handleTimeZoneChange}
            >
              {timeZones.map((tz) => (
                <MenuItem key={tz} value={tz}>
                  {tz}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <EpisodesList seasonId={seasonId} timeZone={timeZone} />
    </div>
  );
}

export default EpisodesPage;
