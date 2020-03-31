import moment from 'moment';

export function isCorrectFullName(value) {
    if ((value+'') === '')
        return true;

    return /^[0-8a-zа-яёїіи+\-\s]{2,100}$/i.test(value);
}

export function isFirstNameAndLastName(value) {
    if ((value+'') === '')
        return true;

    value = value.replace(/\s\s+/g, ' ');
    let parts = value.split(' ');

    return (parts.length===2  &&  parts[0].trim()!==''  &&  parts[1].trim()!=='');
}


export function isValidDMY(dateVal){
    if ((dateVal+'') === '')
        return true;
    return moment(dateVal, 'DD.MM.YYYY', true).isValid();
}
