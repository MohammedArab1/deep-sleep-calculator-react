import React, {useState, useEffect, useRef} from 'react'
import FadeIn from 'react-fade-in';
import Sleeptime from './Sleeptime';

const Age = ({setSleepTimeInChild}) => {
    const [DOBArray, setDOBArray] = useState([])
    const [userAge, setUserAge] = useState(null)
    const [recommendationVisibility, setRecommendationVisibility] = useState(false)
    const [recommendation, setRecommendation] = useState(null)

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()+1
    const currentDay = currentDate.getDate()



    useEffect(()=>{
        setUserAge(findAge(DOBArray))
    },[DOBArray])

    useEffect( () => {
        if (userAge) {
            setRecommendation(findRecommendation(parseInt(DOBArray[1]),userAge,currentMonth))
        }
        else {
            setRecommendation(false)
        }  
    },[userAge])

    useEffect( () => {
        if (recommendation) {
            setRecommendationVisibility(true)
            setSleepTimeInChild(true, recommendation)
        }
        else {
            setRecommendationVisibility(false)
            setSleepTimeInChild(false)
        }
    },[recommendation])

    const findAge = (DOBArray) => {
        if (DOBArray.length < 3) {
            return false
        }
        const userYear = parseInt(DOBArray[0])
        const userMonth = parseInt(DOBArray[1])
        const userDay = parseInt(DOBArray[2])
        
        var extra = 0

        if (currentMonth < userMonth  || (userMonth === currentMonth && userDay > currentDay)) {
            extra += -1
        }
        const age = (currentYear - userYear) + extra
        console.log('in findAge... age:',age);
        return age
    }

    const findRecommendation = (userMonth, userAge, currentMonth) => {
        var monthDifference = 0
        if ( (currentMonth - userMonth) > 0) {
            monthDifference = currentMonth - userMonth
        }
        const recommendations = [
            {
                age: 19,
                month:0,
                recommendation:"1.5 - 1.8 hours of deep sleep is recommended based on your age"
            },
            {
                age: 13,
                month:0,
                recommendation:"1.7 - 2 hours of deep sleep is recommended based on the date of birth provided"
            },
            {
                age: 6,
                month:0,
                recommendation:"2 - 2.2 hours of deep sleep is recommended based on the date of birth provided"
            },
            {
                age: 4,
                month:0,
                recommendation:"2.2 - 2.6 hours of deep sleep is recommended based on the date of birth provided"
            },
            {
                age: 2,
                month:0,
                recommendation:"2.4 - 2.8 hours of deep sleep is recommended based on the date of birth provided"
            },
            {
                age: 0,
                month:4,
                recommendation:"2.8 - 3.0 hours of deep sleep is recommended based on the date of birth provided"
            },
            {
                age: 0,
                month:1,
                recommendation:"2.4 - 3.6 hours of deep sleep is recommended based on the date of birth provided"
            },
        ]
        const recommendationGroup = recommendations.find( (ageGroup) => {
            if (userAge > 0 && userAge < 150) {
                return userAge >= ageGroup.age
            }
            else {
                return (userAge == ageGroup.age && monthDifference >= ageGroup.month)
            }
        })
        if (recommendationGroup) {
            return recommendationGroup.recommendation
        }
        
    }


    return (
        <div>
            <label htmlFor="age"><h3>Please input your Date of Birth (for age group calculation): </h3></label>
            <input type="date" id='age' onChange={(event) => {
                setDOBArray(event.target.value.split('-'))
            }}/>
            {userAge > 150 && <h3>I highly doubt you are over 150 years of age!</h3>}
            {userAge < 0 && <h3>I don't think your birthday can be in the future :^)</h3>}
        </div>
    )
}

export default Age;
