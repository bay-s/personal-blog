import React, { useRef, useState } from 'react'


const EditSiteLogo = (props) => {
    const [active,setActive] = useState(false)
    const images = useRef(null)

    const openCollapse = (e) => {
     e.preventDefault()
     const collapse= e.target.parentElement.parentElement
     setActive(!active);
     collapse.classList.toggle('is-active')
    }

return(
    <div className='test'>
<label class="label text-white">Site Logo</label>
{/* UPLOAD BUTTON */}
<div class="file has-name is-boxed is-info mx-auto is-centered">
  <label class="file-label" onClick={props.data.openModal}> 
    <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-upload"></i>
      </span>
      <span class="file-label">
        Featured Images
      </span>
    </span>
  </label>
</div>
{/* UPLOAD BUTTON */}
 {/*  IMAGE ATTACHMENT  */}
 <div className='is-flex is-flex-column is-flex-gap-lg p-2' key={props.data.imgPreview}>
 <figure class={props.siteInfo.blog_logo === ''  ? 'hide' : "image is-128x128 mx-auto"} tabIndex="-1" id='image-media' ref={images} >
   <img  src={props.siteInfo.blog_logo} className={props.data.imgPreview === '' ? 'h-100 w-100 media' : 'hide'} />
   <img  src={props.data.imgPreview} className={props.data.imgPreview === '' ? 'hide' : 'h-100 w-100 media'} />
 </figure>
 {/* BUTTON REMOVE */}

 <div className={!props.data.isSave  ? 'hide' : ''}>
 <button className='button is-info is-outlined is-small navbar-start text-white' onClick={props.data.openModal}>Replace Image</button>
 <span className='is-clickable has-text-danger is-underlined is-size-7 remove' onClick={props.data.selectImage}>Remove Featured images</span>
 </div>
 {/* END BUTTON ACTION */}
 </div>
 {/* END IMAGE ATTACHMENT */}
</div>
)
}

export default EditSiteLogo;