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



/* =========================
   DAY OF YEAR
========================= */

function getDayOfYear() {

  const now = new Date();

  const start = new Date(
    now.getFullYear(),
    0,
    0
  );

  const diff = now - start;

  const oneDay =
    1000 * 60 * 60 * 24;

  return Math.floor(diff / oneDay);

}



/* =========================
   WEATHER
========================= */

async function loadWeather() {

  try {

    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.2565&longitude=-95.9345&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FChicago"
    );


    const data = await response.json();


    const temperature = Math.round(
      data.current.temperature_2m
    );


    const weatherCode =
      data.current.weather_code;



    document.getElementById("temperature").innerText =
      `${temperature}°F`;



    let icon = "☀️";
    let description = "Sunny";



    if (weatherCode >= 1 && weatherCode <= 3) {

      icon = "🌤️";
      description = "Partly Cloudy";

    }


    else if (weatherCode >= 45 && weatherCode <= 48) {

      icon = "🌫️";
      description = "Foggy";

    }


    else if (weatherCode >= 51 && weatherCode <= 67) {

      icon = "🌧️";
      description = "Rainy";

    }


    else if (weatherCode >= 71 && weatherCode <= 77) {

      icon = "❄️";
      description = "Snowy";

    }


    else if (weatherCode >= 95) {

      icon = "⛈️";
      description = "Stormy";

    }



    document.getElementById("weatherIcon").innerText =
      icon;


    document.getElementById("weatherText").innerText =
      description;


  }


  catch(error) {

    console.log(
      "Weather error:",
      error
    );


    document.getElementById("weatherText").innerText =
      "Weather unavailable";

  }

}



/* =========================
   MESSAGE ANIMATION
========================= */

function showTyping(callback) {

  const messageEl =
    document.getElementById("message");


  messageEl.innerHTML = `

    <div class="typing-soft">

      <span></span>
      <span></span>
      <span></span>

    </div>

  `;


  setTimeout(
    callback,
    1400
  );

}



function revealMessage(text) {

  const messageEl =
    document.getElementById("message");


  messageEl.classList.remove(
    "soft-pop"
  );


  void messageEl.offsetWidth;


  messageEl.innerText =
    text;


  messageEl.classList.add(
    "soft-pop"
  );

}




/* =========================
   FLOATING WORD ANIMATION
========================= */

function createWord() {

  const el =
    document.createElement("div");


  el.className =
    "floating-word";


  el.innerText =
    words[
      Math.floor(
        Math.random() * words.length
      )
    ];



  el.style.left =
    Math.random() *
    window.innerWidth +
    "px";


  el.style.top =
    Math.random() *
    window.innerHeight +
    "px";



  const angle =
    Math.random() *
    Math.PI *
    2;


  const distance =
    120 +
    Math.random() *
    220;



  el.style.setProperty(
    "--dx",
    Math.cos(angle) *
    distance +
    "px"
  );


  el.style.setProperty(
    "--dy",
    Math.sin(angle) *
    distance +
    "px"
  );



  document
    .getElementById("wordBg")
    .appendChild(el);



  setTimeout(() => {

    el.remove();

  },15000);

}




function startWordIntro() {

  let ticks = 0;


  const interval =
    setInterval(() => {


      for (
        let i = 0;
        i < 3;
        i++
      ) {

        createWord();

      }



      ticks++;


      if (ticks > 5) {

        clearInterval(interval);

      }


    },500);

}





/* =========================
   DAILY MESSAGE
========================= */

function loadMessage() {

  const day =
    getDayOfYear();


  const index =
    day % messages.length;



  document.getElementById("dayTitle").innerHTML =
    `Day ${day} <span class="heart">💗</span>`;



  showTyping(() => {

    revealMessage(
      messages[index]
    );

  });

}





/* =========================
   START APP
========================= */

startWordIntro();

loadMessage();

loadWeather();