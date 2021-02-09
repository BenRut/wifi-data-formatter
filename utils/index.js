exports.formatPostcode = (postcode) => {
    const parts = postcode.toUpperCase().match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/);
    if (parts === null) return postcode.toUpperCase();
    parts.shift();
    return parts.join(' ');
}

exports.convertUKDateToUS = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("/");
    return `${parts[1]}/${parts[0]}/${parts[2]}`;
}

exports.returnExpiryDate = (date) => {
    let in3Years;
    if (typeof date === "string") {
        const dateObj = new Date(exports.convertUKDateToUS(date));
        in3Years = new Date(dateObj.setFullYear(dateObj.getFullYear() + 3));
    } if (typeof date === "object") {
        in3Years = new Date(date.setFullYear(date.getFullYear() + 3));
    } if (!date) {
        const today = new Date();
        in3Years = new Date(today.setFullYear(today.getFullYear() + 3));
    }
    return `${in3Years.getUTCDate()}/${in3Years.getUTCMonth() + 1}/${in3Years.getUTCFullYear()}`;
}

exports.getDataByCentre = (data, centre) => {
    return data.filter((datum) => {
        return datum["Registration Location Name"] === centre;
    });
}

exports.getCentres = (data) => {
    return data.reduce((centres, datum)=>{
        if (!centres.includes(datum["Registration Location Name"])) {
            centres.push(datum["Registration Location Name"]);
        }
        return centres;
    }, []);
}


