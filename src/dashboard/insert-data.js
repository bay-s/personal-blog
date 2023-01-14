import supabase from "../supabase-config";

export async function insertDataAbout(id){
    const {data,error} = await supabase 
    .from('about')
    .insert({
      user_id:id
    })
    .select()
    if(error){
      console.log(error);
    }
    if(data){
      console.log(data);
    }
  }


  
  export async function insertDataContact(id,email){
    const {data,error} = await supabase 
    .from('contact')
    .insert({
      email:email,
      user_id:id
    })
    .select()
    if(error){
      console.log(error);
    }
    if(data){
      console.log(data);
    }
  }
