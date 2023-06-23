import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
  return(
    <div>
      <div>
        <p className='f3'>
          {'This Magic Brain will detect faces in your pictures. Give it a try'}
        </p> 
      </div>
      <div className='center'>
        <div className='form center pa3="true" br3 shadow-5'>  
          <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
          <button 
          className='w-30 grow f4 link ph3 pv2 dib bg-light-purple'
          onClick = {onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;