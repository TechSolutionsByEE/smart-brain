import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  errorMessage: "",
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  };
  
  loadUser = (user) => {
    this.setState( {user: {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }})
  }

calculateFaceLocation = (data) => {
const image = document.getElementById("inputimage");  
const regions = data.outputs[0].data.regions; 
const boundingBoxes = [];
regions.forEach(region => {
  boundingBoxes.push(region.region_info.bounding_box);
});
let box = [];
const width = Number(image.width);
const height = Number(image.height);
boundingBoxes.forEach((item) => {
    box.push({
      leftCol: item.left_col * width,
      topRow: item.top_row * height,
      rightCol: width - item.right_col * width,
      bottomRow: height - item.bottom_row * height,
    });
  });
  return box;
};

displayFaceBox = (box) => {
  this.setState({ box: box });
}

onInputChange = (event) => {
  this.setState({ input: event.target.value });
}

onButtonSubmit = () => {
this.setState({ imageUrl: this.state.input });
fetch('https://smart-brain-api-wkdv.onrender.com/imageurl', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    imageUrl: this.state.input
  })
})
  .then((response) => response.json())
  .then((response) => {
    const imageUrl = this.state.input
    if (imageUrl && response) {
      console.log("response", response)
      fetch('https://smart-brain-api-wkdv.onrender.com/image', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))      
        })
    }
    this.displayFaceBox(this.calculateFaceLocation(response));
  })
  .catch( error => {
    console.log("error", error); //logs error to the console and sets errorMessage state
    this.setState({ errorMessage: 'Oops, Something went wrong!! Please try again.' });
  })
}

onRouteChange = (route) => {
  if(route === 'signout'){
    this.setState(initialState)
  } else if(route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}

 // Reset the error state and trigger a retry
// For better user experience as user do not have to log in all over.
retry = () => {
  this.setState({ errorMessage: null });
}

render() {
  //conditional rendering: displays error message to user and enable user
  //Return to where they left off without having to log in all over.
  if (this.state.errorMessage) {
    return (
      <div className="error-message">
        {this.state.errorMessage}
        <button onClick={this.retry} className="br3 grow bg-white-70 fw6">Retry</button>
      </div>
    );
  }
  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
      { this.state.route === 'home'
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition  box={this.state.box} imageUrl={this.state.imageUrl} />      
         </div>
        :(
          this.state.route === 'signin'
            ? <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
            : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
        )      
      }
      </div>
    );
  }
}

export default App;
