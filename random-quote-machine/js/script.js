
const quotes = [

  {
    "author": "Robin Sharma",
    "quote": "Don't live the same year 75 times and call it a life."
  },

  {
    "author": "Rainer Maria Rilke",
    "quote": "The only journey is the one within."
  },

  {
    "author": "William Shakesspeare",
    "quote": "Be not afraid of greatness. Some are born great     \
    some achieve greatness, and others have greatness thrust upon them."
  },

  {
    "author": "Michael Jordan",
    "quote": "I've missed more than 9,000 shots during my career. I've  \
    lost almost 300  games. 26 times, I've been trusted to take the game winning \
    shot and missed. I've failed over and over and over again in my life. And    \
    that is why I succeed."
  },

  {
    "author": "Emily Dickinson",
    "quote": "Forever is composed of nows."
  },

  {
    "author": "Albert Einstein",
    "quote": "Play is the highest form of research."
  },

  {
    "author": "Will Rodgers",
    "quote": "Don't let yesterday take up too much of today."
  },

  {
    "author": "Bruce Lee",
    "quote": "If you spend too much time thinking about a thing, you'll never\
  get it done."
  },

  {
    "author": "Mary Anne Radmacher",
    "quote": "Courage doesn't always roar. Sometimes courage is the little voice at   \
  the end of the day that says I'll try again tomorrow."
  },

  {
    "author": "Henry Ford",
    "quote": "Failure is simply the opportunity to begin again, this time more intelligently."
  }

];

const colors = [
  "#28B1E0",
  "#52E028",
  "#2857E0",
  "#2892E0",
  "#E0B128",
  "#E08C28",
  "#28E084",
  "#D5E028",
  "#E02892"
];

let random = (arr) => arr[Math.floor(Math.random() * arr.length)];


function cssFormatter(selector, attr, value) {
  console.log(selector, attr, value);
  $(selector).css(attr, value);
}

function applyChanges() {
  let {author,quote} = random(quotes);
  let color = random(colors);
  console.log(author, quote, color);

  cssFormatter("body, .tweet-quote > h1, .button", "background-color", color);
  cssFormatter(".tweet-quote > i, .text, .author", "color", color);

  $(".text > h1").html("<i class='fa fa-quote-left'></i> " + quote).hide().fadeIn(500);
  $(".author").html("<h1>- " +  author + "</h1>").hide().fadeIn(500);
}

$(document).ready(function(){
    applyChanges();
    $(".button").click(function(){
    applyChanges();
  });
});
