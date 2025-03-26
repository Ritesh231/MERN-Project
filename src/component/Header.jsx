import * as React from "react";
import { useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Tooltip from "@mui/joy/Tooltip";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Drawer from "@mui/joy/Drawer";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import Navigation from "./Navigation";
import { FormatUnderlined } from "@mui/icons-material";
import { useAuth } from "../pages/hooks/useAuth";

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: "center" }}
        onClick={() => {
          if (mode === "light") {
            setMode("dark");
          } else {
            setMode("light");
          }
        }}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Header({ current, username }) {
  const [open, setOpen] = React.useState(false);
  const { user , logout} = useAuth();
  // console.log(JSON.parse(JSON.stringify(user)))
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            borderRadius: "50%",
          }}
        >
          <PrecisionManufacturingIcon />
        </IconButton>
        <Typography level="h3" sx={{ p: 1 }}>
          S2P Robotics
        </Typography>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          aria-pressed={current === "Home" ? "true" : "false"}
          href="/home"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          <Typography>Home</Typography>
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed={current === "Console" ? "true" : "false"}
          component="a"
          href="/main"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          <Typography>Console</Typography>
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          <Typography>Products</Typography>
        </Button>
        
      </Stack>
      <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          {/* <MenuRoundedIcon /> */}
        </IconButton>
        <Drawer
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>Acme Co.</DialogTitle>
          <Box sx={{ px: 1 }}>
            <Navigation />
          </Box>
        </Drawer>
      </Box>

      {user ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <Typography
            level="h4"
            textColor="text.secondary"
            sx={{ textDecoration: "" }}
          >
            {username}
          </Typography>
          <ColorSchemeToggle />
          <Tooltip title="Settings" variant="outlined">
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              component="a"
              href="/blog/first-look-at-joy/"
              sx={{ alignSelf: "center" }}
            >
              <SettingsRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout" variant="outlined">
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onClick={logout}
              component="a"
              sx={{ alignSelf: "center" }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <Button
            variant="soft"
            color="neutral"
            component="a"
            href="/login"
            size="sm"
            sx={{ alignSelf: "center" }}
          >
            <Typography>Log in</Typography>
          </Button>
          <Button
            variant="soft"
            color="neutral"
            component="a"
            href="/signup"
            size="sm"
            sx={{ alignSelf: "center" }}
          >
            <Typography>Sign up</Typography>
          </Button>
          <ColorSchemeToggle />
         
        </Box>
      )}
    </Box>
  );
}
