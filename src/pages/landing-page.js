import React from 'react'
import Banner from './banner';
import About from './about';
import Gallery from './gallery';
import Footer from './footer';
import Contact from './contact';
import Skills from './skill';


const LandingPage = () => {

    return(
<div className='landig-page' id='landing-wrapper'>
<Banner  />
<About />
<Skills />
<Gallery />
<Contact />
<Footer />
 </div>
    )
}

export default LandingPage;