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

function findByIdOrSlug(array, slug) {
    const returnArray = array.find(
        (post) => post.slug === slug || post.id === parseInt(slug)
    );
    return returnArray;
}

module.exports = { capitalizeString, getSlug, findByIdOrSlug };
