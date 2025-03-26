import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import OutboxRoundedIcon from "@mui/icons-material/OutboxRounded";
import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
import AssistantPhotoRoundedIcon from "@mui/icons-material/AssistantPhotoRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/joy";
import Checkbox, { checkboxClasses } from "@mui/joy/Checkbox";
import {
  LocalFireDepartment,
  Settings,
  TwentyFourMp,
  Warning,
} from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
// import { env } from "../pages/env";

export default function Navigation({ videoPlaying, options, setOptions }) {
  const env = {};
  env.REACT_APP_BASE_URL = "localhost"
  React.useEffect(() => {
    if (videoPlaying) {
      console.log("sending->", options);
      
      const base_url = env.REACT_APP_BASE_URL;
      const response = async () => {
        try {
          await fetch(base_url + "/changeModel", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "amitpatange",
              model: options,
            }),
          });
        } catch {
          console.log("error fetching data");
        }
      };
      response();
    }else{
      console.log("not sending ->",options);
    }
  }, [options]);
  const handleChange = (event) => {
    if (event.target.checked) {
      setOptions([...options, event.target.name]);
    } else {
      setOptions(options.filter((name) => name !== event.target.name));
    }
  };
  return (
    <Stack height="100%" justifyContent={"space-between"}>
      <List size="sm" sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}>
        <Box key={0} sx={{ paddingBottom: 2 }}>
          <ListItem nested key={0}>
            <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
              <Typography level="h4">Active Models</Typography>
            </ListSubheader>
            <List aria-labelledby="nav-list-browse">
              {[
                { name: "Human", label: "Human" },
                { name: "Fire", label: "Fire" },
                { name: "Weapon", label: "Weapon" },
                { name: "NumberPlate", label: "Number Plate" },
              ].map((i, index) => (
                  <ListItem key={index}>
                    <ListItemButton autoFocus>
                      <ListItemDecorator>
                        {

                          [<DirectionsWalkIcon fontSize="small" />,
                          <LocalFireDepartment fontSize="small" />,
                          <Warning fontSize="small" />,
                          <TwentyFourMp fontSize="small" /> ][index]
                        }
                      </ListItemDecorator>
                      <ListItemContent>
                        <Typography textColor="text.secondary" level="title-lg">
                          {i.label}
                        </Typography>
                      </ListItemContent>
                      <Checkbox
                        name={i.name}
                        onChange={handleChange}
                        overlay
                      ></Checkbox>
                    </ListItemButton>
                  </ListItem>
              ))}
            </List>
          </ListItem>
        </Box>
        <Divider key={1} />
        {/* <Box key={2} sx={{ paddingBottom: 2 }}>
          <ListItem key={1}nested sx={{ mt: 2 }}>
            <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
              <Typography level="h4">pinned cameras</Typography>
            </ListSubheader>
            <List
              aria-labelledby="nav-list-tags"
              size="sm"
              sx={{
                "--ListItemDecorator-size": "32px",
              }}
            >
              {["Living Room", "Parking Lot", "Entry Gate"].map((i) => (
                <ListItem key={i}>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Box
                        sx={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "99px",
                          bgcolor: "success.400",
                        }}
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography textColor="text.secondary" level="title-lg">
                        {i}
                      </Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </ListItem>
        </Box>
        <Divider key={3}/> */}
        <ListSubheader key={4} sx={{ letterSpacing: "2px", fontWeight: "800", mt: 2 }}>
          <Typography level="h4">Status: Safe</Typography>
        </ListSubheader>
      </List>
    </Stack>
  );
}
