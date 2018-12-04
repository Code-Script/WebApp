export function getMonth(month) {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[month];
}

export function convertDate(timestamp) {
    var date = new Date(timestamp);
    var day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        monthLetter = getMonth(date.getMonth());

    return ({ day, month, year, hour, minutes, seconds, monthLetter });
}

export function lastSeenConverter(timestamp) {
    if (timestamp) {
        var time = getDiffBtTimes(timestamp);
        var days = time.days,
            hours = time.hours,
            minutes = time.minutes,
            seconds = time.seconds;
        var text;

        if (days > 0) {
            text = days === 1 ? `Hace ${days} día` : `Hace ${days} días`;
        } else if (hours > 0 && hours < 24) {
            text = hours === 1 ? `Hace ${hours} hora` : `Hace ${hours} horas`;
        } else if (minutes > 0 && minutes < 60) {
            text = minutes === 1 ? `Hace ${minutes} minuto` : `Hace ${minutes} minutos`;
        } else if (seconds > 0 && seconds < 60) {
            text = `Hace menos de 1 minuto`;
            // text = `Hace ${seconds} segundos`;
        }

        return text;
    }
}

export function getDiffBtTimes(timestamp) {
    var fechaini = new Date(timestamp);
    var fechafin = new Date();
    var dif = fechafin.getTime() - fechaini.getTime();

    var seconds = dif / 1000;
    var minutes = Math.round(seconds / 60);
    var hours = Math.round(minutes / 60);
    var days = Math.round(dif / (1000 * 60 * 60 * 24));
    seconds = Math.round(seconds);

    return ({ days, hours, minutes, seconds });
}

// export function getDiffBtTimes(timestamp) {
//     // Set the unit values in milliseconds.
// var msecPerMinute = timestamp * 60;
// var msecPerHour = msecPerMinute * 60;
// var msecPerDay = msecPerHour * 24;

// // Set a date and get the milliseconds
// var date = new Date();
// var dateMsec = date.getTime();

// // Get the difference in milliseconds.
// var interval = dateMsec - date.getTime();

// // Calculate how many days the interval contains. Subtract that many days from the interval to determine the remainder.
// var days = Math.floor(interval / msecPerDay );
// interval = interval - (days * msecPerDay );

// // Calculate the hours, minutes, and seconds.
// var hours = Math.floor(interval / msecPerHour );
// interval = interval - (hours * msecPerHour );

// var minutes = Math.floor(interval / msecPerMinute );
// interval = interval - (minutes * msecPerMinute );

// var seconds = Math.floor(interval / 1000 );

// return {days, hours, minutes, seconds};
// // Display the result.
// document.write(days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.");

// //Output: 164 days, 23 hours, 0 minutes, 0 seconds.
// }


// Diferencia entre fechas TEMPLATE
/*
var fechaini = new Date('2016-07-01 10:20:32');
var fechafin = new Date('2016-07-01 11:20:35');
var dif = fechafin.getTime() - fechaini.getTime();

var seconds = dif / 1000;
var minutes = Math.round(dif / 1000 / 60);
var hours = Math.round(dif / 1000 / 60 / 60);
var days = Math.round(dif / (1000 * 60 * 60 * 24));

console.log({days, hours, minutes, seconds});
*/