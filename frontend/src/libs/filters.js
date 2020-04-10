/**
 * @link https://momentjs.com/docs/#/parsing/string-format/
 * @link http://numeraljs.com/
 * @link https://habr.com/ru/post/163321/
 */

import Vue from 'vue';
import moment from 'moment';
import numeral from 'numeral';

moment.locale('ru');

Vue.filter('toHM', (dateValue) => {
    return moment(dateValue).format('HH:mm');
});

Vue.filter('toLongDate', (dateValue) => {
    return moment(dateValue).format('DD MMMM YYYY г.');
});

Vue.filter('toFullDateTime', (dateValue) => {
    return moment(dateValue).format('YYYY-MM-DD HH:mm:ss');
});

Vue.filter('toDMYHM', (dateValue) => {
    return moment(dateValue).format('DD.MM.YYYY HH:mm');
});

Vue.filter('lastMessageTime', (messageDT) => {
    let now = moment();
    let yesterday = moment().subtract(1, 'days');
    let lmt = moment.unix(messageDT);

    // если сообщение было сегодня или вчера
    if (now.format('YYYY-MM-DD')===lmt.format('YYYY-MM-DD')  ||  yesterday.format('YYYY-MM-DD')===lmt.format('YYYY-MM-DD')) {
        return lmt.format('HH:mm');
    }

    // сообщение было в течение последних 7 дней
    let lastWeek = moment().subtract(7, 'days');
    if ( +lmt.format('X') >= +lastWeek.format('X')) {
        let dow = lmt.format('dddd');
        return dow.charAt(0).toUpperCase() + dow.slice(1);
    }

    return lmt.format('DD.MM.YY');
});

/**
 * если число больше minLimit, то превращает число вида `3483` в строку вида `3 K`
 */
Vue.filter('statsBeauty', (nValue, minLimit) => {
    minLimit = minLimit ||  2000;

    if (nValue >= minLimit) {
        return numeral(nValue).format('0 a').toUpperCase().replace(/\s/g, '&nbsp;');
    }

    return nValue;
});

/**
 * заменяет все переводы строк на тэг <br />
 */
Vue.filter('toBR', (text) => {
    return text.replace(/\n/g, '<br />');
});


/**
 * превращает число вида `34833483` в строку вида `34 833 483`
 */
Vue.filter('space1000', (dValue) => {
    return numeral(dValue).format('0,0').replace(/,/g,' ');
});

Vue.filter('toYMD', (value) => {
    return moment(value).format('YYYY-MM-DD');
});

