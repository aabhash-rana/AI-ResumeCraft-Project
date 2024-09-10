import { UserButton } from '@clerk/clerk-react'
import React from 'react'

function Home() {
  return (
    <div className='flex justify-center my-20 items-center'>
        <UserButton/>
    </div>
  )
}

export default Home