import React, { useEffect, useRef, useState } from 'react'
import Header from '../pages/header';
import EditProfileForm from './edit-profile-form';
import EditSiteForm from './edit-site-form';
import Sidebar from './sidebar';


const EditProfile = () => {
const [open,setOpen] = useState(false)
const active = useRef(null)
const notActive = useRef(null)

const openTabs = (e) => {
    e.preventDefault()

if(e.target.classList.contains('site')) {
    active.current.classList.remove('is-link')
    notActive.current.classList.add('is-link')
    setOpen(true)
}if(e.target.classList.contains('profile')){
    active.current.classList.add('is-link')
    notActive.current.classList.remove('is-link')
    setOpen(false)
}
}
    return(
<>
<div className='box shadow bg-dark is-flex justify-between align-center'>
<h3 className='is-bold is-title is-size-4 text-title'>
    {!open ? 'Edit Profile' : 'Edit Site info'}
</h3>
<div className='is-flex align-center'>
<button className='button is-link is-small profile' ref={active}  onClick={openTabs}>Edit Profile</button>
<button className='button  is-small site' ref={notActive } onClick={openTabs}>Edit Site</button>
</div>
</div>
{/* END TABS PANEL */}
{!open ? <EditProfileForm /> : <EditSiteForm />}

</>
    )
}


export default EditProfile;


