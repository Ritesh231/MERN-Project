import * as React from "react";
import Box from "@mui/joy/Box";
import ModalClose from "@mui/joy/ModalClose";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Sheet from "@mui/joy/Sheet";
import { IconButton, Input, Stack, Typography } from "@mui/joy";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import FormatColorTextRoundedIcon from "@mui/icons-material/FormatColorTextRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { CheckBox } from "@mui/icons-material";
import ExampleButtonCheckbox from "../component/TableFilter";
import Select, { selectClasses } from "@mui/joy/Select";

const WriteEmail = React.forwardRef(function WriteEmail(
  { open, onClose },
  ref
) {
  const [value, setValue] = React.useState([]);
  return (
    <Sheet
      ref={ref}
      sx={{
        alignItems: "center",
        px: 1.5,
        py: 1.5,
        ml: "auto",
        width: { xs: "100dvw", md: 600 },
        flexGrow: 1,
        border: "1px solid",
        borderRadius: "8px 8px 0 0",
        backgroundColor: "background.level1",
        borderColor: "neutral.outlinedBorder",
        boxShadow: "lg",
        zIndex: 1000,
        position: "fixed",
        bottom: 0,
        right: 24,
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.2s ease",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography level="h3" textColor={"text.tertiary"}>
          New Trigger
        </Typography>
        <ModalClose id="close-icon" onClick={onClose} />
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}
      >
        <FormControl>
          <Input placeholder="Trigger name" aria-label="Message" />
        </FormControl>
        <FormControl>
          <FormLabel>Camera</FormLabel>
          <Stack useFlexGap direction={"row"} spacing={2}>
            <Select
            key={1}
              variant="outlined"
              placeholder="Select a camera..."
              indicator={<KeyboardArrowDown />}
              sx={{
                width: "100%",
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              {[
                "Living Room",
                "Parking Lot",
                "Entry Gate",
                "Front gate",
                "Parking lot 2",
              ].map((i,index) => (
                <Option key={index} value={i}>{i}</Option>
              ))}
            </Select>
          </Stack>
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Stack useFlexGap direction={"row"} spacing={2}>
            <Select
            key={1}
              variant="outlined"
              placeholder="Select a type..."
              indicator={<KeyboardArrowDown />}
              sx={{
                width: "100%",
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              {["Number plate (matches)", "Person (more than)"].map((i, index) => (
                <Option key={index} value={i}>{i}</Option>
              ))}
            </Select>
            <FormControl>
              <Input
                sx={{ width: "100%" }}
                placeholder="value"
                aria-label="Message"
              />
            </FormControl>
          </Stack>
        </FormControl>
        <FormControl sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <FormLabel>Custom message</FormLabel>

          <Textarea
            placeholder="Type your message here…"
            aria-label="Message"
            minRows={8}
            endDecorator={
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexGrow={1}
                sx={{
                  py: 1,
                  pr: 1,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <div>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <FormatColorTextRoundedIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <AttachFileRoundedIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <InsertPhotoRoundedIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <FormatListBulletedRoundedIcon />
                  </IconButton>
                </div>
                <Button
                  color="primary"
                  sx={{ borderRadius: "sm" }}
                  onClick={onClose}
                >
                  <Typography color="#fff">Send</Typography>
                </Button>
              </Stack>
            }
            sx={{
              "& textarea:first-of-type": {
                minHeight: 72,
              },
            }}
          />
        </FormControl>
      </Box>
    </Sheet>
  );
});

export default WriteEmail;
