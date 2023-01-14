import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Pagination from '../pages/pagination';
import supabase from '../supabase-config';
import PostList from './post-list';


const Posts = (props) => {
  const [post,setPost] = useState([])
  const [totalPost,setTotalPost] = useState(0)
  const {id} = useParams()
  const [value,setValue] = useState({
    page:0,
    leftPage:totalPost,
    counts:4
    })
  
  useEffect(() => {
   fetchPost()
  },[value.page,value.counts])

  const fetchPost = async () => {
   const { data, error ,count} = await supabase
   .from('posts')
   .select('*', { count: 'exact' })
   .order("id", { ascending: true })
   .range(value.page,value.counts)
   if(data){
     console.log(data);
     setTotalPost(count)
     setPost(data)
   }if(error) console.log(error.message);
  }
 

    return(
<>
<div className='is-flex align-center is-flex-gap-md bg-transparent px-2 mb-2'>
<h3 className='is-bold is-title is-size-4 text-title'>Posts</h3>
<Link to='/dashboard/create-post/' className='button hvr-sweep-to-right is-outlined border-primary bg-transparent text-title is-small'>Add New</Link>
</div>

    {/* start table */}
<section className="section is-main-section p-2">
<PostList post={post} key={post}/>
    {/* <Pagination setValue={setValue} totalPost={totalPost} value={value} /> */}
</section>
{/* end table */}
</>
    )
}

export default Posts;