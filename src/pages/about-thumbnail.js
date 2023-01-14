import React from 'react'

const AboutThumbnail = (props) => {

    return(
<article className='column is-5 '>
<figure class="image is-1by1">
  <img src={props.img} />
</figure>
</article>
    )
}

export default  AboutThumbnail 