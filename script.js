const messages = [

"I love how you make life feel peaceful just by being in it.",

"I love your smile — it’s my favorite view.",

"I love how you care so deeply about everything you do."

];



const words = [

"Mami",
"Amorcito",
"Beautiful",
"Darling",
"Mi Amor",
"Culona",
"Mi Todo",
"Gorgeous",
"Lo Mas Hermoso",
"Mi Reina",
"Mi Vida",
"Mi Princesa",
"Preciosa",
"Cariño"

];








let weatherDescription = "";

let temperature = "";









function getDayOfYear(){


const now = new Date();


const start = new Date(

now.getFullYear(),

0,

0

);


const diff = now-start;


return Math.floor(

diff /

(1000*60*60*24)

);


}









/* =========================
WEATHER
========================= */


async function loadWeather(){


try{


const response = await fetch(

"https://api.open-meteo.com/v1/forecast?latitude=41.2565&longitude=-95.9345&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit&timezone=America%2FChicago"

);



const data = await response.json();



temperature =
Math.round(

data.current.temperature_2m

);



const code =
data.current.weather_code;



const isDay =
data.current.is_day;




if(code===0){


weatherDescription =

isDay

? "Sunny ☀️"

: "Clear Night 🌙";


}


else if(code>=1 && code<=3){

weatherDescription =
"Partly Cloudy ⛅";

}


else if(code>=45 && code<=48){

weatherDescription =
"Foggy 🌫️";

}


else if(code>=51 && code<=67){

weatherDescription =
"Rainy 🌧️";

}


else if(code>=71 && code<=77){

weatherDescription =
"Snowy ❄️";

}


else if(code>=95){

weatherDescription =
"Stormy ⛈️";

}



}


catch(error){


console.log(error);


temperature="--";


weatherDescription =
"Weather unavailable";


}



}









/* =========================
NEWS API
========================= */





/* =========================
WELCOME
========================= */

async function startWelcome(){

document.body.classList.add(
"welcome-active"
);


await loadWeather();


const greeting =
document.getElementById("welcomeGreeting");


const weather =
document.getElementById("welcomeWeather");


const mood =
document.getElementById("moodCheck");


// HELLO

greeting.innerText =
"Hello Nicolle";

greeting.style.opacity="1";


// after 3 seconds transition to weather

setTimeout(()=>{

greeting.style.opacity="0";

weather.innerHTML = `
Here is a little look at your day ahead...

<br><br>

Omaha, NE • ${weatherDescription} ${temperature}°F
`;

weather.style.opacity="1";


setTimeout(()=>{

greeting.style.display="none";

},800);


},3000);




// weather to mood

setTimeout(()=>{


weather.style.opacity="0";


// prepare mood before weather disappears

mood.style.display="block";


setTimeout(()=>{


weather.style.display="none";


mood.style.opacity="1";


document.getElementById(
"moodButtons"
).style.display="flex";


document.getElementById(
"moodButtons"
).style.opacity="1";


},500);



},6500);



}










/* =========================
MOOD
========================= */


function selectMood(choice){


// OPEN FUNNY VIDEO

window.open(
    funnyVideos[choice],
    "_blank"
);



// IMMEDIATELY CLOSE WELCOME SCREEN

document
.getElementById("welcomeScreen")
.classList.add("hide");



setTimeout(()=>{


document.body.classList.remove(
"welcome-active"
);


},1500);


}







function skipMood(){


document
.getElementById("welcomeScreen")
.classList.add("hide");



setTimeout(()=>{


document.body.classList.remove(
"welcome-active"
);



},1500);



}




const funnyVideos = {

happy:
"https://www.youtube.com/watch?v=9sPthPleEKo",


love:
"https://www.youtube.com/shorts/fKJG4I4nx3U",


calm:
"https://www.youtube.com/shorts/uDOLjJ3DDQs",


tired:
"https://www.youtube.com/shorts/i_V_foxJg7Q",


sad:
"https://www.youtube.com/shorts/TCwNfo-c7Qc",


angry:
"https://www.youtube.com/watch?v=AbxSWiC4wPE"

};








/* =========================
FLOATING WORDS
========================= */


function createWord(){


const el =
document.createElement("div");


el.className =
"floating-word";


el.innerText =
words[

Math.floor(

Math.random()*words.length

)

];



el.style.left =
Math.random()*window.innerWidth+"px";


el.style.top =
Math.random()*window.innerHeight+"px";



const angle =
Math.random()*Math.PI*2;


const distance =
120+Math.random()*220;



el.style.setProperty(

"--dx",

Math.cos(angle)*distance+"px"

);



el.style.setProperty(

"--dy",

Math.sin(angle)*distance+"px"

);



document
.getElementById("wordBg")
.appendChild(el);



setTimeout(()=>{

el.remove();

},15000);



}





function startWordIntro(){


let ticks=0;



const interval=setInterval(()=>{


for(let i=0;i<5;i++){

createWord();

}



ticks++;



if(ticks>8){

clearInterval(interval);

}



},250);



}









function loadMessage(){


const day =
getDayOfYear();



document.getElementById(
"dayTitle"
).innerHTML =

`

Day ${day}

<span class="heart">

💗

</span>

`;



document.getElementById(
"message"
).innerText =
messages[day % messages.length];



}







window.onload=function(){



startWelcome();


startWordIntro();


loadMessage();



};
