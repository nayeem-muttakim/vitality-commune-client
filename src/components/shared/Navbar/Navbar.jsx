"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "@/assets/logo.png";
import { Drawer, List } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import useAuth from "../Hooks/useAuth/page";

const pages = [
  { title: "Home", link: "" },
  { title: "Challenges", link: "challenges" },
  // { title: "Community", link: "community" },
  { title: "Help", link: "help" },
  { title: "Resources", link: "resources" },
];

const settings = [
  { title: "My Progress", link: "my-progress" },
  { title: "Leader Board", link: "leader-board" },
  { title: "Manage Challenges", link: "manage-challenges" },
];

function Navbar(props) {
  const { window } = props;
  const { user, logOut } = useAuth();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    const res = await logOut();
    setAnchorElUser(null);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {pages.map((page) => (
          <Link
            style={{ textDecoration: "none" }}
            key={page.title}
            href={`/${page.link}`}
          >
            <Button
              sx={{
                my: 2,
                color: "#333",
                display: "block",
                mx: "auto",
              }}
            >
              {page.title}
            </Button>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <AppBar component="nav" position="sticky" sx={{ background: "#8fd8d2" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Image src={logo} alt="logo" style={{ width: 150, height: 70 }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <Image src={logo} alt="logo" style={{ width: 150, height: 70 }} />
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "center",
                gap: 17,
              },
            }}
          >
            {pages.map((page) => (
              <Link
                style={{ textDecoration: "none" }}
                key={page.title}
                href={`/${page.link}`}
              >
                <Button
                  sx={{
                    color: "#000000",
                    fontSize: 14,
                  }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box>
            {user ? (
              <Tooltip title={user?.displayName}>
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar
                    sx={{
                      width: { sx: 50, sm: 55 },
                      height: { sx: 40, sm: 50 },
                    }}
                    alt={user?.displayName}
                    src={user?.photoURL}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Link href="SignIn" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 500,
                    p: 1,
                    color: "#000000",
                    transition: "0.3s",
                    "&:hover": {
                      bgcolor: "#809292",
                      color: "white",
                      borderRadius: 2,
                    },
                  }}
                >
                  Login
                </Typography>
              </Link>
            )}

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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  key={setting.title}
                  href={`/${setting.link}`}
                >
                  <MenuItem sx={{ py: 1.5 }} onClick={handleCloseUserMenu}>
                    {setting.title}
                  </MenuItem>
                </Link>
              ))}
              {user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 200,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </AppBar>
  );
}
export default Navbar;
