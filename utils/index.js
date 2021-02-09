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
        const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        const today = new Date();
        const lastMonth = months.slice(today.getMonth() - 1)[0];
        const threeYearsFromNow = today.getFullYear() + 3;
        return `1/${lastMonth}/${threeYearsFromNow}`;
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

exports.returnFileName = (centre) => {
    const date = new Date ();
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const lastMonth = monthNames[date.getMonth() - 1];
    return `${centre.split(" ").join("-").toLowerCase()}-${lastMonth}-wifi.csv`
}

exports.objectKeysToLowerCase = (object) => {
    const newObject = {};
    Object.keys(object).map((key => {
        newObject[key.toLowerCase()] = object[key];
    }));
    return newObject
}

exports.formatDatum = (datum) => {
    const lowerCaseDatum = exports.objectKeysToLowerCase(datum);
    lowerCaseDatum['sign up source'] = "wifi";
    lowerCaseDatum['postcode'] = exports.formatPostcode( datum['postcode']);
    if (lowerCaseDatum['week ending']) {
        lowerCaseDatum['expiry date'] = exports.returnExpiryDate(datum['week ending']);
    };
    if (lowerCaseDatum['creationdate']) {
        lowerCaseDatum['expiry date'] = exports.returnExpiryDate(datum['creationdate'].slice(0,10).split('-').reverse().join('/'));
    };
    if (!lowerCaseDatum['week ending'] && !lowerCaseDatum['creationdate']) {
        lowerCaseDatum['expiry date'] = exports.returnExpiryDate();
    }
    return lowerCaseDatum;
}


