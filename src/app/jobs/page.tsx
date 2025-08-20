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
import { Divider, FormControl, InputAdornment, InputBase, InputLabel, MenuItem, Modal, Pagination, Paper, Select, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useEffect, useRef, useState } from "react";
import ContactForm from "@/components/contactForm";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Footer from "@/components/Footer";


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
  const [selectedRole, setSelectedRole] = useState<string>('All Roles')
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations')
  const [locations, setLocations] = useState<any>([])
  const [detailsOpenId, setDetailsOpenId] = useState<string>("")
  const [fetchingJobs, setFetchingJobs] = useState<boolean>(false);
  const [fetchingJobDetails, setFetchingJobDetails] = useState<boolean>(false);
  const router = useRouter();
  const [renderCompleted, setRenderCompleted] = useState<boolean>(false);
  const scrollableRef = useRef<HTMLDivElement>(null);

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
        setTimeout(() => {
          if (scrollableRef.current && !fetchingJobDetails) {
            const targetItem = scrollableRef.current.children[id] as HTMLElement;
            if (targetItem) {
              const htmlTargetItem = targetItem as HTMLElement;
              scrollableRef.current.scrollTo({
                top: htmlTargetItem.offsetTop,
                behavior: "smooth",
              });
            }
          }
        }, 200);
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
    if (searchTerm === "" && selectedLocation==='All Locations' && selectedRole==='All Roles') {
      setJobsListAndCount(jobs,page);
    } 
    else if (selectedLocation!=='All Locations' || selectedRole!=='All Roles') {
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
          <Button onClick={() => setModalOpen(true)}
            sx={{
              backgroundColor: themeColor,
              color: "#fff",
              "&:hover": {
                backgroundColor: themeColor,
              },
            }}
           variant="contained">
            Apply
          </Button>
        </div>
      </>
    );
  };

  const SearchSection = () => (
    <div className="w-full">
                <div className="flex searchSection w-full">
                <TextField id="standard-basic" variant="standard"
                  value={searchText}
                  onChange={onSearchChange}
                  className="w-full"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="start"
                          className="cursor-pointer"
                          onClick={()=>{
                          if (menuOpen) {
                            setSelectedRole('All Roles');
                            setSelectedLocation('All Locations');
                            setJobsListAndCount(jobs, page);
                            setSearchText('');
                          }
                          setMenuOpen(!menuOpen)
                          }}
                        >
                          {!menuOpen?<MenuIcon />:<CloseIcon/>}
                        </InputAdornment>
                      )
                  },
                }}
                />
              </div>
            {menuOpen && <div className="filterOptions w-full md:w-[350px] flex flex-col justify-between md:flex-row h-40 pt-4 pb-4">
              <div className="role w-full">
                <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    className="w-full bg-white"
                    value={selectedRole}
                    onChange={(e) => {
                      const selectedRole = e.target.value as string;
                      setSelectedRole(selectedRole);
                      if (selectedRole === "All Roles") {
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
                    <MenuItem value="All Roles">All Roles</MenuItem>
                    {roles.map((role:any, index:number) => (
                      <MenuItem key={index} value={role}>{role}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="location w-full mt-2 md:ml-2 md:mt-0">
                <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Location"
                    className="w-full bg-white"
                    value={selectedLocation}
                    onChange={(e) => {
                      const selectedLocation = e.target.value as string;
                      setSelectedLocation(selectedLocation);
                      if (selectedLocation === "All Locations") {
                        setJobsListAndCount(jobs, page);
                      } else {
                        const filteredJobs = jobs.filter((job:any) =>
                          job.location.toLowerCase() === selectedLocation.toLowerCase()
                        );
                        setJobsListAndCount(filteredJobs, page);
                      }
                    }}
                  >
                    <MenuItem value="All Locations">All Locations</MenuItem>
                    {locations.map((location:any, index:number) => (
                      <MenuItem key={index} value={location}>{location}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>}
            </div>
  )

  return (
    renderCompleted ? (
    <>
      <div className="flex justify-center w-full text-primaryfont">
        <div className="md:max-w-[1129px] w-full mt-16">
        <div className="header w-full p-8 pb-0 md:mt-4 md:pl-0 md:pr-0">
          <div className="flex w-full justify-between">
            <div className="headerText text-3xl md:text-4xl">Find your dream job</div>
            <div className="filter w-full md:w-[350px] flex flex-col relative">
              <div className="absolute w-full hidden md:block">{SearchSection()}</div>
          </div>
          </div>
          <div className="headertext text-sm md:text-lg mt-4">
            Search vast list of jobs in Canada
          </div>
          <div className="md:hidden mt-4 relative">
            <div>{SearchSection()}</div>
          </div>
          {getCookie('csrf_access_token') && (
            <div className="addjobbutton">
              <Button onClick={() => router.push('/addjob')} variant="text">Add Job</Button>
            </div>
          )}
        </div>
        <div className="jobs flex flex-col p-8 pt-0 md:p-0">
          <div className="listing flex flex-col mt-6">
            <div className="jobsSection flex h-screen">
              <div ref={scrollableRef} className="joblist relative h-full overflow-auto w-full mr-1 md:w-[500px]">
                {jobList.length?jobList.map((job:any) => 
                    <Card 
                      id={job.id}
                      key={job.id}
                      variant="outlined"
                      onClick={()=>{
                        setSelectedJob(job.id)
                        getJobDetails(job.id)
                        setDetailsOpenId("");
                        }}
                        data-active={selectedJob === job.id ? '' : undefined}
                        sx={{
                          cursor: 'pointer',
                          ...(selectedJob === job.id && {
                          borderLeft: `4px solid ${themeColor}`,
                          }),
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
                          <Box sx={{  fontSize: "18px" }}>
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
                          {job.location}<FmdGoodIcon sx={{marginLeft:'4px', fontSize:'12px'}}/>
                        </Box>
                        <Box sx={{ color: "text.secondary", fontSize : "12px", mb: "8px"}}>
                          {new Date(job.date).toLocaleDateString()}
                        </Box>
                        <Box>
                          {job.description}
                        </Box>
                        <Box className="md:hidden" sx={{ fontSize: "12px", color:"#1976d2", mb: "8px"}} onClick={(e)=>{
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
                  {jobCount>9 && <div className="pagination w-full flex justify-center">
                    <Pagination className="mt-2" count={Math.ceil(jobCount/10)} page={page} onChange={handlePageChange} />
                  </div>}
              </div>
              {!!jobDetails && !!Object.keys(jobDetails).length && <div className="jobDetails w-full hidden md:block border-[1px] bg-white flex-grow mb-[45px] overflow-auto">
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
    </div>
    <Footer/>
    </>):<></>
  );
}
