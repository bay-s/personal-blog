import React, { useContext, useEffect, useRef, useState }  from "react";
import { Link } from 'react-router-dom';
import Header from '../pages/header';
import ReactQuill from 'react-quill';
import PostSidebar from './create-post-sidebar';
import supabase from '../supabase-config';
import ErrorMessage from './error-message';
import { AppContext } from '../App';
import module from './quill-modules';
import UploadThumbnail from "./upload-thumbnail";
import getPublicUrl from "./upload-url";
import removeImages from "./remove-image";
import { getAbout } from "./get-data";



const About = (props) => {
  const { value } = useContext(AppContext);
  const [about,setAbout] = useState([])

  useEffect(() => {
   const id = value.data.uid
   getDataAbout(id)
  },[])
a

  const [message, setMessage] = useState({
    pesan: "",
    isError: false,
    sukses: false,
    isUpload: false,
  });
  
 const [ submit,setSubmit] = useState(false)
  const [values, setValues] = useState({
    imgUrl: "",
    quill: "",
  });

  const ref = useRef(null);

  const handlerChange = (e) => {
    const texts = ref.current
    const strlen = texts.getEditor().getText().length
    setValues({
      ...values,
      quill: ref.current?.value
    });

    if (strlen < 2) {
      setSubmit(false)
    } else {
      setSubmit(true)
    }
  };

  const updateBiodata = async (e) => {
    e.preventDefault()
console.log( value.data.uid)
    if (values.imgUrl === '' || values.quill === '') {
      const pesan = 'Input and thumbnails must include !'
      errorMsg(pesan)
      return;
    }

    const { data,error } = await supabase
    .from('about')
    .update({ 
      about_content:values.quill,
      thumbnail:values.imgUrl,
    })
    .select()
    .eq('user_id', value.data.uid)
    if(error) {
      console.log(error);
      errorMsg(error)
    }
    else{
      const pesan = 'Update data sukses'
      console.log(data);
      successMsg(pesan)
    }
  };


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
  // setValues({
  //   ...values,
  //   quill:''
  // });
}

const errorMsg = (error) => {
  setMessage({
    pesan:`Something wrong ${error}`,
    isError:true,
    sukses:false,
    isSubmit:false
  })
  // setValues({
  //   ...values,
  //   quill:''
  // });
}

const getDataAbout = async (id) => {
  const data = await getAbout(id)
  if(data){
    setAbout(data[0])
    setValues({...values ,
      quill:data[0].about_content,
      imgUrl:data[0].thumbnail
    })
    setImages({...images ,
      imgUpload:data[0].thumbnail,
      hide:true
       }) 
  }
}
    return(

<div className='px-5 text-white bg-dark py-2 p-4'>

<form  onSubmit={`addCategory`} className='px-3'>

<div className="is-flex-column is-flex-gap-sm mb-3">

<div className={images.hide ? '' : 'hide'} >
<figure className="image is-2by1 ">
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

 </form>
{/* START EDITOR*/}
<section class="section is-main-section ">
  <form className='is-flex is-flex-column is-flex-gap-md' onSubmit={updateBiodata}>

<h3 className="is-title text-title is-bold is-size-4 mb-2">Write something about yourself</h3>

<ReactQuill ref={ref} theme="snow" value={values.quill} onChange={handlerChange} name='quill'  modules={module.toolbars} formats={module.formats} />
<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>

<div class="field">
{submit ? <button class="button is-primary" type='submit' >Submit</button> :
<button class="button is-primary" title="Disabled button" disabled>Submit</button>}
</div>

</form>
</section>
{/* END EDITOR */}
</div>
    )
}

export default About;
