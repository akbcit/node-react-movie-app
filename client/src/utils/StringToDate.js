function convertDateFormat(inputDate) {
    // Create a Date object from the input string
    const dateObject = new Date(inputDate);

    // Options for formatting the output
    const options = { month: 'short', day: 'numeric', year: 'numeric' };

    // Format the date to a string
    const formattedDate = dateObject.toLocaleDateString('en-US', options);

    return formattedDate;
}

export default convertDateFormat;
