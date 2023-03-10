import supabase from "../supabase-config";


export  async function getContact(id){

  const { data, error } = await supabase
  .from('contact_info')
  .select()
  // .eq('user_id',id)
  if(error) console.log(error.message)
  else {
    // console.log(data)
    return data
  }
}

export  async function  getSkills(id){

  const { data, error } = await supabase
  .from('skills')
  .select()
  // .eq('user_id',id)
  if(error) console.log(error.message)
  else {
    // console.log(data)
    return data
  }
}


export  async function getAbout(id){

  const { data, error } = await supabase
  .from('about')
  .select()
  // .eq('user_id',id)
  if(error) console.log(error.message)
  else {
    // console.log(data)
    return data
  }
}


// get data project

export  async function getProject(id){

  const { data, error } = await supabase
  .from('works')
  .select()
  // .eq('user_id',id)
  if(error) console.log(error.message)
  else {
    // console.log(data)
    return data
  }
}


// CHECK URL 
export function isValidUrl(urlString){
	const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
}


// GET PAGE
export  async function getDataPage(){
  const { data, error } = await supabase
  .from('pages')
  .select()
  if(data){
    console.log(data);
    return data
  }if(error) console.log(error.message);
}


// GET MENU

export async function getMenus(){
  const { data, error } = await supabase
  .from('menu')
  .select()
  if(data){
    console.log(data);
    return data
  }if(error) console.log(error);
}

// GET POST PAGE
export  async function getPostPage(id){
  const { data, error } = await supabase
  .from('blog-info')
  .select()
  .eq('user_id',id)
  if(data){
    console.log(data);
    return data
  }if(error) console.log(error.message);
}

export async function getUserPosts(id){
  const { data, error } = await supabase
  .from('posts')
  .select()
  .eq('author_id',id)
  if(data){
    console.log(data);
    return data
  }if(error) console.log(error.message);
}