import React, {useState, useEffect, useRef} from 'react'
import FadeIn from 'react-fade-in';

const Sleeptime = ({visible, deepSleepRecommendation}) => {
    const [sleepTime, setSleepTime] = useState(0)
    const [deepSleepTime, setDeepSleepTime] = useState(null)
    const [deepSleepTimeVisibility, setDeepSleepTimeVisibility] = useState(false)
    const [recommendation, setRecommendation] = useState(false)


    const calculateDeepSleep = (sleepTime) => {
        const minutesOfSleep = sleepTime * 60
        const minutesOfDeepSleepMinimum = minutesOfSleep*.13
        const minutesOfDeepSleepMaximum = minutesOfSleep*.23
        const hoursOfDeepSleepMinimum = minutesOfDeepSleepMinimum/60
        const hoursOfDeepSleepMaximum = minutesOfDeepSleepMaximum/60
        return {
            minutesOfDeepSleepMinimum,
            minutesOfDeepSleepMaximum,
            hoursOfDeepSleepMinimum,
            hoursOfDeepSleepMaximum
        }
    }

    useEffect( () => {
        if (sleepTime > 0) {
            setDeepSleepTime(calculateDeepSleep(sleepTime))
            return
        }
        else {
            setDeepSleepTimeVisibility(false)
        }
    },[sleepTime])

    useEffect( () => {
        if (deepSleepTime) {
            setDeepSleepTimeVisibility(true)
        }
    },[deepSleepTime])

    useEffect( () => {
        console.log("ATTEMPTING to set recommendation... deepSleepTimeVisibility is:", deepSleepTimeVisibility);
        if (deepSleepTimeVisibility) {
            setRecommendation(compareAndRecommend(deepSleepRecommendation,deepSleepTime))
        }
    })


    const compareAndRecommend = (recommendation,deepSleepTime) => {
        const regex = /[+-]?\d+(\.\d+)?/g;
        if (recommendation && deepSleepTime) {
            const recommendationFloats = recommendation.match(regex).map( (v) => { return parseFloat(v); });
            const recommendationMin = recommendationFloats[0]
            const recommendationMax = recommendationFloats[1]

            const notEnoughSleep = (Math.round(recommendationMin*100) > Math.round(deepSleepTime.hoursOfDeepSleepMaximum*100))
            const tooMuchSleep = (Math.round(recommendationMax*100) < Math.round(deepSleepTime.hoursOfDeepSleepMinimum*100))

            if (notEnoughSleep) {
                return 'You are not getting enough deep sleep! This could be due to lack of sleep in general, or because of too many interruptions in your sleep.'
            }
            else if (tooMuchSleep) {
                return 'You are getting more than the recommended amount of deep sleep. I guess they do say follow your dreams :^)'
            }
            else {
                return 'You are getting the recommended amount of deep sleep, wonderful!'
            }
        }
    }




    return (
        <div>
            <FadeIn visible={visible}delay={300} transitionDuration={500}>
                <h2> <u>{deepSleepRecommendation}</u></h2>
                <h3>Next we will calculate how much deep sleep you've been getting</h3>
                <label htmlFor="sleepTime"> <h3>Please input how many hours of uninterrepted sleep you get per night on average </h3></label>
                <br />
                <input type="number" id='sleepTime' onChange={(event) => {
                    setSleepTime(event.target.value)
                    }}/>
            </FadeIn>
            {deepSleepTime &&
            <FadeIn visible={deepSleepTimeVisibility && visible} delay={150}>
                <div>
                    <h3> <u>
                        About 13% ~ 23% of your sleep is spent in deep sleep. So roughly {deepSleepTime.minutesOfDeepSleepMinimum.toFixed(2)} - {deepSleepTime.minutesOfDeepSleepMaximum.toFixed(2)} minutes of your sleep is spent in deep sleep assuming you are a healthy adult 
                        </u>
                    </h3>
                </div> 
                <div>
                    <h3>
                        <u>
                        This translates to {deepSleepTime.hoursOfDeepSleepMinimum.toFixed(2)} - {deepSleepTime.hoursOfDeepSleepMaximum.toFixed(2)} hours of deep sleep per night
                        </u>
                    </h3>
                </div>
                <div>
                    {recommendation && <h2>{recommendation}</h2>}
                </div>
                <div>
                    <h3>*Please note: this is <u>NOT</u> official medical advice, but is instead based on internet data for recommended deep sleep per age group.</h3>
                </div>
                <div>
                    <button className='button' onClick={() => {window.location.reload(false)}}>
                        reset!
                    </button>
                </div>
            </FadeIn>
            }
        </div>
    )
}

export default Sleeptime;