import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import supabase from '../supabase-config';
import akun from '../img/akun.jpg'

const Headers = () => {
const {value} = useContext(AppContext);
const [menus,setMenus] = useState([])
const [siteInfo,setSiteInfo] = useState([])

useEffect(() => {
  const fetchMenu = async () => {
    const { data, error } = await supabase
    .from('menu')
    .select()
    if(data){
      setMenus(data)
    }if(error) console.log(error);
     }
     fetchMenu()
     window.addEventListener('scroll',scrolls)
     fetchSiteInfo()
},[])

const fetchSiteInfo = async () => {
  const { data, error } = await supabase
  .from('blog-info')
  .select()
  .eq('id',2)
  if(error) console.log(error.message);
  else {
    setSiteInfo(data[0])
  }
}

const Logout = async e => {
  e.preventDefault()
  const { error } = await supabase.auth.signOut()
  console.log(error);
}

let y = window.scrollX
const header = useRef()
const scrolls = (e) => {
    let x = window.scrollY;
    const headers = header.current
    if (x > y) {
      headers.classList.add("fixed-header");
      console.log("tes");
    }else {
      headers.classList.remove("fixed-header");
      console.log("Tesss");
    }
    
y = x;
  }

const menuList = menus.map(menus => {
  return menus.menu_item.map((menu ,index)=> {
   return  <li key={index} className='hvr-underline-from-center py-3'><Link to={`/pages/${menu}`} className=' has-text-white'>{menu}</Link></li>
  })
})

    return(
<header className='headers p-2 ' ref={header}>
<nav className="navbar mx-5 bg-transparent is-flex justify-center align-center container" role="navigation" aria-label="main navigation">
<ul className='is-flex justify-center align-center is-flex-gap-xl'>
<li className="main-title hvr-underline-from-center py-3" >
<Link  to='/'>
    <h3 className='text-title is-title  is-bold main-title '>{siteInfo.blog_name == null ? 'Home' : siteInfo.blog_name }</h3>
</Link>
</li>
{menuList}
<li className='hvr-underline-from-center py-3'><Link to='/dashboard/index' className=' has-text-white'>Dashboard</Link></li>
<li className={value.isLogin ? '' : 'hide'}>
{/* START DROPDOWN */}
<div class="dropdown is-right is-hoverable">
<li className={value.isLogin ? 'hvr-underline-from-center py-3 is-clickable akun' : 'hide'}>
<div className="is-flex align-center is-flex-gap-md"
>
<figure className="image is-24x24">
<img className='avatars is-rounded' src={value.data.avatar === '' ? akun : value.data.avatar } alt="IMAGES" />
</figure>
<span className='text-title '>{value.data.username}</span>
</div>
</li>
<div class="dropdown-menu fade" id="dropdown-menu" role="menu">
  <div class="dropdown-content bg-dark dropdown-contents">
    <Link className="dropdown-item  is-flex align-center is-flex-gap-md" to={`/profiles/${value.data.username}`} >
    <span className="icon"><i className="fa fa-user text-white"></i></span>
    <span className='text-white'>My Profile</span>
    </Link>
    <Link className="dropdown-item is-flex align-center is-flex-gap-md" to='/dashboard/create-post'>
    <span className="icon"><i class="fa fa-plus-square-o text-white" aria-hidden="true"></i></span>
    <span className='text-white'>Create Post</span>
    </Link>
    <Link className="dropdown-item is-flex align-center is-flex-gap-md" to='/dashboard/index/'>
    <span className="icon"> <i class="fa fa-lock text-white" aria-hidden="true"></i></span>
    <span className='text-white'>DashBoard</span>
    </Link>
    <Link className="dropdown-item is-flex align-center is-flex-gap-md" to='/dashboard/edit-profile'>
    <span className="icon"><i className="fa fa-cog text-white"></i></span>
    <span className='text-white'>Settings</span>
    </Link>
    <hr class="dropdown-divider" />
    <a href="#" class="dropdown-item is-flex align-center is-flex-gap-md">
    <span className="icon"><i className="fa fa-sign-out text-white"></i></span>
    <span onClick={Logout} className='text-white'>Log Out</span>
    </a>
  </div>
</div>
</div>
{/* END DROPDOWN */}
</li>
</ul>

</nav>
</header>
    )
}

export default Headers;


