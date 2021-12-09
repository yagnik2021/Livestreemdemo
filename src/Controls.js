import { useState } from "react";
import { useClient } from "./settings";
import { Grid, Button } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import { useParams } from 'react-router-dom';
export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const { id } = useParams();
  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
    let urlencoded = new URLSearchParams();
    urlencoded.append('Id', id)
    urlencoded.append('status', '0')

    axios
      .post("http://3.141.68.71:5000" + "updatelivestreem", urlencoded, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(async result => {
        if (result.data.data[0]) {
          console.log(result.data.data, "resss")
          // await localStorage.setItem('Rtctoken', result.data.data[0].RtcToken)
          // await localStorage.setItem('Rtcchannel', result.data.data[0].channelName)
          // setInCall(true)
        }
      })
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          color={trackState.audio ? "primary" : "secondary"}
          onClick={() => mute("audio")}
        >
          {trackState.audio ? <MicIcon /> : <MicOffIcon />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color={trackState.video ? "primary" : "secondary"}
          onClick={() => mute("video")}
        >
          {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
        </Button>
      </Grid>
      <Grid item>
        <a href="http://3.141.68.71/#/liveStream">
          <Button
            variant="contained"
            color="default"
            onClick={() => leaveChannel()}
          >
            Leave
          <ExitToAppIcon />
          </Button>
        </a>
      </Grid>
    </Grid>
  );
}
