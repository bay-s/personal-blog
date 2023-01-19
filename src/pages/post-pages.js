import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../App'
import Author from '../dashboard/author'
import supabase from '../supabase-config'
import Sidebar from './Sidebar'
import timeDifference from './timestamp'


const PostPages = () => {
    const {value} = useContext(AppContext)
    const {id} = useParams()
    const [post,setPost] = useState([])
    const [loader,setLoader] = useState(false)

    useEffect(() => {
     fetchPost()
     const timer = setTimeout(() => {
      setLoader(false)
      }, 1000);
      return () => clearTimeout(timer);
    },[post])
    
    const fetchPost = async () => {
     const { data, error } = await supabase
     .from('posts')
     .select()
     if(data){
       console.log(data);
       setPost(data)
     }if(error) console.log(error.message);
    }

    const createMarkup = (posts) => {
     return {__html:posts.the_excerpt};
    }
        return(

      <div className='column p-0 px-4 is-flex-column is-flex-gap-md'>
      {/* start post */}
      {post.length < 1 ? "" : post.map(posts => {
       return <div className="tile is-parent p-0">
            <article className="tile is-child box bg-dark is-flex-gap-sm is-flex is-flex-column">
            <div className="card-image mb-2">
                 {posts.post_thumbnail === '' || null ? 
                     ""
                  : 
                  <figure className="image is-16by9">
                  <img src={posts.pages_thumbnail} alt="Placeholder image" className='post-image w-100 h-100'/>
                  </figure>
                  }
                 
              </div>
               <Link to={`/post/${posts.id}`} >
                  <p className="title is-3 text-title">{posts.post_title}</p>
               </Link>   
                  <div className='has-text-white-ter' dangerouslySetInnerHTML={createMarkup(posts)} />
                  <div className='is-flex align-center is-flex-gap-md my-3'>
                  <p className="is-title is-size-7 has-text-grey-lighter">{timeDifference(posts.created_at)}</p>
   
                  </div>
                </article>
    </div>
      })
      }
        {/* END POST */}
      </div>

        )
}

export default PostPages;


