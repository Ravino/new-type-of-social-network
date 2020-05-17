import moment from 'moment';

export function isCorrectFullName(value) {
    return /^[0-8a-zа-яёїіи+\-\s]{2,100}$/i.test(value);
}

export function isCorrectHumanName(value) {
    if ((value+'') === '')
        return true;

    return /^[a-zа-яёїіи+\-\s]{1,100}$/i.test(value);
}

export function isCorrectSlug(value) {
    if ((value+'') === '')
        return true;

    return /^[a-z\-\_\d]{2,50}$/i.test(value);
}

export function notHaveSpace(value) {
    return !(/\s/.test(value));
}

export function isFirstNameAndLastName(value) {
    if ((value+'') === '')
        return true;

    value = value.replace(/\s\s+/g, ' ');
    let parts = value.split(' ');

    return (parts.length===2  &&  parts[0].trim()!==''  &&  parts[1].trim()!=='');
}


export function isValidRegistrationBirthDay(dateVal){
    let birthday = moment(dateVal, 'YYYY-MM-DD', true);
    let now = moment();

    if (birthday.isValid()) {
        return birthday <= now;
    }

    return false;
}
