import React, {useState, useEffect, useRef} from 'react'
import { Select, MenuItem, InputLabel, FormControl,makeStyles } from '@mui/material';
import '../App.css';

const Age = ({setSleepTimeInChild}) => {
    const ageGroupProvided = "of deep sleep is recommended based on the age group provided"
    const recommendations = [
        {
            age: 19,
            ageGroup:'19+',
            recommendation:"1.5 - 1.8 hours " + ageGroupProvided
        },
        {
            age: 13,
            ageGroup:'13-19',
            recommendation:"1.7 - 2 hours " + ageGroupProvided
        },
        {
            age: 6,
            ageGroup:'6-12',
            recommendation:"2 - 2.2 hours " + ageGroupProvided
        },
        {
            age: 4,
            ageGroup:'4-5',
            recommendation:"2.2 - 2.6 hours " + ageGroupProvided
        },
        {
            age: 2,
            ageGroup:'2-3',
            recommendation:"2.4 - 2.8 hours " + ageGroupProvided
        },
        {
            age: 1,
            ageGroup:'1 or less',
            recommendation:"2.4 - 3.6 hours " + ageGroupProvided
        }]
        

    const [userAgeYears, setUserAgeYears] = useState("")

    useEffect ( () => {
        if (userAgeYears != "") {
            setSleepTimeInChild(true, userAgeYears)
        }
    }, [userAgeYears])


    const handleAgeChange = (event) => {
        setUserAgeYears(event.target.value)
    }
    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel id="chooseAgeGroup">Choose an age group</InputLabel>
                <Select
                    id="select-age-group"
                    labelId='chooseAgeGroup'
                    label="Select Age group"
                    defaultValue=""
                    onChange={handleAgeChange}
                    className="ageGroup">
                {recommendations.map((recommendation) => {
                    return <MenuItem key={recommendation.age} value={recommendation.recommendation}>
                        {recommendation.ageGroup}
                    </MenuItem>
                })}
                </Select>
            </FormControl>
        </div>
    )
}

export default Age;
