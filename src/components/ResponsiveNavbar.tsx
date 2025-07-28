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
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [transparentBG, setTransparentBG] = useState(true);
  const [selection, setSelection] = useState('')
  let windowHeight = 0;
  let windowWidth = 0;
  let transparentThreshold = 0;
  const routes= [
    {id:'jobs', name:'Jobs'},
    {id:'events', name:'Events'},
    {id:'contact', name:'Contact'},
]
  if (typeof window !== "undefined") {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    console.log("window width", windowWidth)
    if(windowWidth<431){
      transparentThreshold=200
    }else if(windowWidth>430 && windowWidth<1435){
      transparentThreshold=400
    } else if(windowWidth>1435){
      transparentThreshold=900
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setSelection(getPath())
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    console.log("sta",windowWidth ,window.scrollY)
    if (window.scrollY >= transparentThreshold) {
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
        {routes.map((item)=>{
                    return(
                      <ListItem key={item.id} disablePadding sx={{ textAlign: "center", width:"100%" }}>
                        <Link href={item.id}>
                        <ListItemButton sx={{ textAlign: "center", width:"100%" }}>
                          <ListItemText primary={item.name} />
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

  const transparentBackground = () => transparentBG&&pathname==='/'

  const getPath = ():string => pathname.split('/').pop()??''

  return (
    <Box sx={{ display: "flex"}}>
      {/* <CssBaseline /> */}
      <AppBar
        component="nav"
        sx={{
          backgroundColor:transparentBackground()?'transparent':'#FFF',
          color:transparentBackground()?'#FFF':'#53565A',
          border:transparentBackground()?'':'1px solid #53565A',
          boxShadow:'unset',
        }}
        className={`w-full flex justify-center items-center fixed z-10 !h-16  md:h-28`}
      >
        <div className="max-w-[1129px] w-full">
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
          <div className="logo text-4xl font-bold"><Link onClick={()=>setSelection('/')} href="/">SavaHR</Link></div>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
             {routes.map((item)=>{
                    return(
                      <Link href={item.id}>
                          <Button onClick={()=>setSelection(item.id)} key={item.id} sx={
                            {
                              fontSize:'24px',
                              color:transparentBackground()?'#FFF':'#53565A',
                              borderColor:'#53565A',
                              borderRadius:'14px'
                              }}>
                            <span className={selection===item.id?"font-bold":"font-thin"}>{item.name}</span>
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
