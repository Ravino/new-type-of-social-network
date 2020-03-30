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

    return (value.split(' ').length === 2);
}
