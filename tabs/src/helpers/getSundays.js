function getSundays(months) {
    var sundays = [];
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var daysInMonth;
    var dayOfWeek;

    for (var i = 0; i < months; i++) {
        daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (var j = 1; j <= daysInMonth; j++) {
            dayOfWeek = new Date(currentYear, currentMonth, j).getDay();
            if (dayOfWeek === 0) {
                sundays.push(new Date(currentYear, currentMonth, j));
            }
        }
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
    }
    return sundays;
}

export default getSundays
