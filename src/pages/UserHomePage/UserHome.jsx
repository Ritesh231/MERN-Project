import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { FocusTrap } from "@mui/base/FocusTrap";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import Layout from "../../component/Layouter";
import Navigation from "../../component/Navigation3";
import Mails from "../../component/Table";
// import EmailContent from "../update/components/CameraView";
import WriteEmail from "../../component/WriteEmail";
import Header from "../../component/Header";
import { useAuth } from "../hooks/useAuth";
import { Skeleton } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import AspectRatio from "@mui/joy/AspectRatio";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/joy";
import { TuneOutlined, TurnedIn } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";
export default function UserHome2() {
  // const { user, setUser } = useContext(AuthContext)
  const videoWidth = 800; // Set your video width
  const videoHeight = 400; // Set your video height
  const { user } = useAuth();
  document.title = "Console";
  return <Content user={{username:"amitpatange"}} />
  return <>{user != null ? <Content user={user} /> : <ReturnToLogin />}</>;
}

function Content() {
  function startStream(trackNumber, finishedCallback, model) {
    var config = {
      sdpSemantics: "unified-plan",
    };
    config.iceServers = [
      {
        urls: [
          "stun:stun1.1.google.com:19302",
          "stun:stun2.1.google.com:19302",
        ],
      },
    ];
    var pc = new RTCPeerConnection(config);
    let frameRate = trackNumber;
    try {
      frameRate = document.getElementById("framerate").value;
    } catch {}
    pc.addEventListener("track", function (evt) {
      console.log("recieved stream");
      console.log(pc.connectionState);
      try {
        document.getElementById("video").srcObject = evt.streams[0];
      } catch (e) {
        console.log(e);
      }
    });
    const transciever = pc.addTransceiver("video", { direction: "recvonly" });
    transciever.direction = "recvonly";
    const dc = pc.createDataChannel("chat");
    pc.ondatachannel = (event) => {
      const s2pdc = event.channel;
      s2pdc.onmessage = function (evt) {
        const data = JSON.parse(evt.data);
        console.log(evt.data);
        switch (data.type) {
          case "numberplate":
            // addToTable(data.message, true);
            break;
          case "fire":
            console.log("fire! fire!");
            setFire(true);
            setTimeout(() => setFire(false), 2000);
            break;
        }
      };
    };
    dc.onclose = function () {
      console.log("dc closed");
    };
    dc.onopen = function () {};
    dc.onmessage = function (evt) {
      console.log(evt.data);
    };

    console.log("negotiate");
    pc.createOffer()
      .then(function (offer) {
        return pc.setLocalDescription(offer);
      })
      .then(function () {
        // wait for ICE gathering to complete
        return new Promise(function (resolve) {
          if (pc.iceGatheringState === "complete") {
            resolve();
          } else {
            function checkState() {
              if (pc.iceGatheringState === "complete") {
                pc.removeEventListener("icegatheringstatechange", checkState);
                resolve();
              }
            }
            pc.addEventListener("icegatheringstatechange", checkState);
          }
        });
      })
      .then(async function () {
        var offer = pc.localDescription;
        console.log(
          "offer generated: " + JSON.stringify(offer).substring(0, 15) + "..."
        );
        console.log("offer");
        console.log(frameRate);
        const base_url = "process.env.REACT_APP_BASE_URL";
        return fetch(base_url + "/p2sOffer", {
          body: JSON.stringify({
            username: "amitpatange",
            password: "password",
            offer: {
              type: offer.type,
              sdp: offer.sdp,
              framerate: frameRate,
              model: model,
            },
          }),
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
          method: "POST",
        }).catch((e) => console.log(e));
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (answer) {
        console.log(
          "answer recieved: " + JSON.stringify(answer).substring(0, 15) + "..."
        );
        finishedCallback();
        return pc.setRemoteDescription(answer);
      })
      .catch(function (e) {
        console.log(e);
      });
  }
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  // startStream(0,()=>{}, ["Human", "NumberPlate"])

  const { user } = useAuth();
  document.title = "Console";
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [videoPlaying, setVideoPlaying] = React.useState(false);
  const [fire, setFire] = React.useState(false);
  const [selectedStream, setSelectedStream] = React.useState(-1);
  const [serverStreams, setServerStreams] = React.useState(["no camera"])
  React.useEffect(()=>console.log(serverStreams),[serverStreams])
  const [first, setFirst] = React.useState(false); //fix this, or remove
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (selectedStream != -1) {
      console.log(selectedStream, options);
      document.getElementById("video").srcObject = null;

      if (!first) {
        setLoading(true);
        setTimeout(() => {
          startStream(
            selectedStream,
            () => {
              setLoading(false);
              setVideoPlaying(true);
            },
            options
          );
        }, 10);
        document.getElementById("video").autoPlay = true;
      }
    }
  }, [selectedStream]);

  function onSelectChange(e) {}
  const [opens, setOpens] = React.useState([false, false, false]);
  // React.useEffect(()=>console.log("loading, ", loading)[loading])
  const handleSnackbarOpen = (index) => {
    const updatedOpen = [...open];
    updatedOpen[index] = true;
    setOpen(updatedOpen);
  };

  // let streamss = ["no camera"];
  // if (user.streams.length > 0) {
  //   streamss = user.streams;
  // }
  const handleSnackbarClose = (index) => {
    const updatedOpen = [...open];
    updatedOpen[index] = false;
    setOpen(updatedOpen);
  };
  const [pin, setPin] = React.useState(false);
  const onRefresh = async () => {
    const base_url = "process.env.REACT_APP_BASE_URL";
    fetch(base_url + "/api/getUserStreamNames", {
      body: JSON.stringify({
        username: "amitpatange",
      }),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(Object.values(res.streamNames))
        setServerStreams(Object.values(res.streamNames))

        serverStreams.map((i)=>console.log("item",(i)))
      })
      .catch((e) => console.log(e));
    // setStreams(JSON.stringify(["yes", "no"]));
  }
  React.useEffect(()=>{
    const onRefresh2 = async () => {
    const base_url = process.env.REACT_APP_BASE_URL;
    fetch(base_url + "/api/getUserStreamNames", {
      body: JSON.stringify({
        username: "amitpatange",
      }),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(Object.values(res.streamNames))
        setServerStreams(Object.values(res.streamNames))

        serverStreams.map((i)=>console.log("item",(i)))
      })
      .catch((e) => console.log(e));
    // setStreams(JSON.stringify(["yes", "no"]));
  }
    onRefresh2()
  },[])
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />

      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <Layout.Header>
          <Header current="Console" username={"amit@gmail.com"} />
        </Layout.Header>
        <Layout.SideNav>
          <Navigation
            videoPlaying={videoPlaying}
            options={options}
            setOptions={setOptions}
          />
        </Layout.SideNav>
        <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ alignItems: "center", gap: 1 }}>
              <Typography level="h4" textColor="text.secondary">
                Your Events{" "}
              </Typography>
              <Typography level="title-md" textColor="text.tertiary">
                3 high priority events
              </Typography>
            </Box>
            <Button
              size="sm"
              startDecorator={<CreateRoundedIcon />}
              onClick={() => setOpen(!open)}
              sx={{ ml: "auto" }}
            >
              <Typography color="#fff">Add a trigger</Typography>
            </Button>
            <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
              <WriteEmail open={open} onClose={() => setOpen(false)} />
            </FocusTrap>
          </Box>
          <Mails />
        </Layout.SidePane>
        <Layout.Main>
          {/* <EmailContent loading={loading} onSelectChange={onSelectChange}/> */}
          <Stack
            height={"100%"}
            justifyContent="space-between"
            // alignItems="center"
            spacing={0.5}
          >
            <Sheet
              variant="outlined"
              sx={{
                // minHeight: 500,
                borderRadius: "sm",
                p: 2,
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"space-between"}
                >
                  <Typography level="h2" textColor={"text.secondary"}>
                    Camera View
                  </Typography>

                  <Stack direction={"row"} spacing={2}>
                    <IconButton
                      variant="plain"
                      onClick={onRefresh}
                    >
                      <RefreshIcon />
                    </IconButton>
                    <Select
                      variant="outlined"
                      onChange={(e, n) => setSelectedStream(n)}
                      placeholder="Select a Camera..."
                      indicator={<KeyboardArrowDown />}
                      // sx={{
                      //   width: 240,
                      //   [`& .${selectClasses.indicator}`]: {
                      //     transition: "0.2s",
                      //     [`&.${selectClasses.expanded}`]: {
                      //       transform: "rotate(-180deg)",
                      //     },
                      //   },
                      // }}
                    >
                      {serverStreams.map((i, index) => (
                        <Option key={i} value={index}>
                          {i}
                        </Option>
                      ))}
                    </Select>
                    <IconButton
                      variant="soft"
                      onClick={() => setPin(!pin)}
                      color={pin ? "primary" : "neutral"}
                    >
                      <TurnedIn />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
              <Box
                sx={{
                  // minHeight: 500,
                  borderRadius: "sm",
                }}
              >
                <AspectRatio sx={{ borderRadius: "sm" }} ratio="1920/1080">
                  {/* <Skeleton  animation="wave" loading={loading} variant="overlay">  */}
                  <video
                    id="video"
                    height="100%"
                    // style={{background: '#000'}}
                    width="100%"
                    autoPlay
                  ></video>
                  {/* </Skeleton> */}
                </AspectRatio>
              </Box>
            </Sheet>
            <Typography textAlign={"right"}>S2P Robotics</Typography>
          </Stack>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}

const ReturnToLogin = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Skeleton width={"100%"} height={"100%"}> */}

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          You are not logged in
        </Typography>
        <Box component="" noValidate sx={{ mt: 1 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            href="/login"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
        </Box>
      </Box>
      {/* </Skeleton> */}
    </div>
  );
};
