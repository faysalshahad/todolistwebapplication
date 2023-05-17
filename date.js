// Loggint this entire module
//console.log(module);

// Exporting this module. This code is useful when we export only one function
module.exports.getDateInEnglishFunction = todayDateinEnglish;

//If we wish to export multiple modules then we need write the code in a following way

// module.exports = {

//     todayDateinEnglish,
//     todayDateinBengali
// };

function todayDateinEnglish() {

    //standard javascript codes to get today's date
let today = new Date();

/**formating date in javascript and the code has been collected from
 * https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
 * 
 */
let dateFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"

};

/**here the en-US or bn-BD represents the language the data will be printed on the screen */
let dayInEnglish = today.toLocaleDateString("en-US", dateFormatOptions);

//let dayInBengali = today.toLocaleDateString("bn-BD", dateFormatOptions);

return dayInEnglish;
    
}

// Exporting this module. This code is useful when we export only one function
module.exports.getDateInBengaliFunction = todayDateinBengali;

function todayDateinBengali() {

    //standard javascript codes to get today's date
let today = new Date();

/**formating date in javascript and the code has been collected from
 * https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
 * 
 */
let dateFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"

};

/**here the en-US or bn-BD represents the language the data will be printed on the screen */
//let dayInEnglish = today.toLocaleDateString("en-US", dateFormatOptions);

let dayInBengali = today.toLocaleDateString("bn-BD", dateFormatOptions);

return dayInBengali;
    
}