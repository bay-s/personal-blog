import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import supabase from '../supabase-config';
import UploadAvatar from './edit-avatar.js';
import ErrorMessage from './error-message';

const EditProfileForm = (props) => {

const {value} = useContext(AppContext)

const options = [
  "color",
  "ball",
  "lines",
  "thick",
  "circle",
  "cobweb",
  "polygon",
  "square",
  "tadpole",
  "fountain",
  "random",
  "custom",
  ]
  
  
const [selectedOption, setSelectedOption] = useState(options[0]);
const [message,setMessage] = useState({
  pesan:'',
  error:'',
  sukses:'',
  isSubmit:false
})
const [datas,setDatas] = useState({
  username:'',
  fullname:'',
  instagram:'',
  facebook:'',
  github:'',
  linkedin:'',
  description:'',
  title:''
})


useEffect(() => {
  setDatas({...datas,
     username:value.data.username,
     fullname:value.data.fullname,
     instagram:value.data.instagram_link,
     facebook:value.data.facebook_link,
     github:value.data.github_link,
     linkedin:value.data.linkedin_link,
     background:value.data.background,
     description:value.data.banner_description,
     title:value.data.banner_title
    })
},[])

const handlerChange = (e) => {
  const {name,value} = e.target
if(datas.username.length < 1){
  setMessage({
    isSubmit:false
  })
}else{
  setMessage({
    isSubmit:true
  })
}

  setDatas({...datas,
      [name]:value
      })
}

const updateProfiles = async (e) => {
  e.preventDefault()
  setMessage({
    isSubmit:true
  })

  if(datas.datas.instagram === '' || datas.datas.facebook || datas.datas.github || datas.datas.linkedin){}
  else if(!isValidUrl(datas.datas.instagram) || !isValidUrl(datas.datas.facebook) || !isValidUrl(datas.datas.github) || !isValidUrl(datas.datas.linkedin) ){
   const pesan = `URL ARE NOT VALID URL `
   successMsg(pesan)
    return
  }

  const { data, error } = await supabase
  .from('users')
  .update({
     username:datas.username,
     fullname:datas.fullname,
     instagram_link:datas.instagram,
     facebook_link:datas.facebook,
     github_link:datas.github,
     linkedin_link:datas.linkedin,
     background:selectedOption,
     banner_description:datas.description,
     banner_title:datas.title
    })
  .eq('id',value.data.id)
  .select()
  if(data){
    const pesan = `Update Profile succes`
    successMsg(pesan)
  }if(error){
    errorMsg(error)
  }
}

const successMsg = (pesan) => {
  setMessage({
    pesan:pesan,
    error:false,
    sukses:true,
    isSubmit:false
  })
}

const errorMsg = (error) => {
  setMessage({
    pesan:`Something wrong ${error.message}`,
    error:true,
    sukses:false,
    isSubmit:false
  })
}

const handleChange = (event) => {
  setSelectedOption(event.target.value);
}

// CHECK URL 
const isValidUrl = urlString => {
	const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
}

    return(
 <div className='px-5 text-white bg-dark py-2'>
<UploadAvatar id={value.data.uid} data={value.data}/>
{/* END UPLOAD INPUT */}
<form className='is-flex is-flex-direction-column is-flex-gap-lg ' onSubmit={updateProfiles}>
<div class="field">
<label class="label text-white">Fullname</label>
<div class="control">
<input class="input text-white bg-transparent is-primary" type="text" name='fullname' defaultValue={value.data.fullname} onChange={ handlerChange }/>
</div>
</div>

<div class="field">
<label class="label text-white">Username</label>
<div class="control">
<input class="input text-white bg-transparent is-primary" type="text" name='username' defaultValue={value.data.username} onChange={ handlerChange }/>
</div>
</div>

<div class="field">
<label class="label text-white">Instagram URL</label>
<div class="control">
<input class="input text-white bg-transparent is-primary" type="text" name='instagram' defaultValue={value.data.instagram_link} onChange={ handlerChange }/>
</div>
</div>

<div class="field">
<label class="label text-white">Facebook URL</label>
<div class="control">
<input class="input text-white bg-transparent is-primary" type="text" name='facebook' defaultValue={value.data.facebook_link} onChange={ handlerChange }/>
</div>
</div>

<div class="field">
<label class="label text-white">Github URL</label>
<div class="control">
<input class="input text-white bg-transparent is-primary" type="text" name='github' defaultValue={value.data.github_link} onChange={ handlerChange }/>
</div>
</div>

<div class="field">
<label class="label text-white">LinkedIn URL</label>
<div class="control">
<input class="input  text-white bg-transparent is-primary" type="text" name='linkedin' defaultValue={value.data.linkedin_link} onChange={ handlerChange }/>
</div>
</div>

<div class="field">
  <label class="label text-white">Banner Title</label>
  <div class="control">
    <input class="input bg-transparent is-primary text-white" name='title' type="text"  defaultValue={value.data.banner_title}  onChange={ handlerChange}/>
  </div>
</div>

<div class="field">
  <label class="label text-white">Banner Description</label>
  <div class="control">
  <textarea class="textarea text-white bg-transparent is-primary" defaultValue={value.data.banner_description}  name='description' onChange={ handlerChange}></textarea>
  </div>
</div>

<div class="field">
<label class="label text-white">Change Banner Background </label>

<div class="select is-success w-100">
<select className='w-100 text-white bg-transparent ' value={selectedOption} onChange={handleChange}>
  {options.map(option => (
        <option className='has-text-dark' key={option} value={option}>
          {option}
        </option>
  ))}
  </select>
</div>

</div>


<ErrorMessage pesan={message.pesan} isError={message.error} sukses={message.sukses}/>

<div class="field">
{message.isSubmit ? <button class="button is-primary" type='submit' title="Disabled button" >Submit</button> :
<button class="button is-primary" title="Disabled button" disabled>Submit</button>}
</div>
 </form>
   </div>
    )
}

export default EditProfileForm;
