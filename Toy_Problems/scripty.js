let math, eng, lang, hum, tech;

function calc() {
    math = parseFloat(document.getElementById("math").value);
    eng = parseFloat(document.getElementById("eng").value);
    lang = parseFloat(document.getElementById("lang").value);
    hum = parseFloat(document.getElementById("hum").value);
    tech = parseFloat(document.getElementById("tech").value);

    let sum = math + eng + lang + hum + tech;
    document.getElementById("spot").innerHTML = `Total mark is = ${sum}`;

    let percentage = (sum / 500) * 100;
    document.getElementById("spot1").innerHTML = `Percentage is = ${percentage}%`;

    if (percentage > 79) {
        document.getElementById("spot2").innerHTML = `Grade: A`;
    } else if (percentage >= 60 && percentage <= 79) {
        document.getElementById("spot2").innerHTML = `Grade: B`;
    } else if (percentage >= 50 && percentage <= 59) {
        document.getElementById("spot2").innerHTML = `Grade: C`;
    } else if (percentage >= 40 && percentage <= 49) {
        document.getElementById("spot2").innerHTML = `Grade: D`;
    } else if (percentage >= 0 && percentage <= 39) {
        document.getElementById("spot2").innerHTML = `Grade: E`;
    } else {
        document.getElementById("spot2").innerHTML = `ERROR`;
    }
}
