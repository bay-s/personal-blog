import React, { useContext, useEffect, useState } from 'react'
import FsLightbox from "fslightbox-react";
import img1 from '../img/banner.jpg'
import img2 from '../img/no-image.png'
import img3 from '../img/test.png'
import img4 from '../img/banner2.jpg'
import { AppContext } from '../App';
import { getProject } from '../dashboard/get-data';


const Gallery = () => {
  const [toggler, setToggler] = useState(false);
  const { value} = useContext(AppContext)
  const  images = []
  const [project,setProject] = useState([])

  useEffect(() => {
    const getDataProject = async () => {
      const dataProject = await getProject(value.data.uid)
        setProject(dataProject)
    }
    getDataProject()
  },[project])

  for(let i = 0; i < project.length;i++){
    if (project[i].thumbnail !== undefined) {
      images.push(project[i].thumbnail)
      // console.log(images)
  }
  }
    return(
      <div className='p-50' id='gallery'>
         <h3 className='text-center my-3 is-title is-size-4 is-bold'>CHECK OUT SOME OF MY WORKS.</h3>
         <section className='columns is-multiline my-5'>
         {
       project.length < 1 ? ""
       : 
  project.map( item => {
     
  return <div className='column is-3'>
  <div className='card p-0'>
  <figure class="image is-16by9" onClick={() => setToggler(!toggler)}>
  <img src={item.thumbnail} />
</figure>
<a href={item.link} target="_blank">
<h4 className='text-center p-1'>{item.project_name}</h4>
</a>
  </div>
   </div>
            })
         }

 <FsLightbox
				toggler={toggler}
				sources={images}
			/>
         </section>
      </div>
    )
}

export default Gallery