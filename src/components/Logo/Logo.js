import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () =>{
  return(
    <div className ='ma4 mt0'>
      <Tilt className='Tilt br2 shadow-2' options= {{max:55}} style= {{height:150, width:150}} >
      <div className='innerTilt'>
        <h1 className= 'logoImg' pa3="true"><img  style= {{paddingTop:'7px'}} src={brain} alt="logoImg" /></h1>
      </div>
    </Tilt>  
    </div>
  );
}

export default Logo;