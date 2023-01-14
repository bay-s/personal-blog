import supabase from "../supabase-config";

const getPublicUrl = (url) => {
    const { data } = supabase
    .storage.from('images')
    .getPublicUrl(url)
    if(data){
      const imgUrl = data.publicUrl;
      console.log(imgUrl);
      return imgUrl 
    }
  
   }

export default getPublicUrl;