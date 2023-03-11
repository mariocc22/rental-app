// calculate number of dates between two days

function calculateDays(startDate, endData) {
    const date1 = new Date(startDate);
    const date2 = new Date(endData);

    const diffInMs = date2 - date1;
    // divide by milliseconds in a day
    const diffInDays = Math.floor(diffInMs / 86400000);

    return diffInDays
}

export { calculateDays }