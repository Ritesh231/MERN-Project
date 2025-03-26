import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";


const data = [
  {
    name: "Number Plate",
    avatar: "https://i.pravatar.cc/40?img=3",
    avatar2x: "https://i.pravatar.cc/80?img=3",
    date: "1:40 AM",
    title: "MH20 CH 2593",
    body: "Hello, my friend! So, it seems that we are getting there…",
    color: "danger.500",
  },
  {
    name: "Number Plate",
    avatar: "https://i.pravatar.cc/40?img=4",
    avatar2x: "https://i.pravatar.cc/80?img=4",
    date: "1:44 AM",
    title: "MH20 GD 4713",
    body: "Good day, mate! It seems that our tickets just arrived…",
    color: "success.400",
  },
  {
    name: "Person",
    avatar: "https://i.pravatar.cc/40?img=5",
    avatar2x: "https://i.pravatar.cc/80?img=5",
    date: "1:55 AM",
    title: "Restricted area",
    body: "Hey! I'll be around the city this weekend, how about a…",
    color: "danger.500",
  },
  {
    name: "Number Plate",
    avatar: "https://i.pravatar.cc/40?img=7",
    avatar2x: "https://i.pravatar.cc/80?img=7",
    date: "2:20 AM",
    title: "MH20 NH 6435",
    body: "Hello there! I have some exciting news to share with you...",
    color: "success.400",
  },
  {
    name: "Person",
    avatar: "https://i.pravatar.cc/40?img=8",
    avatar2x: "https://i.pravatar.cc/80?img=8",
    date: "2:24 AM",
    title: "Unrestricted area",
    body: "Dear customers and supporters, I am thrilled to announc...",
    color: "success.400",
  }
];

export default function EmailList() {
  return (
    <List
      sx={{
        [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]:
          {
            borderLeft: "2px solid",
            borderLeftColor: "var(--joy-palette-primary-outlinedBorder)",
          },
      }}
    >
      {data.map((item, index, arr) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemButton
              {...(item.color.substring(0, item.color.indexOf(".")) == "danger" && {
                selected: true,
                // color: "danger",
                // sx:{bgcolor: "#000"}
              })}
              sx={{ p: 1 }}
            >
              {/* <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Avatar alt="" srcSet={item.avatar2x} src={item.avatar} />
              </ListItemDecorator> */}
              <Box sx={{ pl: 2, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography level="title-md" textColor="text.tertiary">
                      {item.name}
                    </Typography>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          m: 'auto',
                          borderRadius: "99px",
                          bgcolor: item.color,
                        }}
                        />
                        </Box>
                    <Typography level="body-xs" textColor="text.tertiary">
                      {item.date}
                    </Typography>
                </Box>
                <div>
                  <Typography level="title-lg" textColor="text.secondary" fontWeight='500' sx={{ mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  {/* <Typography level="body-sm">{item.body}</Typography> */}
                </div>
              </Box>
            </ListItemButton>
          </ListItem>
          <ListDivider sx={{ m: 0 }} />
        </React.Fragment>
      ))}
    </List>
  );
}
