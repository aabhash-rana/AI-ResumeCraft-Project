import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIchatSession } from '../../../../../service/AIModal';

const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format"
function Summery({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summery,setSummery]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();

    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])

    const GenerateSummeryFromAI=async()=>{
        setLoading(true)
        const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        console.log('Prompt:',PROMPT);
        const result=await AIchatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()))
        setAiGenerateSummeryList(JSON.parse(result.response.text()))
        setLoading(false);
    }


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
            enabledNext(true);
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
                         <Button variant="outline" size="sm" className="border-primary" onClick={()=>GenerateSummeryFromAI()}>  
                            <Brain className='h-4 w-7' />   Generate from AI</Button>
                    </div>
                    </div>
                        <Textarea className="mt-5" onChange={(e)=>setSummery(e.target.value)}
        />
                    <Button type="submit"
                         disabled={loading}>
                        {loading?<LoaderCircle className='animate-spin' />:'Save'}
                     </Button>

                     {aiGeneratedSummeryList&& <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummeryList?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}
                </form>
         </div>

     </div>

  )
}

export default Summery