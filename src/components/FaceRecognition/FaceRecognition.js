import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma img gfg-div facerecognition'>
      <div className='absolute mt2'>
        <img
          id='inputimage'
          src={imageUrl}
          alt=''
          width='516.5vw'
          height='auto'
        />
        {Array.isArray(box) && box.length > 0 ? (
          box.map((item) => (
            <div
              key={`${item.topRow}-${item.rightCol}-${item.bottomRow}-${item.leftCol}`}
              className="bounding_box"
              style={{
                top: item.topRow,
                right: item.rightCol,
                bottom: item.bottomRow,
                left: item.leftCol,
              }}
            ></div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;

