const createDays = (startDate) => {
    let days = [];
    for(let i=0; i<14; i++){
        //create date
        let newDate = new Date(startDate);
        let dayInc = newDate.getDate() + i;
        newDate.setDate(dayInc);
        const dayToAdd = newDate.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
        
        let day = {
            date: dayToAdd,
            startTime: 700,
            endTime: 1700,
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

