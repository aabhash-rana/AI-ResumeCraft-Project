import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import GlobalApi from '../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {

  const {user}=useUser();
  const [resumeList,setResumeList]=useState([]);
  useEffect(()=>{
    user&&GetResumesList()
  },[user])

  const GetResumesList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      console.log(resp.data.data)
      setResumeList(resp.data.data);
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
   <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">AI Resume<span className='text-primary'>Craft </span></h2>
   <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Craft Your Resume to Stand Out in Any Role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
      <AddResume/>
      {resumeList.length>0?resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
        )):
        [1,2,3,4].map((item,index)=>(
          <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
          </div>
        ))
        }
      </div>
      </div>
  )
}

export default Dashboard