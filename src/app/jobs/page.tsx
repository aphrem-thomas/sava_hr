"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation';
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, FormControl, InputBase, InputLabel, MenuItem, Modal, Pagination, Paper, Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useEffect, useState } from "react";
import ContactForm from "@/components/contactForm";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';


export default function Jobs() {
  const [page, setPage] = useState(1)
  const [jobs,setJobs] = useState([])
  const [jobList, setJoblist] = useState<any>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState('')
  const [jobDetails, setJobDetails] = useState<any>({})
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [roles, setRoles] = useState<any>([])
  const [jobCount, setJobCount] = useState(0)
  const [searchText, setSearchText] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [locations, setLocations] = useState<any>([])
  const [detailsOpenId, setDetailsOpenId] = useState<string>("")
  const [fetchingJobs, setFetchingJobs] = useState<boolean>(false);
  const [fetchingJobDetails, setFetchingJobDetails] = useState<boolean>(false);
  const router = useRouter();
  const [renderCompleted, setRenderCompleted] = useState<boolean>(false);

  const themeColor = "#4cc0b4";
  // To access cookies on the client side
  // Example: get a cookie value by name
  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const getJobs = () => {
    setFetchingJobs(true);
    fetch('/api/jobs',{
    method:'GET',
    }).then((res)=> res.json().then((data)=>{
      const jobs = JSON.parse(data)
      setJobs(jobs)
      setRoles([...new Set(jobs.map((job:any) => job.role))])
      setLocations([...new Set(jobs.map((job:any) => job.location))])
      setJobsListAndCount(jobs,page);
      setFetchingJobs(false);
      setFetchingJobDetails(true);
      fetch(`/api/job/${jobs[0].id}`,{method:'GET'}).then((resp)=>{
        resp.json().then((data)=>{
          setJobDetails(JSON.parse(data))
          setFetchingJobDetails(false);
        })
      })
    }));
  }

  useEffect(()=>{
    getJobs();
    setRenderCompleted(true);
  }
,[])


  const setJobsListAndCount = (jobs:any, page:number) => {
    setJoblist(jobs.slice((page-1)*10, (page*10)-1));
    setJobCount(jobs.length);
    if (jobs.length > 0) {
      setSelectedJob(jobs[page > 1 ? (page-1)*10 : 0].id);
    }
  };


  const getJobDetails = (id:any)=>{
    setFetchingJobDetails(true);
    fetch(`/api/job/${id}`,{
      method:'GET',
    }).then((resp)=>{
      resp.json().then((data)=>{
        setJobDetails(JSON.parse(data))
        setFetchingJobDetails(false);
      })
    })
  }

  const deleteJob = (id:any)=>{
    fetch(`/api/job/${id}`,{
      method:'DELETE',
       headers:{
        'X-CSRF-TOKEN':document.cookie.split('=')[1]
      }
    }).then((resp)=>{
      resp.json().then((data)=>{
        getJobs();
      })
    })
  }
  
  const handlePageChange=(e:any, value:any)=>{
    setPage(value)
   if (selectedLocation || selectedRole) {
      const filteredJobs = jobs.filter((job:any) =>
        job.location.toLowerCase() === selectedLocation.toLowerCase() || job.role.toLowerCase() === selectedRole.toLowerCase()
      );
      setJobsListAndCount(filteredJobs,value);
    }
    setJobsListAndCount(jobs,value)
  }

  const onSearchChange = (e:any) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    if (searchTerm === "" && !selectedLocation && !selectedRole) {
      setJobsListAndCount(jobs,page);
    } 
    else if (selectedLocation || selectedRole) {
      const filteredJobs = jobs.filter((job:any) =>
        (job.title.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm) || job.location.toLowerCase().includes(searchTerm)) &&
        (job.location.toLowerCase() === selectedLocation.toLowerCase() || job.role.toLowerCase() === selectedRole.toLowerCase())
      );
      setJobsListAndCount(filteredJobs, page);
    }
    else {
      const filteredJobs = jobs.filter((job:any) =>
        (job.title.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm) || job.location.toLowerCase().includes(searchTerm))
      );
      setJobsListAndCount(filteredJobs, page);
    }
  };

  const detailsSection = () => {
    return (
      <>
        <div className="aboutSection">
          <div className="aboutHeader text-xl text-black mt-6">
            About the job
          </div>
          <div className="aboutContent mt-2" dangerouslySetInnerHTML={{ __html:jobDetails.description}}></div>
        </div>
        <div className="requirementsSection">
          <div className="reqHeader text-xl text-black mt-6">Requirements</div>
          <div className="reqs ml-4 mt-2">
            <ul className="list-disc">
              {jobDetails?.requirements?.map((item:string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="applyButton mt-8">
          <Button onClick={() => setModalOpen(true)} variant="contained">
            Apply
          </Button>
        </div>
      </>
    );
  };
  return (
    renderCompleted ? (
      <div className="flex justify-center w-full text-primaryfont bg-[#f4f2ee]">
        <div className="md:max-w-[1129px] w-full mt-16">
        <div className="header w-full p-8 pb-0 md:mt-4 md:pl-0 md:pr-0">
          <div className="headerText text-3xl md:text-4xl">Find your dream job</div>
          <div className="headertext text-sm md:text-lg mt-4">
            Search vast list of jobs in Canada
          </div>
          {getCookie('csrf_access_token') && (
            <div className="addjobbutton">
              <Button onClick={() => router.push('/addjob')} variant="text">Add Job</Button>
            </div>
          )}
        </div>
        <div className="jobs flex flex-col p-8 pt-0 md:p-0">
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
              <IconButton onClick={()=>{
                if (menuOpen) {
                  setSelectedRole('');
                  setSelectedLocation('');
                  setJobsListAndCount(jobs, page);
                  setSearchText('');
                }
                setMenuOpen(!menuOpen)
                }} sx={{ p: "10px" }} aria-label="menu">
                {!menuOpen?<MenuIcon />:<CloseIcon/>}
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search jobs"
                onChange={onSearchChange}
                value={searchText}
                inputProps={{ "aria-label": "search jobs" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <div className="listing flex flex-col mt-6">
            {menuOpen && <div className="filterOptions w-full flex flex-col justify-between md:flex-row h-40 pt-4 pb-4">
              <div className="role w-full">
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    className="w-full bg-white"
                    onChange={(e) => {
                      const selectedRole = e.target.value as string;
                      setSelectedRole(selectedRole);
                      if (selectedRole === "") {
                        setJobsListAndCount(jobs, page);
                      } else {
                        const filteredJobs = jobs.filter((job:any) =>
                          job.role.toLowerCase() === selectedRole.toLowerCase()
                        );
                        setJobsListAndCount(filteredJobs, page);
                      }
                    }
                    }
                  >
                    <MenuItem value="">All Roles</MenuItem>
                    {roles.map((role:any, index:number) => (
                      <MenuItem key={index} value={role}>{role}</MenuItem>
                    ))}
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
                    className="w-full bg-white"
                    onChange={(e) => {
                      const selectedLocation = e.target.value as string;
                      setSelectedLocation(selectedLocation);
                      if (selectedLocation === "") {
                        setJobsListAndCount(jobs, page);
                      } else {
                        const filteredJobs = jobs.filter((job:any) =>
                          job.location.toLowerCase() === selectedLocation.toLowerCase()
                        );
                        setJobsListAndCount(filteredJobs, page);
                      }
                    }}
                  >
                    <MenuItem value="">All Locations</MenuItem>
                    {locations.map((location:any, index:number) => (
                      <MenuItem key={index} value={location}>{location}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>}
            <div className="jobsSection flex h-screen">
              <div className="joblist h-full overflow-auto w-full mr-1 md:w-[500px]">
                {jobList.length?jobList.map((job:any) => 
                    <Card 
                      id={job.id}
                      key={job.id}
                      variant="outlined"
                      className="mb-1"
                      onClick={()=>{
                        setSelectedJob(job.id)
                        getJobDetails(job.id)
                        setDetailsOpenId("");
                      }}
                      data-active={selectedJob === job.id ? '' : undefined}
                      sx={{
                        padding:'2',
                        cursor: 'pointer',
                        '&[data-active]': {
                          backgroundColor: 'action.selected',
                          '&:hover': {
                            backgroundColor: 'action.selectedHover',
                          },
                        },
                      }}
                      >
                      <CardContent>
                        <Box sx={{ color: "text.secondary", fontSize: "14px" }}>
                          <Box sx={{  fontSize: "18px" , color: "#1976d2"}}>
                            {job.title}
                            {getCookie('csrf_access_token') && <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={(e)=>{
                            e.stopPropagation();
                            deleteJob(job.id);
                          }}>
                            <DeleteIcon />
                          </IconButton>}
                          </Box>
                        </Box>
                        
                        <Box sx={{ fontWeight:"700", color: "text.secondary", mb: "2px" }}>
                          {job.company}
                        </Box>
                        <Box sx={{ color: "text.secondary", mb: "2px" }}>
                          {job.location}<FmdGoodIcon sx={{marginLeft:'4px'}} fontSize='small'/>
                        </Box>
                        <Box sx={{ color: "text.secondary", fontSize : "12px", mb: "8px"}}>
                          {new Date(job.date).toLocaleDateString()}
                        </Box>
                        <Box>
                          {job.description}
                        </Box>
                        <Box className="md:hidden" sx={{ fontSize: "16px", color:"#1976d2", mb: "8px"}} onClick={(e)=>{
                          e.stopPropagation();
                          if (detailsOpenId === job.id) {
                            setDetailsOpenId("");
                          } else {
                            setSelectedJob(job.id)
                            getJobDetails(job.id)
                            setDetailsOpenId(job.id);
                          }}}>
                          {detailsOpenId === job.id ? 'Hide Details' : 'Show Details'}
                        </Box>
                        {detailsOpenId === job.id && (fetchingJobDetails?'Loading...': <Box>
                        {detailsSection()}
                        </Box>)}
                      </CardContent>
                    </Card>
                  )
                  : fetchingJobs?<div>Loading...</div>:<div>No listing found</div>}
                  { <div className="pagination w-full flex justify-center">
                    <Pagination className="mt-2" count={Math.ceil(jobCount/10)} page={page} onChange={handlePageChange} />
                  </div>}
              </div>
              {!!Object.keys(jobDetails).length && <div className="jobDetails w-full hidden md:block border-[1px] bg-white flex-grow mb-[45px] overflow-auto">
                  {!fetchingJobDetails?<div className="jobdetailsSection border-solid p-12">
                    <div className="companyName">{jobDetails.company}</div>
                    <div className="role text-black text-4xl">{jobDetails.role}</div>
                    <div className="location text-xl mt-2">{jobDetails.location}</div>
                    {detailsSection()}
                  </div>:<div className="flex h-full justify-center items-center text-3xl">
                    <div>Loading...</div>
                  </div>}
              </div>}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={()=>setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ContactForm jobId={selectedJob}/>
        </Box>
      </Modal>
    </div>):<></>
  );
}
