export const fullSubAmount = () => {
    //set sull sub amount here
    return 200;
}

export const mealSubAmount = () => {
    return 67;
}

export const campBonusAmount = () => {
    return 25
}

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

export const isHoliday = (date) => {
    let holidays = getHolidays(); 

    let value = false;

    holidays.map((holiday) => {
        if(new Date(holiday).toDateString() === new Date(date).toDateString()){
            value = true;
        }
    });

    return value;
}

export const twentyFourHourFormat = (date) => {
    const time = new Intl.DateTimeFormat('default', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);

    return time;
}

export const calculateHours = (startTime, endTime, date) => {
    let startDate = new Date(date);
    startDate.setHours(startTime.split(':')[0], startTime.split(':')[1]);

    let endDate = new Date(date);
    endDate.setHours(endTime.split(':')[0], endTime.split(':')[1]);

    //get hours in milliseconds
    let totalHours = new Date(endDate.getTime() - startDate.getTime());
    //get hours in actual hours 
    totalHours = totalHours / 1000 / 60 / 60;

    let regHours;
    let otHours;

    if(isWeekend(date)){
        regHours = 0;
        otHours = totalHours;
    }else if(isHoliday(date)){
        regHours = 0;
        otHours = totalHours;
    }else if(totalHours > 8){
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
        subAmount = fullSubAmount();
    }
    else if(sub === 'Meal Sub'){
        subAmount = mealSubAmount();
    } 
    else if(sub === 'Camp Bonus') {
        subAmount = campBonusAmount();
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

    days.forEach((day) => {
        let dayHours = calculateHours(day.startTime, day.endTime, day.date);
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

export const calculateMealFullTotalSub = (days) => {
    let subs = {
        full: 0,
        meal: 0,
        camp: 0,
        total: calculateTotalSub(days)
    }

    days.forEach((day) => {
        if(day.sub === 'Full Sub'){
            subs.full += fullSubAmount();
        }
        if(day.sub === 'Meal Sub'){
            subs.meal += mealSubAmount();
        }
        if(day.sub === 'Camp Bonus'){
            subs.camp += campBonusAmount();
        }
    });

    return subs;
}

export const dropdownSubTypes = () => {
    return [
        {key: 'Full Sub', text: 'Full Sub'},
        {key: 'Meal Sub', text: 'Meal Sub'},
        {key: 'Camp Bonus', text: 'Camp Bonus'}
    ]
}

export const dropdownTimes = () => {
    return [
        {key: '00:00', text: '00:00'},
        {key: '00:30', text: '00:30'},
        {key: '01:00', text: '01:00'},
        {key: '01:30', text: '01:30'},
        {key: '02:00', text: '02:00'},
        {key: '02:30', text: '02:30'},
        {key: '03:00', text: '03:00'},
        {key: '03:30', text: '03:30'},
        {key: '04:00', text: '04:00'},
        {key: '04:30', text: '04:30'},
        {key: '05:00', text: '05:00'},
        {key: '05:30', text: '05:30'},
        {key: '06:00', text: '06:00'},
        {key: '06:30', text: '06:30'},
        {key: '07:00', text: '07:00'},
        {key: '07:30', text: '07:30'},
        {key: '08:00', text: '08:00'},
        {key: '08:30', text: '08:30'},
        {key: '09:00', text: '09:00'},
        {key: '09:30', text: '09:30'},
        {key: '10:00', text: '10:00'},
        {key: '10:30', text: '10:30'},
        {key: '11:00', text: '11:00'},
        {key: '11:30', text: '11:30'},
        {key: '12:00', text: '12:00'},
        {key: '12:30', text: '12:30'},
        {key: '13:00', text: '13:00'},
        {key: '13:30', text: '13:30'},
        {key: '14:00', text: '14:00'},
        {key: '14:30', text: '14:30'},
        {key: '15:00', text: '15:00'},
        {key: '15:30', text: '15:30'},
        {key: '16:00', text: '16:00'},
        {key: '16:30', text: '16:30'},
        {key: '17:00', text: '17:00'},
        {key: '17:30', text: '17:30'},
        {key: '18:00', text: '18:00'},
        {key: '18:30', text: '18:30'},
        {key: '19:00', text: '19:00'},
        {key: '19:30', text: '19:30'},
        {key: '20:00', text: '20:00'},
        {key: '20:30', text: '20:30'},
        {key: '21:00', text: '21:00'},
        {key: '21:30', text: '21:30'},
        {key: '22:00', text: '22:00'},
        {key: '22:30', text: '22:30'},
        {key: '23:00', text: '23:00'},
        {key: '23:30', text: '23:30'},
    ]
}

export const getHolidays = () => {
    return [
        '12/25/2023',
        '12/26/2023',
        '1/1/2023',
        '2/20/2023',
        '4/7/2023',
        '5/22/2023',
        '7/1/2023',
        '8/7/2023',
        '9/4/2023',
        '10/9/2023',
        '11/13/2023'
    ]
}