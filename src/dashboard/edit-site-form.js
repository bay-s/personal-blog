import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import supabase from '../supabase-config';
import UploadAvatar from './edit-avatar.js';
import EditSiteLogo from './edit-site-form-logo';
import ErrorMessage from './error-message';
import MediaUpload from './media-upload';
import UploadMedia from './upload-media';


const EditSiteForm = (props) => {
const {value} = useContext(AppContext)
const [siteInfo,setSiteInfo] = useState([])
const [modal,setModal] = useState(false)
const [isSave,setIsSave] = useState(false)
const [datas,setDatas] = useState({
 blog_name:'',
 blog_logo:''
})
const [values, setValues] = useState({
  excerpt:'',
  imgPreview:''
});

const [message,setMessage] = useState({
  pesan:'',
  error:'',
  sukses:'',
  isSubmit:false
})

useEffect(() => {
const fetchSiteInfo = async () => {
  const { data, error } = await supabase
  .from('blog-info')
  .select()
  .eq('id',value.data.id)
  if(error) console.log(error.message);
  else {
    setSiteInfo(data[0])
  }
}
fetchSiteInfo()
},[])

const handlerChange = (e) => {
const {name,value} = e.target
setDatas({...datas,
  [name]:value
  })
if(datas.blog_name.length < 1){
  setMessage({
    isSubmit:false
  })
}else{
  setMessage({
    isSubmit:true
  })
}
}

const insertSiteInfo = async (e) => {
  e.preventDefault()
  if(!datas.blog_name) {
    setMessage({
      pesan:`Input fields required`,
      error:true,
      sukses:false,
      isSubmit:false
    })
    return
  }
  const { data, error } = await supabase
  .from('blog-info')
  .upsert({ 
    id:value.data.id,
    blog_name:datas.blog_name,
    blog_logo:values.imgPreview
  })
  .select()
  if(error) alert(error.message)
  else alert('success')
}


const openModal = (e) => {
e.preventDefault()
setModal(!modal)
}

const selectImage = (e) => {
e.preventDefault()
console.log(e.target.src);
   if(e.target.classList.contains('remove')){
    setValues({...values ,
      imgPreview:''
       })
       setIsSave(false)
   }else{
    setValues({...values ,
      imgPreview:e.target.src
       })
   }
}

const saveImage = (e) => {
e.preventDefault()
setIsSave(true)
setModal(!modal)
}

const data = {
openModal,
selectImage,
imgPreview:values.imgPreview,
isSave
}
    return(
<>
<div className='px-5 text-white bg-dark py-2'>

<form className='is-flex is-flex-direction-column is-flex-gap-lg ' onSubmit={insertSiteInfo}>

<div class="field">
<label class="label text-white">Site Title</label>
<div class="control">
<input class="input  is-link" type="text" name='blog_name' defaultValue={siteInfo.blog_name} onChange={handlerChange}/>
</div>
</div>

<EditSiteLogo data={data} siteInfo={siteInfo}/>

<ErrorMessage pesan={message.pesan} isError={message.error} sukses={message.sukses}/>

<div class="field">
{message.isSubmit ? <button class="button is-info" type='submit' title="Disabled button" >Submit</button> :
<button class="button is-info" title="Disabled button" disabled>Submit</button>}
</div>

 </form>
   </div>
  //  MODAL
  <div class={modal ? "modal is-active" : "modal"}>
<div class="modal-background"></div>
<UploadMedia saveImage ={saveImage}  openModal={openModal} selectImage={selectImage}/>
<button class="modal-close is-large" aria-label="close" onClick={openModal}></button>
</div>
</>
    )
}

export default EditSiteForm;
