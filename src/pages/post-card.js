import React from 'react'
import { Link } from 'react-router-dom'
import timeDifference from './timestamp';
import img from '../img/no-image.png'

const PostCard = (props) => {

    return(
        <div className="tile is-parent px-3 p-0 mb-4 ">
        <article className="tile is-child box bg-dark is-flex-gap-sm is-flex is-flex-column">
         <div className="card-image mb-2">
            <figure className="image is-2by1">
             {props.posts.post_thumbnail !==  ''  ? 
             <Link to={`/post/${props.posts.id}`} >
             <img src={props.posts.post_thumbnail} alt="Placeholder image" className='post-image'/>
             </Link>
              :  <img src={img} alt="Placeholder image" className='post-image w-100 h-100'/>
              }
             
            </figure>
          </div>
              <p className="title is-3"><Link to={`/post/${props.posts.id}`} className='text-title'>{props.posts.post_title}</Link></p>
              <p className="subtitle is-7 has-text-grey">{timeDifference(props.posts.created_at)}</p>
              <p className="subtitle is-6 text-white lh-md text-ellips">{props.posts.the_excerpt}
              &hellip;
              </p>
              {/* <div dangerouslySetInnerHTML={createMarkup(posts)} /> */}
              <Link to={`/post/${props.posts.id}`} className='button hvr-sweep-to-right  is-outlined border-primary bg-transparent navbar-start'>
              Read More
              </Link>
            </article>
         </div>
    )
}

export default PostCard;