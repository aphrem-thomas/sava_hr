'use client'

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Link from 'next/link'
import { useEffect, useState } from "react";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export default function ResponsiveNavbar(props: Props) {
  const win = props.window;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [transparentBG, setTransparentBG] = useState(true);
  let windowHeight = 0;
  if (typeof window !== "undefined") {
    windowHeight = window.innerHeight;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (windowHeight - window.scrollY <= 370) {
      setTransparentBG(false);
    } else {
      setTransparentBG(true);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SavaHR
      </Typography>
      <Divider />
      <List>
        {["Contact", "Jobs", "About Us", "Resources"].map((item)=>{
                    return(
                      <ListItem key={item} disablePadding sx={{ textAlign: "center", width:"100%" }}>
                        <Link href={item}>
                        <ListItemButton sx={{ textAlign: "center", width:"100%" }}>
                          <ListItemText primary={item} />
                        </ListItemButton>
                        </Link>
                      </ListItem>
                    )
        })}
      </List>
    </Box>
  );

  const container =
    win !== undefined ? () => win().document.body : undefined;

  return (
    <Box sx={{ display: "flex"}}>
      {/* <CssBaseline /> */}
      <AppBar
        component="nav"
        sx={{
          backgroundColor:transparentBG?'transparent':'#FFF',
          color:transparentBG?'#FFF':'#53565A',
          boxShadow:'unset',
        }}
        className={`w-full flex justify-center items-center fixed z-10 !h-16  md:h-28`}
      >
        <div className="container">
        <Toolbar sx={{width:'100%'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
          <div className="logo text-4xl font-bold">SavaHR</div>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
             {["Contact", "Jobs", "About Us", "Resources"].map((item)=>{
                    return(
                      <Link href={item}>
                          <Button key={item} sx={{fontSize:'24px', color:transparentBG?'#FFF':'#53565A' }}>
                            {item}
                          </Button>
                          </Link>
                    )
                })}
                
          </Box>
          </Box>
        </Toolbar>
        </div>
      </AppBar>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
