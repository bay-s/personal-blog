import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import supabase from '../supabase-config';
import { getSkills } from './get-data';


const Skill_List = (props) => {
  const { value} = useContext(AppContext)
    const [skills,setSkills] = useState([])

    useEffect(() => {
      getDataSkill()
    },[])

    const getDataSkill = async () => {
      const dataSkill = await getSkills(value.data.uid)
      if(dataSkill){
         setSkills(dataSkill)
      }
    }

  
    const deleteSkills = async (e) => {
   e.preventDefault()
   const id = parseFloat(e.target.dataset.id)
   console.log(id);
   if(window.confirm("Are you sure want to delet this ?")){
    const { data,error } = await supabase
    .from('skills')
    .delete()
    .eq('id',id)
     if(error) console.log(error)
     else {
      console.log(data);
      alert("Delete success")
      window.location.reload()
     }
   }
    }

const catList = skills.length < 1 ? "" : skills.map((skill,index) => {
        return  <tr>
        <td class="is-checkbox-cell">
  {index + 1}
        </td>
        <td class="is-image-cell">
          <div class="image">
        <img src={skill.thumbnail} class="is-rounded fit" />
         </div>
        </td>
        <td data-label="Name">
        <Link to={`/posts/category-name/${skill.skill}`}>{skill.skill}</Link>
        </td>
        <td class="is-actions-cell">
          <div class="buttons is-right">
          <i class="fa fa-trash has-text-danger is-size-5 is-clickable" data-id={skill.id} onClick={deleteSkills}></i>
          </div>
        </td>
        </tr>
    })
    return(
        <div class="table-wrapper has-mobile-cards">
        <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
          <thead>
          <tr>
            <th class="is-checkbox-cell">
      #
            </th>
            <th></th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
{/* POST LIST */}
{catList}
{/* END POST LIST */}
          </tbody>
        </table>
</div>
    )
}

export default Skill_List;