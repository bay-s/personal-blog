import React from 'react'

const Footer = () => {

    const date = new Date()
    return(
        <footer className='footer has-background-dark p-6'>
          <ul className='is-flex align-center justify-center is-flex-gap-xl'>
            <li>
                <a href='#'><i class="fa fa-instagram has-text-grey-light is-size-3" aria-hidden="true"></i></a>
            </li>
            <li>
                <a href='#'><i class="fa fa-facebook has-text-grey-light is-size-3" aria-hidden="true"></i></a>
            </li>
            <li>
                <a href='#'><i class="fa fa-github has-text-grey-light is-size-3" aria-hidden="true"></i></a>
            </li>
          </ul>
          <ul className='my-3 is-flex justify-center align-center is-flex-gap-xl'>
          <li>
                <a href='#' className='has-text-grey-light'>© Copyright {date.getFullYear()} Nordic Giant</a>
          </li>
          <li>
                <a href='#' className='has-text-grey-light'>Design by Styleshout</a>
          </li>
          </ul>
        </footer>
    )
}

export default Footer ;