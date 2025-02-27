"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, FormControl, InputBase, InputLabel, MenuItem, Pagination, Paper, Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useState } from "react";

let jobs = [
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-1",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-2",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-3",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-4",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-5",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-6",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-7",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-8",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-9",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-10",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-11",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-12",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-13",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-14",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-15",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-16",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-17",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-18",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-19",
    company:"Accenture"
  },
  {
    date: "10-Jan-2025",
    location: "Ottawa",
    description: "kadjfaldkfja;ldkfja;ldfkja lfjaldsfjdalfjdaklfjkjdslk ",
    title: "Software developer-20",
    company:"Accenture"
  },

];

export default function Jobs() {
  const [page, setPage] = useState(1)
  const [jobList, setJoblist] = useState<any>([...jobs.slice((page-1)*10, page*10)])
  const [menuOpen, setMenuOpen] = useState(false)
  
  const handlePageChange=(e:any, value:any)=>{
    setPage(value)
    if (jobs.length){
      setJoblist([...jobs.slice((value-1)*10, value*10)])
    }
  }
  return (
    <div className="flex justify-center w-full mt-20 text-primaryfont ">
      <div className="container p-10">
        <div className="header">
          <div className="headerText text-4xl">Find your dream job</div>
          <div className="headertext text-lg mt-4">
            Search vast list of jobs in Canada
          </div>
          <div className="addjobbutton">
            <Button variant="text">Add Job</Button>
          </div>
        </div>
        <div className="jobs flex flex-col">
          <div className="filter w-full mt-8">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <IconButton onClick={()=>setMenuOpen(!menuOpen)} sx={{ p: "10px" }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search jobs"
                inputProps={{ "aria-label": "search jobs" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <div className="listing flex flex-col">
            {menuOpen && <div className="filterOptions w-full flex flex-col justify-between md:flex-row h-40 pt-4 pb-4">
              <div className="role w-full">
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    className="w-full"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="location w-full mt-2 md:ml-2 md:mt-0">
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Location"
                    className="w-full"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>}
            <div className="joblist w-full">
              {jobList.map((job:any) => 
                  <Card variant="outlined" className="mt-4">
                    <CardContent>
                      <Box sx={{ color: "text.secondary", fontSize: "14px" }}>
                        {job.date}
                      </Box>
                      <Box sx={{ fontWeight: "700", fontSize: "20px" }}>
                        {job.title}
                      </Box>
                      <Box sx={{ color: "text.secondary", mb: "5px" }}>
                        {job.location}
                      </Box>
                      <Box>
                        {job.description}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                )}
            </div>
          </div>
          <div className="pagination w-full flex justify-center">
            <Pagination className="mt-2" count={10} onChange={handlePageChange}/>
          </div>
        </div>
      </div>
    </div>
  );
}
