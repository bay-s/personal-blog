import supabase from "../supabase-config";

  
const removeImages = async (images) => {

  const { data, error } = await supabase.storage.from('images')
    .remove([`public/${images.imgName}`])
    if(error) alert(error)
    else console.log(data);
   }

   export default removeImages