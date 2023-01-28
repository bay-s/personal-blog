import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import supabase from '../supabase-config';
import UploadAvatar from './edit-avatar.js';
import ErrorMessage from './error-message';
import { isValidUrl } from './get-data';
import { updateProfile } from './insert-data';

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
  
  
const [selectedOption, setSelectedOption] = useState('');

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
  title:'',
  background:''
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
    setSelectedOption(value.data.background);
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

  if(!datas.instagram && !datas.linkedin && !datas.github && !datas.facebook) {
    console.log("its okay")
  } else if(!isValidUrl(datas.instagram) || !isValidUrl(datas.facebook) || !isValidUrl(datas.github) || !isValidUrl(datas.linkedin) ){
    const pesan = `URL ARE NOT VALID URL `
    errorMsg(pesan)
    return
  }
  const update = await updateProfile(datas,value.data.uid,selectedOption)
  if(update.status) successMsg(update.pesan)
  else errorMsg(update.pesan)
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
    pesan:`Something wrong ${error}`,
    error:true,
    sukses:false,
    isSubmit:false
  })
}

const handleChange = (event) => {
  setSelectedOption(event.target.value);
}

// CHECK URL 

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
  <textarea class="textarea text-white bg-transparent is-primary" defaultValue={value.data.banner_description} name='description' onChange={ handlerChange}>

  </textarea>
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
