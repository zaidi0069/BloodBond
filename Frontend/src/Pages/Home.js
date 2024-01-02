import React from 'react'
import Navbar from '../Components/Navbar'
import './Home.css'
import { useTypewriter } from 'react-simple-typewriter'



const Home = () => {


  const [text] = useTypewriter({

    words: [' Welcome to Blood Bond, where every drop counts and every act of kindness makes a lifesaving impact! Our platform is a beacon of hope and compassion, uniting donors, recipients, and advocates in a shared mission to support and strengthen our communities through the gift of life. Discover the power you hold within you — become a hero, save lives, and join us in the noble journey of blood donation. Together, we can make a difference that truly matters.'
  
    ],
    // loop: {},
  
    typeSpeed: 10,
  
  
  
  });


  return (
    <>
      <Navbar />

      <div className='body'>
        <h1 className="animate__animated animate__bounceInDown">Welcome to Blood Bond</h1>
        <br></br>
        <h1>Donate Blood - Donate Life</h1>

        <p id='intro'>
          <br/>
          {text}
        </p>
      </div>
    </>
  )
}

export default Home
