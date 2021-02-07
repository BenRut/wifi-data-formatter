exports.formatPostcode = (postcode) => {
    const parts = postcode.toUpperCase().match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/);
    if (parts === null) return postcode.toUpperCase();
    parts.shift();
    return parts.join(' ');
}

exports.returnExpiryDate = (date) => {
    const today = new Date();
    if (!date) return new Date(today.setFullYear(today.getFullYear() + 3));
    return new Date(date.setFullYear(date.getFullYear() + 3));
}

