const messages = [
  "Good morning, mi amor. Before your day begins, I hope you remember that there is someone who feels incredibly lucky just knowing you exist.",

  "I love that you can make me smile without even trying. Sometimes it is something you say, something you do, or simply the way you are.",

  "I hope you see yourself today the way I see you. Someone who is kind, special, beautiful, and worth appreciating every single day.",

  "One thing I never want to take for granted is how comfortable I feel being myself around you. That feeling is something truly special.",

  "I love hearing your thoughts because even the smallest things you talk about give me another little piece of who you are.",

  "You have a way of making moments feel more important. A simple conversation with you can become one of my favorite parts of the day.",

  "I hope today gives you a reason to laugh. Your smile is one of my favorite things to see.",

  "I love how much meaning you bring into the little things. You remind me that the smallest moments can become the ones we remember forever.",

  "Sometimes I think about how many memories we have yet to create, and it makes me excited for all the moments waiting for us.",

  "I hope you know that I notice the little things about you. The things you probably think nobody sees are often the things I love the most.",

  "I love the way your personality shines through in everything you do. You do not have to try to stand out because you naturally do.",

  "One of my favorite things about you is the way you care. You have a heart that shows love without needing recognition for it.",

  "I hope you never forget that you are appreciated for who you are, not just for what you do for others.",

  "You make me look forward to the simple parts of life. The conversations, the laughs, and the random moments that become memories.",

  "I love that there are still things about you I get to discover. Getting to know you more will always be one of my favorite things.",

  "I hope today you take a moment to be proud of yourself. You have grown into someone truly amazing.",

  "I love the little expressions you make when you are excited, confused, or telling a story. They are moments I wish I could save forever.",

  "You have no idea how many times a day something reminds me of you. Somehow you have become part of the way I experience the world.",

  "I hope you always feel comfortable being exactly who you are with me. That version of you is my favorite one.",

  "I love that we can laugh together. Being able to have fun with someone you love is one of life's greatest gifts.",

  "There is something special about knowing someone so deeply that even their little habits become things you adore.",

  "I hope today reminds you that you are capable of more than you sometimes give yourself credit for.",

  "I love how passionate you become when you talk about something you care about. Seeing your excitement makes me happy.",

  "You have taught me that love is not just about big moments. It is about appreciating the everyday moments too.",

  "I hope you know that your presence makes a difference. You make the lives of the people around you better just by being yourself.",

  "I love that you have a way of making me want to slow down and enjoy the moment instead of always thinking about what comes next.",

  "One of my favorite things is learning the reasons behind the things you love. Every story gives me another glimpse into your heart.",

  "I hope you are gentle with yourself today. You deserve the same kindness you give to everyone else.",

  "I love the way you bring your own personality into everything. There is nobody else who does things exactly like you.",

  "You make me appreciate the little details in life that I used to overlook.",

  "I hope you know how much your happiness matters to me. Seeing you happy is something I will always care about.",

  "I love that we can have meaningful conversations and silly ones too. Having both is what makes something feel real.",

  "You are someone who makes people feel comfortable being themselves. That is a rare quality.",

  "I hope today gives you a moment where you stop and realize how incredible you are.",

  "I love when you share random thoughts with me because those little moments make me feel closer to you.",

  "You remind me that the best parts of life are usually not planned. They are the moments that happen naturally.",

  "I hope you always chase the things that make you happy because your happiness deserves room to grow.",

  "I love the way you see things differently than I do. You bring a perspective into my life that I would not have without you.",

  "You are someone I can talk to about anything, and that means more to me than you probably realize.",

  "I hope you remember that even on difficult days, there is someone cheering for you and believing in you.",

  "I love the little moments when you get comfortable and completely yourself. Those are some of my favorite moments with you.",

  "You have a beautiful way of making people feel cared about. I hope you receive that same love back every day.",

  "I hope you never underestimate the impact you have on the people who love you.",

  "I love that every conversation with you teaches me something new about the person you are.",

  "You make ordinary days feel like they are worth remembering.",

  "I hope today brings you something unexpected that makes you smile.",

  "I love that you are both strong and soft. You have a beautiful balance that makes you who you are.",

  "You are one of those people who makes life feel a little brighter just by being around.",

  "I hope you always remember that you are deeply valued and cared for.",

  "I love being able to share parts of my life with you because you make every experience better."
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









function getLoveDay() {

    const today = new Date();

    // Nicolle's birthday (Month is 0-based, so July = 6)
    let birthday = new Date(today.getFullYear(), 6, 26);

    // If today is before this year's birthday,
    // use last year's birthday.
    if (today < birthday) {
        birthday = new Date(today.getFullYear() - 1, 6, 26);
    }

    const msPerDay = 1000 * 60 * 60 * 24;

    const diff = Math.floor(
        (today - birthday) / msPerDay
    );

    return diff + 1;
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









function loadMessage() {

    const messageElement =
    document.getElementById("message");


    const day = getLoveDay();


    messageElement.classList.add(
        "message-hidden"
    );


    setTimeout(()=>{


        document.getElementById("dayTitle").innerHTML = `
            Day ${day}
            <span class="heart">💗</span>
        `;


        messageElement.innerText =
            messages[day - 1];


        messageElement.classList.remove(
            "message-hidden"
        );


    },800);

}
window.onload=function(){

    startWelcome();

    startWordIntro();

    loadMessage();

};
