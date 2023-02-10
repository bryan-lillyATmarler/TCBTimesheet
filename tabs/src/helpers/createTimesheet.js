import { isWeekend, twentyFourHourFormat } from "./getDates";

export const createDays = (startDate) => {
    let days = [];
    for(let i=0; i<14; i++){
        //create date
        let newDate = new Date(startDate);
        let dayInc = newDate.getDate() + i;
        newDate.setDate(dayInc);
        const dayToAdd = newDate.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

        let startTime = new Date(dayToAdd);
        let endTime = new Date(dayToAdd);

        if(!isWeekend(dayToAdd)){
            startTime.setHours(7);
            endTime.setHours(17);
        } else {
            startTime.setHours(0);
            endTime.setHours(0);
        }

        startTime = twentyFourHourFormat(startTime);
        endTime = twentyFourHourFormat(endTime);

        let day = {
            date: dayToAdd,
            startTime,
            endTime,
            sub: '',
            dailyNotes: ''
        }
        days.push(day);
    }

    return days;
}

export const createTimesheet = (cycleStart) => {
    let days = createDays(cycleStart);
    
    let timesheet = {
        cycleStart,
        extraNotes: '',
        days
    }

    return timesheet;
}

