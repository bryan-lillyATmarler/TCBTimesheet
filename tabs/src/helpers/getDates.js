export const getDateFormat = (date) => {
    let newDate = new Date(date);
    newDate = newDate.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

    return newDate;
}

export const getTwoWeeks = (startDate) => {
    let newDate = new Date(startDate);
    let twoWeeks = newDate.getDate() + 13; // two weeks
    newDate.setDate(twoWeeks);
    const dateInTwoWeeks = newDate.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

    return dateInTwoWeeks;
}

export const isWeekend = (date) => {
    let submittedDate = new Date(date);
    if(submittedDate.getDay() === 6 || submittedDate.getDay() === 0){
        return true;
    }
    return false;
}

export const twentyFourHourFormat = (date) => {
    const time = new Intl.DateTimeFormat('default', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);

    return time;
}

export const calculateHours = (startTime, endTime) => {
    let startHour = startTime.getHours();
    let endHour = endTime.getHours();

    let totalHours = endHour - startHour;

    let regHours;
    let otHours;

    if(totalHours > 8){
        regHours = 8;
        otHours = totalHours - 8;
    } else {
        regHours = totalHours
        otHours = 0
    }

    return {
        regHours,
        otHours
    }
}

export const calculateSub = (sub) => {
    let subAmount;
    if(sub === 'Full Sub'){
        subAmount = 200;
    }
    else if(sub === 'Meal Sub'){
        subAmount = 67;
    } 
    else {
        subAmount = 0;
    }

    return subAmount;
}

export const calculateTotalHours = (days) => {
    let totalHours = {
        reg: 0,
        ot: 0
    }
    let totalRegHours;
    let totalOTHours;

    days.forEach((day) => {
        let dayHours = calculateHours(day.startTime, day.endTime);
        totalHours.reg += dayHours.regHours;
        totalHours.ot += dayHours.otHours;
    });

    return totalHours;
}

export const calculateTotalSub = (days) => {
    let totalSub = 0;

    days.forEach((day) => {
        totalSub += calculateSub(day.sub);
    });

    return totalSub;
}