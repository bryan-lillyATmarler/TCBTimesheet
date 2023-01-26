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