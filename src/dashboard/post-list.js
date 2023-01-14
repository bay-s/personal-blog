import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import supabase from '../supabase-config'
import Author from './author'
import PostCat from './post-cat'
import PostTag from './post-tag'


const PostList = (props) => {
  const {value} = useContext(AppContext)
  const deletePost = async (e) => {
    e.preventDefault()
    const id = parseInt(e.target.dataset.target)
    console.log(id);
    if(window.confirm("Are you sure want to delete this post ?")){
      const { data,error } = await supabase.from('posts')
       .delete()
       .eq('id', id)
       .select()
       if(data)  {
        alert("Delete post success")
        decrementPosts() 
        window.location.reload()
      }
       if(error) alert(`Something wrong ${error.message}`)
    }
  }

  const decrementPosts = async () => {
    const { data, error } = await supabase
    .rpc('decrement', { x: 1, row_id:value.data.id })
    if(error) console.log(error.message);
    else console.log(data);
   }
    return(
      props.post.length < 1 ? "" : props.post.map((posts ,index) => {
        return <tr className=' box bg-dark align-center justify-between'>
        <td className="is-checkbox-cell w-25" >
        <Link  to={`/post/${posts.id}`}  className='is-size-6 text-title'>{posts.post_title}</Link>
        </td>
        <td className="is-image-cell w-25">
        <div className='is-flex justify-between align-center actions'>
        <ul className='is-flex is-flex-gap-lg align-center'>
          <li className='is-flex align-center is-flex-gap-md '>
          <i className="fa fa-heart-o text-white" ></i> 
          <span className='is-size-7 text-white'>{posts.total_likes < 1 ? '0' : posts.total_likes}</span>
          </li>
          <li className='is-flex align-center is-flex-gap-md '>
          <i className="fa fa-comment-o text-white" aria-hidden="true"></i>
          <span className='is-size-7 text-white'>{posts.total_comment < 1 ? "0" : posts.total_comment}</span>
          </li>
        </ul>
        </div>
        </td>
        <td data-label="Author w-25">
        <small className="text-white  is-abbr-like text-nowrap is-size-6" title= {posts.created_at}>
            {posts.created_at}
        </small>
        </td>
        <td data-label="Action">
        <div className="buttons is-right is-flex align-center is-flex-gap-lg">
            <Link to={`/dashboard/edit-post/${posts.id}`} className='is-title is-size-6 text-title'>Edit</Link>
             <i className="fa fa-trash has-text-danger is-size-5 is-clickable" data-target={posts.id} type="button" onClick={deletePost }></i>
          </div>
        </td>
        </tr>
        })        
        
    )
}

export default PostList;