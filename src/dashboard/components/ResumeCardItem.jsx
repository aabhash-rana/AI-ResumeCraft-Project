import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function ResumeCardItem({resume,refreshData}) {
  return (
    <Link to={'/dashboard/resume/'+resume.documentId+"/edit"}>
    <div className='mt-5 p-14 py-24 border 
    items-center flex 
    justify-center bg-gradient-to-b
          from-green-100 via-green-200 to-green-200
    rounded-lg shadow-lg h-[250px] 
    hover:scale-105 transition-all hover:shadow-md
    '>
   <Notebook/>
   </div>
 
  <h2 className='text-sm'> {resume.title}</h2>
         
</Link>

  )
}

export default ResumeCardItem