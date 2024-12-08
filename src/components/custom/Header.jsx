import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
             <Link to={'/Dashboard'}>
            <img src='/logo.svg' className='cursor-pointer' width={100} height={100} />
            </Link>
            {isSignedIn ?
                <div className='flex gap-2 items-center'>
                    <Link to={'/'}>
                        <Button variant="outline">Home Page</Button>
                    </Link>
                    <Link to={'/dashboard'}>
                        <Button variant="outline">Dashbord</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button>Click to Get Started</Button>
                </Link>
            }

        </div>
    )
}
export default Header