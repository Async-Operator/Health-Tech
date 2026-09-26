import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Doctors", path: "/doctors" },
    { label: "Login", path: "/login" },
  ];

  return (
    <AppBar position="sticky" className="main-navbar" elevation={0}>
      <Toolbar className="navbar-toolbar">

        {/* =================================================
            LOGO
        ================================================= */}

        <Box
          component={Link}
          to="/"
          className="brand-wrapper"
        >
          <Box className="brand-logo">
            A
          </Box>

          <Box className="brand-text">
            <Typography className="brand-name">
              Telehealth
            </Typography>

            <Typography className="brand-subtitle">
              Bridge
            </Typography>
          </Box>
        </Box>


        {/* =================================================
            MOBILE
        ================================================= */}

        {isMobile ? (
          <>
            <IconButton
              className="mobile-menu-button"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={open}
              onClose={() => setOpen(false)}
              PaperProps={{
                className: "mobile-drawer",
              }}
            >
              <Box className="mobile-drawer-header">
                <Box className="brand-logo small-logo">
                  A
                </Box>

                <Typography className="mobile-brand-name">
                  Telehealth Bridge
                </Typography>
              </Box>

              <List className="mobile-nav-list">

                {menuItems.map((item) => (
                  <ListItem
                    key={item.label}
                    component={Link}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="mobile-nav-item"
                  >
                    <ListItemText
                      primary={item.label}
                    />
                  </ListItem>
                ))}

              </List>
            </Drawer>
          </>
        ) : (

          /* =================================================
             DESKTOP
          ================================================= */

          <Box className="desktop-nav">

            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                className="nav-link"
              >
                {item.label}
              </Button>
            ))}

          </Box>
        )}

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;