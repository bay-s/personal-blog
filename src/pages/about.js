import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { getAbout } from '../dashboard/get-data'
import img from '../img/banner.jpg'
import AboutText from './about-text'
import AboutThumbnail from './about-thumbnail'


const About = () => {
    const {value} = useContext(AppContext)
    const [about,setAbout] = useState([])
    const [values, setValues] = useState({
      imgUrl: "",
      quill: "",
    });
    

    
  useEffect(() => {
    const id = value.data.uid
    getDataAbout(id)
   },[about])

     const getDataAbout = async (id) => {
      const data = await getAbout(id)
      if(data){
        setAbout(data)
        // console.log(data);
      }
    }





    return(
      <div className='about p-50' id='about'>
        
         {
          about.length < 1 ? "" 
          : 
          about.map(item => {
            return  <section className='columns is-multiline'>
<AboutThumbnail img={item.thumbnail}  />
<AboutText text={item.about_content} />
            </section>
          })
         }

      </div>
    )
}

export default About