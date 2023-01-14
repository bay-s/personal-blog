import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../App';
import supabase from '../supabase-config';
import ErrorMessage from './error-message';
import UploadThumbnail from "./upload-thumbnail";
import getPublicUrl from "./upload-url";
import removeImages from "./remove-image";
import Skill_List from './skill-list';


const Skills = () => {

    const {value} = useContext(AppContext)
    const [values, setValues] = useState({
        imgUrl:"",
        skills:''
      });

    const [message, setMessage] = useState({
        pesan: "",
        isError: false,
        sukses: false,
        isUpload: false,
      });
  

       const handlerChanges = (e) => {
        const {name,value} = e.target
        setValues({
            ...values,
           skills:value
          });
        if(value.length < 1){
            setMessage({
                ...message,
                isUpload:false
              });
        }else{
            setMessage({
                ...message,
                isUpload:true
              });
        }
        console.log(values.skills);
       }
     
// FUNCTION UPLOAD IMAGE

const [images,setImages] = useState({
  imgName:'',
  url:'',
  imgUpload:'',
  isUpload:false,
  hide:false,
  media:[],
  media_url:[]
})

const  ImageChange = event => {
  console.log(event.target.files);
  if (event.target.files && event.target.files[0]) {
    let img = event.target.files[0];
    const randName =  (Math.random() + 1).toString(36).substring(3);
    const imgStr = img.name.split(".")
    const names = `${randName}.${imgStr[1]}`
    uploadImage(img,names)
    setImages({...images ,
      imgUpload: URL.createObjectURL(img),
      url:img,
      hide:true,
      isUpload:true,
      imgName:`${randName}.${imgStr[1]}`
       }) 
    }
};

const uploadImage = async (images,names) => {
  // e.preventDefault()
  setImages({...images ,
      isUpload:false
       })
  const data = await  UploadThumbnail(images,names)    
  console.log(data.path);
  getPublicUrls(data.path)
}

const getPublicUrls = async (url) => {

  const data = await getPublicUrl(url);
  if(data){

   console.log(data);
    setValues({
      ...values,
      imgUrl:data
    });
  }

 }

 const removeImage = async (e) => {
  e.preventDefault()
  setImages({...images ,
    imgUpload:'',
    hide:false,
     })

   const data = removeImages(images)
 }

 const successMsg = (pesan) => {
  setMessage({
    pesan:pesan,
    isError:false,
    sukses:true,
    isSubmit:false
  })
  setValues({
    ...values,
   skills:''
  });
  setImages({...images,
    hide:false
    }) 
}

const errorMsg = (error) => {
  setMessage({
    pesan:`Something wrong ${error}`,
    isError:true,
    sukses:false,
    isSubmit:false
  })
  setValues({
    ...values,
    skills:''
  });
}

      //  ADD SKILLS
      const addSkills = async (e) => {
        e.preventDefault()
        if (values.imgUrl === '' || values.skills === '') {
          const pesan = 'Input and thumbnails must include !'
          alert("TEST")
          errorMsg(pesan)
          return;
        }
        const { data, error } = await supabase
        .from("skills")
        .insert({
          skill:values.skills,
          thumbnail:values.imgUrl,
          user_id:value.data.uid
        })
        .select();
        
      if (error) console.log(error.message)
      if (data) {
        const pesan = 'Add skill success !'
        console.log(data)
        successMsg(pesan)
      }

      };

    return(
<>
<div className='box shadow bg-dark'>
<h3 className='is-bold is-title is-size-4 text-title'>Skill</h3>
</div>
{/* END HEADER COLUMN */}
<div className='is-flex is-flex-gap-md px-2 sidebar-container'>
<form className='column is-4 box' onSubmit={addSkills}>

<h3 className='is-title is-bold mb-3'>
Add New Skills
</h3>


<div className="is-flex-column is-flex-gap-sm mb-3">

<div className={images.hide ? '' : 'hide'} >
<figure className="image is-2by1">
<img src={images.imgUpload} className='w-100 fit' />
</figure>
</div>

<div className="file is-info has-name mb-2">
  <label className="file-label">
    <input className="file-input" type="file" name="resume" onChange={ImageChange}/>
    <span className="file-cta">
      <span className="file-icon">
        <i className="fa fa-upload"></i>
      </span>
      <span class="file-label">
        Add thumbnail
      </span>
    </span>
  </label>
</div>

<button className={images.hide ? "button  is-danger is-small" : 'hide'} onClick={removeImage}>Remove</button>
</div>

<div class="field">
    <input class="input is-info" type="text" name='skills' onChange={handlerChanges }/>
</div>

<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>

<div class="field">
{message.isUpload ? <button class="button is-primary" type='submit' title="Disabled button" >Submit</button> :
<button class="button is-primary" title="Disabled button" disabled>Submit</button>}
</div>

 </form>
 {/* CATEGORY TABLE */}
 <div className='w-100'>
<Skill_List  />
 </div>
 {/* END TABLE CATEGORY */}
</div>
{/* END MENUS CONTAINER */}
</>
    )
}

export default Skills;








