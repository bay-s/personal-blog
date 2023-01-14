import React from 'react'

const AboutText = (props) => {
    const text = props.text
    const createMarkup = (text) => {
        return {__html:text};
       }
         
    return(
 <article className='column is-7  is-flex-column is-flex-gap-xl'>
<div className='about-text px-6' dangerouslySetInnerHTML={createMarkup(text)} />
</article>
    )
}

export default  AboutText 


{/* <div className='is-flex-column '>
<h3 className='title is-3 text-white is-title'>About</h3>
<p className='has-text-white-ter lh-lg'>
Use this bio section as your way of describing yourself and saying what you do, what technologies you like to use or feel most comfortable with, describing your personality, or whatever else you feel like throwing in.
</p>
</div>
<div className='is-flex-column '>
<h3 className='title is-3 text-white is-title'>Contact Details</h3>
<p className='has-text-white-ter lh-lg'>
Use this bio section as your way of describing yourself and saying what you do, what technologies you like to use or feel most comfortable with, describing your personality, or whatever else you feel like throwing in.
</p>
</div> */}


