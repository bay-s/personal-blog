
import React from 'react'
import supabase from '../supabase-config';


async function UploadThumbnail(images,names){
    const { data, error} = await supabase.storage
    .from('images')
    .upload(`public/${names}`, images,{
      cacheControl: '604800',
      upsert: false
    })
    if(error){
  console.log(error);
    }
    if(data){
     console.log(data);
     return data
    }
}

export default UploadThumbnail