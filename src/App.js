import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";
import axios from "axios";
import { useParams } from 'react-router-dom';
function App() {
  const [inCall, setInCall] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    let urlencoded = new URLSearchParams();
    urlencoded.append('Id', id)

    axios
      .post("http://3.141.68.71:5000/" + "getRtctoken", urlencoded, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(async result => {
        if (result.data.data[0]) {
          console.log(result.data.data, "resss")
          await localStorage.setItem('Rtctoken', result.data.data[0].RtcToken)
          await localStorage.setItem('Rtcchannel', result.data.data[0].channelName)
          setInCall(true)
        }
      })
  }, [])


  useEffect(() => {
    livestream()
  }, [])
  const livestream = () => {
    alert("l;ivestream", id)
    let urlencoded = new URLSearchParams();
    urlencoded.append('Id', id)
    urlencoded.append('status', '1')
    console.log(id, "idididid=====")
    axios
      .post("http://3.141.68.71:5000/" + "updatelivestreem", urlencoded, {
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

  }
  return (
    <div className="App" style={{ height: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : ''
        // (
        //   <Button
        //     variant="contained"
        //     color="primary"
        //     onClick={() => setInCall(true)}
        //   >
        //     Join Call
        //   </Button>
        // )
      }
    </div>
  );
}

export default App;
