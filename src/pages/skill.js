import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { getSkills } from '../dashboard/get-data'
import img1 from '../icon/bootstrap.svg'
import img2 from '../icon/css3.svg'
import img3 from '../icon/firebase.svg'
import img4 from '../icon/html.svg'
import img5 from '../icon/javascript.svg'
import img6 from '../icon/jquery.svg'
import img7 from '../icon/react.svg'
import img8 from '../icon/wordpress.svg'

const Skills = () => {
  const { value} = useContext(AppContext)
  const [skill,setSkill] = useState([])

  useEffect(() => {
    const getDataSkill = async () => {
      const dataProject = await getSkills(value.data.uid)
        setSkill(dataProject)
    }

    getDataSkill()
  },[skill])

    return(
        <div className='p-50 about' >
        <h3 className='text-center my-3 text-white is-title is-size-4 is-bold'>Skills</h3>
        <section className='columns is-multiline my-5'>
      {
        skill.length < 1 ? ""
        :
 skill.map((item,i)=> {
                return <div className='column is-3'>
  <div className='card p-3 is-flex align-center justify-center is-flex-gap-md bg-pink'>
  <figure class="image is-48x48" >
  <img src={item.thumbnail} className='w-100'/>
</figure>
<h4 className='is-title text-white'>{item.skill}</h4>
  </div>
</div>
            })
         }
        </section>
     </div>
    )
}

export default Skills;