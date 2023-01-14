import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { AppContext } from '../App';
import supabase from '../supabase-config';
import ErrorMessage from './error-message';
import { getContact } from './get-data';



const Contact = () => {
    const {value} = useContext(AppContext)
    const [contact,setContact] = useState({
     email:'',
     adress:'',
     city:'',
     phone:''
    })
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
         getContacts()
    
      },[])     

 const handlerChange = (e) => {
    
    const {name,value} = e.target
    setContact({...contact,
        [name]:value
        })
      if(value.length < 1){
        setMessage({
          isSubmit:false
        })
      }else{
        setMessage({
          isSubmit:true
        })
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
  
const getContacts = async () => {

  const data= await getContact(value.data.uid)
  if(data){
    const contacts = data.map(item => {
      return setContact({...contact,
          email:item.email,
          adress:item.adress,
          phone:item.phone,
          city:item.city
         })
  })
  }
}

const updateProfiles = async (e) => {
    e.preventDefault()
    setMessage({
      isSubmit:true
    })

const { data, error } = await supabase
    .from('contact_info')
    .update({
      email:contact.email,
      city:contact.city,
      adress:contact.adress,
      phone:contact.phone
      })
    .eq('user_id',value.data.uid)
    .select()
    if(data){
      const pesan = `Update Profile succes`
      successMsg(pesan)
    }if(error){
      errorMsg(error)
    }
  }
    return(
<>
<div className='box shadow bg-dark is-flex justify-between align-center'>
<h3 className='is-bold is-title is-size-4 text-title'>
   Edit Contact
</h3>
</div>
{/* END TABS PANEL */}
<div className='px-5 text-white bg-dark py-2'>

     {/* FORM */}
<form className='is-flex is-flex-direction-column is-flex-gap-sm' onSubmit={updateProfiles} >

<div class="field">
<label class="label text-white">City</label>
<div class="control">
<input class="input text-white bg-transparent is-primary" type="text" name='city' defaultValue={contact.city} onChange={handlerChange}/>
</div>
</div>

<div class="field">
<label class="label text-white">Email</label>
<div class="control">
<input class="input text-white bg-transparent is-primary" defaultValue={contact.email} type="email" name='email' onChange={handlerChange}/>
</div>
</div>


<div class="field">
<label class="label text-white">Phone</label>
<div class="field has-addons">
        <p class="control">
          <a class="button is-static bg-transparent borders text-white">
            +62
          </a>
        </p>
        <p class="control is-expanded">
          <input class="input is-primary bg-transparent text-white" type="tel" placeholder="Your phone number" name='phone' defaultValue={contact.phone} onChange={handlerChange}/>
        </p>
      </div>
<p class="help">Do not enter the first zero</p>
</div>

<div class="field">
<label class="label text-white">Adress</label>
<div class="control">
<textarea className='textarea bg-transparent is-primary text-white' name='adress' defaultValue={contact.adress}  onChange={handlerChange}></textarea>
</div>
</div>


<ErrorMessage pesan={message.pesan} isError={message.error} sukses={message.sukses}/>

<div class="field">
{message.isSubmit ? <button class="button is-primary" type='submit' title="Disabled button" >Submit</button> :
<button class="button is-primary" title="Disabled button" disabled>Submit</button>}
</div>

</form>
     {/* END FORM */}
</div>

</>
    )
}

export default Contact