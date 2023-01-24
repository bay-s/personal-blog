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


export async function setPostPage(name,id){
const { data, error } = await supabase.from('blog-info')
 .update({ post_page:name})
 .select()
 .eq('user_id', id)
 console.log(data)
 if(error) return {status:false, message:`Something wrong ${error.message}`}
 else return {status:true,message:'Set postpages success'}
}

// UPDATE PROFILE

export async function updateProfile(datas,id,option){
  const { data, error } = await supabase
  .from('users')
  .update({
     username:datas.username,
     fullname:datas.fullname,
     instagram_link:datas.instagram,
     facebook_link:datas.facebook,
     github_link:datas.github,
     linkedin_link:datas.linkedin,
     background:option,
     banner_description:datas.description,
     banner_title:datas.title
    })
  .eq('uid',id)
  .select()
  if(data){
   return {status:true,pesan:'Update profile success'}
  }else return {status:false,pesan:error.message}

}