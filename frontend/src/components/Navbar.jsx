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
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteProfile } from "../api/profileApi";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------- ACTIVE ROUTE DETECTION ---------- */
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/")
    );
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Doctors", path: "/doctors" },
    { label: "Pharmacies", path: "/pharmacies" },
  ];
  
  if (user?.role === "pharmacy") {
    menuItems.push({ label: "Manage Medicine", path: "/pharmacy/medicine" });
  }
  if (user?.role === "doctor") {
    menuItems.push({ label: "My Appointments", path: "/doctor/appointments" });
  }
  if (user?.role === "patient") {
    menuItems.push({ label: "My Consultations", path: "/my-consultations" });
  }

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Delete your account permanently? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteProfile(user.role);
      toast.success("Account deleted");
      logout();
      navigate("/");
    } catch (err) {
      toast.error("Delete failed");
    }

    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      className="main-navbar"
      elevation={0}
      color="transparent"
    >
      <Toolbar className="navbar-toolbar">

        {/* =================================================
            LOGO
        ================================================= */}
        <Box component={Link} to="/" className="brand-wrapper">
          <Box className="brand-logo">A</Box>

          <Box className="brand-text">
            <Typography className="brand-name">Telehealth</Typography>
            <Typography className="brand-subtitle">Bridge</Typography>
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
              PaperProps={{ className: "mobile-drawer" }}
            >
              <Box className="mobile-drawer-header">
                <Box className="brand-logo small-logo">A</Box>
                <Typography className="mobile-brand-name">
                  Telehealth Bridge
                </Typography>
              </Box>

              <List className="mobile-nav-list">
                {menuItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <ListItem
                      key={item.label}
                      component={Link}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`mobile-nav-item ${
                        active ? "mobile-nav-item-active" : ""
                      }`}
                    >
                      <ListItemText primary={item.label} />
                    </ListItem>
                  );
                })}

                {!user && (
                  <ListItem
                    component={Link}
                    to="/login"
                    onClick={() => setOpen(false)}
                    className={`mobile-nav-item ${
                      isActive("/login") ? "mobile-nav-item-active" : ""
                    }`}
                  >
                    <ListItemText primary="Login" />
                  </ListItem>
                )}

                {user && (
                  <>
                    <ListItem
                      component={Link}
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className={`mobile-nav-item ${
                        isActive("/profile") ? "mobile-nav-item-active" : ""
                      }`}
                    >
                      <ListItemText primary="My Profile" />
                    </ListItem>

                    <ListItem
                      component={Link}
                      to="/profile/edit"
                      onClick={() => setOpen(false)}
                      className={`mobile-nav-item ${
                        isActive("/profile/edit")
                          ? "mobile-nav-item-active"
                          : ""
                      }`}
                    >
                      <ListItemText primary="Edit Profile" />
                    </ListItem>

                    <ListItem
                      onClick={() => {
                        handleDeleteAccount();
                        setOpen(false);
                      }}
                      className="mobile-nav-item delete-item"
                    >
                      <ListItemText primary="Delete Account" />
                    </ListItem>

                    <ListItem
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="mobile-nav-item"
                    >
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          /* =================================================
             DESKTOP
          ================================================= */
          <Box className="desktop-nav">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  className={`nav-link ${active ? "nav-link-active" : ""}`}
                >
                  {item.label}
                </Button>
              );
            })}

            {!user && (
              <Button
                component={Link}
                to="/login"
                className={`nav-link ${
                  isActive("/login") ? "nav-link-active" : ""
                }`}
              >
                Login
              </Button>
            )}

            {user && (
              <>
                <IconButton
                  onClick={handleAvatarClick}
                  className="profile-avatar-button"
                >
                  <Avatar className="profile-avatar">
                    {user.role.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>

                {/* ---- Blur layer behind the profile menu ---- */}
                {Boolean(anchorEl) &&
                  createPortal(
                    <div
                      className="profile-menu-backdrop"
                      onClick={handleMenuClose}
                      aria-hidden="true"
                    />,
                    document.body
                  )}

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  className="profile-menu"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleMenuClose}
                    className="profile-menu-item"
                  >
                    <PersonIcon fontSize="small" />
                    My Profile
                  </MenuItem>

                  <MenuItem
                    component={Link}
                    to="/profile/edit"
                    onClick={handleMenuClose}
                    className="profile-menu-item"
                  >
                    <EditIcon fontSize="small" />
                    Edit Profile
                  </MenuItem>

                  <Divider className="profile-menu-divider" />

                  <MenuItem
                    onClick={handleDeleteAccount}
                    className="profile-menu-item profile-menu-item-danger"
                  >
                    <DeleteIcon fontSize="small" />
                    Delete Account
                  </MenuItem>

                  <MenuItem
                    onClick={handleLogout}
                    className="profile-menu-item"
                  >
                    <LogoutIcon fontSize="small" />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;