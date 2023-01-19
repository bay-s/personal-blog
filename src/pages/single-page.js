import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../App'
import Author from '../dashboard/author'
import { getPostPage } from '../dashboard/get-data'
import supabase from '../supabase-config'
import Headers from './headers'
import PostPages from './post-pages'
import Sidebar from './Sidebar'
import timeDifference from './timestamp'


const SinglePage = () => {
    const {value} = useContext(AppContext)
    const {id} = useParams()
    const [post,setPost] = useState([])
    const [postPage,setPostPage] = useState('')
    const [loader,setLoader] = useState(false)

    useEffect(() => {
     fetchPost()
     fetchPostPage()
     const timer = setTimeout(() => {
      setLoader(false)
      }, 1000);
      return () => clearTimeout(timer);
    },[post])
    
    const fetchPost = async () => {
     const { data, error } = await supabase
     .from('pages')
     .select()
     .eq('pages_title',id)
     if(data){
       console.log(data);
       setPost(data)
     }if(error) console.log(error.message);
    }
    
    // GET POST PAGES
const fetchPostPage = async () => {
  const data = await getPostPage(value.data.uid)
  console.log(data);
  if(data){
     data.forEach(el => {
      setPostPage(el.post_page)
     });
  }
   }

   
   const createMarkup = (posts) => {
    return {__html:posts.pages_content};
   }
        return(
            <>
          <div className='container is-fluid is-max-widescreen my-5 post'>
          <article className='columns is-multilne'>
              <div className='column is-3 box bg-dark '>
                  <Sidebar />
              </div>
      <div className='column p-0 px-4'>
      {/* start post */}
      {
        
        postPage !== id ?
        post.length < 1 ? "" : post.map(posts => {
       return <div className="tile is-parent p-0">
            <article className="tile is-child box bg-dark is-flex-gap-sm is-flex is-flex-column">
            <div className="card-image mb-2">
                 {posts.pages_thumbnail !== null ? 
                 <figure className="image is-16by9">
                  <img src={posts.pages_thumbnail} alt="Placeholder image" className='post-image w-100 h-100'/>
                  </figure>
                  : ""
                  }
                 
              </div>
                  <p className="title is-3 text-title">{posts.pages_title}</p>
                  <div dangerouslySetInnerHTML={createMarkup(posts)} />
                  <div className='is-flex align-center is-flex-gap-md my-3'>
                  <p className="is-title is-size-7 has-text-grey-lighter">{timeDifference(posts.created_at)}</p>
   
                  </div>
                </article>
    </div>
      })
    /* IF ID AND POSTPAGE NOT THE SAME DISPLAY POSTPAGES */
      : <PostPages />
      }
        {/* END POST */}
      </div>
              {/* end column card */}
          </article>
          </div>
          </> 
        )
}

export default SinglePage;


