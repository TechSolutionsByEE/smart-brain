import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) =>{
	
		if(isSignedIn){
			return(
				<nav style= {{display:'flex', justifyContent:'flex-end'}} >
		      <p onClick = {() => onRouteChange('signout')}  className= 'dib br3 f3 grow no-underline pv2 pa1 bg-white-70 dim fw6 mt4 mr2 pointer flex'>Sign Out</p>
		    </nav>
				);	
		} else{
			return(
				<nav style= {{display:'flex', justifyContent:'flex-end'}} >
			    <p onClick = {() => onRouteChange('signin')}  className= ' dib br3 f3 grow no-underline pv2 pa1 bg-white-70 dim fw6 mt4 mr2 pointer flex'>Sign in</p>
			    <p onClick = {() => onRouteChange('register')}  className= ' dib br3 f3 grow no-underline pv2 pa1 bg-white-70 dim fw6  mt4 mr2 pointer pr1 flex'>Register</p>
			  </nav>
				);
		}	
}

export default Navigation;