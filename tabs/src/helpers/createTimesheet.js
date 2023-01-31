export const createDays = (startDate) => {
    // console.log(startDate)
    let days = [];
    for(let i=0; i<14; i++){
        //create date
        let newDate = new Date(startDate);
        let dayInc = newDate.getDate() + i;
        newDate.setDate(dayInc);
        const dayToAdd = newDate.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

        const startTime = new Date(dayToAdd);
        startTime.setHours(7);

        const endTime = new Date(dayToAdd);
        endTime.setHours(17);

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

