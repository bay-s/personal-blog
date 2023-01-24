import ParticlesBg from 'particles-bg'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import supabase from '../supabase-config'


const Banner = () => {
    const {value} = useContext(AppContext)
    const [banner,setBanner] = useState([])

    useEffect(() => {

  const fetchData = async () => {
    const {data,error} = await supabase
    .from('users')
    .select()
    .single()
    if(error){
      console.log(error);
    }
    if(data){
    setBanner(data)
    }
  }
  fetchData()
    },[])


    return(
        <div className='banner '>
            <ParticlesBg type={value.data.background === '' ? "circle" : value.data.background} bg={true} />
            <section className='is-flex-column is-flex-gap-md align-center mx-auto text-center banner-text w-50'>
                <h1 className='text-white is-title is-bold'>
                {
                    banner.banner_title ===  null || "" ? 'Your Page title here edit via dashboard' 
                    :  banner.banner_title
                }
                </h1>
                <p className='has-text-white-ter lh-lg'>
              {
                banner.banner_description ===  null || "" ? 'Your Page description here edit via dashboard' 
                :  banner.banner_description
              }
                </p>
                <div className='is-flex is-flex-gap-lg'>
                    <button className='button is-primary is-medium'>
                        Project
                    </button>
                    <button className='button is-medium is-medium'>
                        Github
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Banner 

