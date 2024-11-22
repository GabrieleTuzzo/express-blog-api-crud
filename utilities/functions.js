function capitalizeString(inputString) {
    inputString = inputString.toLowerCase();
    inputString = inputString[0].toUpperCase() + inputString.slice(1);
    return inputString;
}

function getSlug(title) {
    let slug = title.toLowerCase();
    slug = slug.replaceAll(' ', '-');
    return slug;
}

module.exports = { capitalizeString, getSlug };
