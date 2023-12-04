import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import OutlinedInput from "@mui/material/OutlinedInput";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Link } from "react-router-dom";
import { logout } from "redux/reducers/auth.reducer";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "services/firebase";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import logoImg from "assets/logo.svg";

// icons
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const pages = ["Home", "Projects", "Images", "Assets"];
// const links = [
//   {
//     name: "Home",
//     path: "/",
//   },
//   {
//     name: "Projects",
//     path: "/projects",
//   },
//   {
//     name: "Images",
//     path: "/images",
//   },
//   {
//     name: "Assets",
//     path: "/assets",
//   },
// ];
const settings = [
  { label: "My Profile", icon: <AccountCircleOutlinedIcon /> },
  { label: "Orders", icon: <Inventory2OutlinedIcon /> },
  { label: "Wishlist", icon: <FavoriteBorderOutlinedIcon /> },
  { label: "Coupons", icon: <LocalOfferOutlinedIcon /> },
  { label: "Gift Cards", icon: <PaymentOutlinedIcon /> },
  { label: "Notifications", icon: <NotificationsNoneOutlinedIcon /> },
  { label: "Logout", icon: <PowerSettingsNewOutlinedIcon /> },
];

function Topbar() {
  const {
    auth: { user },
  } = useAppSelector((state) => ({
    auth: state.auth,
  }));
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (type?: string) => {
    try {
      setAnchorElUser(null);
      if (type === "Logout") {
        await signOut(firebaseAuth);
        localStorage.clear();
        dispatch(logout());
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        px: 4,
      }}
    >
      {/* small screen drawer */}
      <Toolbar disableGutters>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon style={{ width: 30, color: "black" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page, index) => (
              <MenuItem key={`page_${index}`} onClick={handleCloseNavMenu}>
                <Link to={page === "Home" ? "/" : `/${page.toLowerCase()}`}>
                  <Typography
                    textAlign="center"
                    sx={{ textDecoration: "none", color: "text.primary" }}
                  >
                    {page}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Container disableGutters sx={{ display: "flex" }}>
          <Box
            sx={{
              flexGrow: { xs: 1, md: 0 },
              alignItems: "center",
              display: "flex",
            }}
          >
            <Link to="/">
              <img
                src={logoImg}
                alt="brand_logo"
                style={{ width: "auto", height: 50 }}
              />
            </Link>
          </Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: 8,
              flexGrow: 1,
            }}
          >
            <OutlinedInput
              placeholder="Search for Products, Brands and More"
              size="small"
              sx={{ minWidth: 350, ml: 3 }}
            />
          </div>
          {/* <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2, flexGrow: 1 }}>
            {links.map((link) => (
              <NavLink key={link.path} to={link.path}>
                {({ isActive }) => (
                  <Button
                    disableRipple
                    key={link.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: isActive ? "text.primary" : "text.disabled",
                      display: "block",
                      fontWeight: 600,
                      fontSize: 16,
                      background: "transparent",
                      "&:hover": {
                        background: "transparent",
                        color: "text.primary",
                      },
                    }}
                  >
                    {link.name}
                  </Button>
                )}
              </NavLink>
            ))}
          </Box> */}

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <IconButton sx={{ mx: 2 }}>
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon color="action" />
              </Badge>
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  style={{ width: 35, height: 35 }}
                  alt={`${user?.displayName}`}
                  src={`${user?.photoURL}`}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}
                  onClick={() => handleCloseUserMenu(setting.label)}
                >
                  <ListItemIcon>{setting.icon}</ListItemIcon>
                  <ListItemText>{setting.label}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
export default Topbar;
