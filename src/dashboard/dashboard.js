import React, { useContext } from 'react'
import { useParams ,Navigate} from 'react-router-dom';
import About from './about';
import Category from './category';
import Comment from './comment';
import Contact from './contact';
import EditProfile from './edit-profile';
import Main from './main';
import MediaLibrary from './media';
import Menus from './menus';
import Page from './pages';
import Posts from './posts';
import Project from './project';
import Sidebar from './sidebar';
import Skills from './skill';


const DashBoard = () => {
const {id} = useParams()
const string_id = id.toString().toLowerCase()

    return( 
<div id="dashboard" >
{/* <Header /> */}
<div class="container is-fluid my-5">
<div className='columns is-multiline dashboard-container'>
{/* START SIDEBAR */}
<div className='column is-3 bg-dark'>
<Sidebar />
</div>
{/* END SIDEBAR */}
<div className='column is-9 p-0 px-3'>
<div className={string_id === 'index' ? 'box bg-dark shadow' : 'hide' }>
<h3 className='is-bold is-title is-size-4 text-title capital'>{string_id === 
'index' ? "Dashboard" : string_id}</h3>
</div>
{string_id === 'index' ?  <Main />  : ""}
{string_id === 'posts' ?  <Posts />  : ""}
{string_id === 'pages' ?  <Page />  : ""}
{string_id === 'category' ?  <Category />  : ""}
{string_id === 'skills' ?  <Skills />  : ""}
{string_id === 'contact' ?  <Contact />  : ""}
{string_id === 'about' ?  <About />  : ""}
{string_id === 'project' ?  <Project />  : ""}
{string_id === 'edit-profile' ? <EditProfile /> : ""}
{string_id === 'menus' ? <Menus /> : ""}
{string_id === 'media' ? <MediaLibrary /> : ""}
{string_id === 'comment' ? <Comment /> : ""}
</div>
{/* END CONTETN */}

{/* END COLUMN RIGHT */}
</div>
{/* END COLUMNS */}
</div>
{/* END CONTAINER */}
</div>

    )
}

export default DashBoard;