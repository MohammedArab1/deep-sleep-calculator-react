import React, {useState} from 'react';
import './App.css';
import Age from './components/Age'
import FadeIn from 'react-fade-in'; //https://www.npmjs.com/package/react-fade-in
import Sleeptime from './components/Sleeptime';

function App() {

  document.body.classList.add('background')

  
  const [sleepTimeVisibility, setSleepTimeVisibility] = useState(false)
  const [deepSleepRecommendation, setDeepSleepRecommendation] = useState(false)

  const setSleepTimeInChild = (visibility,DSrecommendation = deepSleepRecommendation) => {
    setSleepTimeVisibility(visibility)
    setDeepSleepRecommendation(DSrecommendation)
  }


  return (
    <div>
    <FadeIn transitionDuration={600} visible={true} delay={700}> 
      <div><h1>Welcome to my simple deep sleep project!</h1></div>
      <div><h2>This program calculates how much deep sleep you get per night and provides a recommendation accordingly</h2></div>
      <Age setSleepTimeInChild={setSleepTimeInChild}></Age>
      <Sleeptime visible={sleepTimeVisibility} deepSleepRecommendation={deepSleepRecommendation}></Sleeptime>
    </FadeIn>
    
    </div>
  );
}

export default App;
