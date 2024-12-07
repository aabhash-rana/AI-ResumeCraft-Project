import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function Summery({}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summery,setSummery]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();
    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])



    const onSave=(e)=>{
        e.preventDefault();
       
        setLoading(true)
        const data={
            data:{
                summery:summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeid,data).then(resp=>{
            console.log(resp);
            // enabledNext(true);
            setLoading(false);
            toast("Details updated")
        },(error)=>{
            setLoading(false);
        })
    }
    return (
    <div>
          <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
         <h2 className='font-bold text-lg'>Summary</h2>
         <p>Add Summary for your job title</p>

        

                <form className='mt-5' onSubmit={onSave}>
                    <div className='mt-7'> 
                    <div className='flex justify-between item-end'>
                        <label>Add Summary</label>
                         <Button variant="outline" size="sm" className="border-primary">  <Brain className='h-4 w-7' />   Generate from AI</Button>
                    </div>
                    </div>
                        <Textarea className="mt-5" onChange={(e)=>setSummery(e.target.value)}
        />
                    <Button type="submit"
                         disabled={loading}>
                        {loading?<LoaderCircle className='animate-spin' />:'Save'}
                     </Button>

                </form>
         </div>
     </div>

  )
}

export default Summery