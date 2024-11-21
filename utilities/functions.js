function capitalizeString(inputString) {
    inputString = inputString.toLowerCase();
    inputString = inputString[0].toUpperCase() + inputString.slice(1);
    return inputString;
}

module.exports = { capitalizeString };
