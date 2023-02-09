//in HTML, you can only have one id per element.
//document.getElementById("currentNumber"); will get the whole thing: html tag and the content.

let pronoun = "he";
let ageGroup = "adult";
let guesses = [];
let randomAge = findRandomAge();

function findRandomAge() {
  let age;
  switch (ageGroup) {
    case "child":
      age = 1 + Math.floor(Math.random() * 10);
      break;
    case "young":
      age = 11 + Math.floor(Math.random() * 15);
      break;
    case "adult":
      age = 26 + Math.floor(Math.random() * 40);
      break;
    case "older":
      age = 66 + Math.floor(Math.random() * 60);
      break;
  }
  return age;
}

//select the pronoun
const heBtn = document.getElementById("heSelector");
const sheBtn = document.getElementById("sheSelector");
const itBtn = document.getElementById("itSelector");

heBtn.addEventListener("click", () => {
  pronounHandler("he");
});
sheBtn.addEventListener("click", () => {
  pronounHandler("she");
});
itBtn.addEventListener("click", () => {
  pronounHandler("it");
});

const highlightPronounBtn = () => {
  heBtn.classList.remove("button-selected");
  sheBtn.classList.remove("button-selected");
  itBtn.classList.remove("button-selected");

  if (pronoun === "he") {
    heBtn.classList.add("button-selected");
  } else if (pronoun === "she") {
    sheBtn.classList.add("button-selected");
  } else {
    itBtn.classList.add("button-selected");
  }
};

highlightPronounBtn();

function pronounHandler(pn) {
  pronoun = pn;
  highlightPronounBtn();
}

//Select age group

const childSelectorBtn = document.getElementById("childSelector");
const youngSelectorBtn = document.getElementById("youngSelector");
const adultSelectorBtn = document.getElementById("adultSelector");
const olderSelectorBtn = document.getElementById("olderSelector");

childSelectorBtn.addEventListener("click", () => {
  ageGroupHandler("child");
});
youngSelectorBtn.addEventListener("click", () => {
  ageGroupHandler("young");
});
adultSelectorBtn.addEventListener("click", () => {
  ageGroupHandler("adult");
});
olderSelectorBtn.addEventListener("click", () => {
  ageGroupHandler("older");
});

const highlightAgeGroupBtn = () => {
  childSelectorBtn.className = "";
  youngSelectorBtn.className = "";
  adultSelectorBtn.className = "";
  olderSelectorBtn.className = "";

  if (ageGroup === "child") {
    childSelectorBtn.className = "button-selected";
  } else if (ageGroup === "young") {
    youngSelectorBtn.className = "button-selected";
  } else if (ageGroup === "adult") {
    adultSelectorBtn.className = "button-selected";
  } else {
    olderSelectorBtn.className = "button-selected";
  }
};

highlightAgeGroupBtn();

function ageGroupHandler(ag) {
  ageGroup = ag;
  highlightAgeGroupBtn();
  randomAge = findRandomAge();
  console.log(randomAge);
}

//age guesser handler

const inputField = document.getElementById("ageInput");
const submitBtn = document.getElementById("ageInputBtn");
const myGuessText = document.getElementById("myGuess");
const olderOrYoungerBtn = document.getElementById("olderOrYoungerBtn");
const answerDiv = document.getElementById("answerDiv");
const answerListDiv = document.getElementById("answerListDiv");
const answerText = document.getElementById("answerText");
const olderOrYoungerAnswer = document.getElementById("olderOrYoungerAnswer");
const answerList = document.getElementById("answerList");
const emoji = document.getElementById("emoji");
const attempts = document.getElementById("attempts");

submitBtn.addEventListener("click", submitHandler);
inputField.addEventListener("focus", () => hideAnswer());
olderOrYoungerBtn.addEventListener("click", olderOrYoungerHandler);
let guess;
let answer;

hideAnswer();

//this is where everything happens
function submitHandler() {
  guess = Number(inputField.value);
  let questionText = askQuestion(guess);

  if (questionText) {
    myGuessText.textContent = questionText;
    guesses.push(guess);
    appendItem(guesses[guesses.length - 1]);
    giveAnswer(checkAnswer(guess));
    showAnswer();
  }
}

function olderOrYoungerHandler() {
  console.log(guess, randomAge);
  if (guess != randomAge) {
    const olderOrYounger = guess < randomAge ? "older" : "younger";
    olderOrYoungerAnswer.textContent = `${pronoun} is ${olderOrYounger} than that.`;

    setTimeout(() => {
      olderOrYoungerAnswer.classList.remove("hidden");
    }, 1000);
  }
}

//make elements hidden at first
function hideAnswer() {
  myGuessText.classList.add("hidden");
  olderOrYoungerBtn.classList.add("hidden");
  answerDiv.classList.add("hidden");
  answerText.classList.add("hidden");
  emoji.classList.add("hidden");
  olderOrYoungerAnswer.classList.add("hidden");
}

function showAnswer() {
  myGuessText.classList.remove("hidden");
  emojiChange("maybe");
  answerDiv.classList.remove("hidden");
  emoji.classList.remove("hidden");

  setTimeout(() => {
    if (guess != randomAge) olderOrYoungerBtn.classList.remove("hidden");
    emojiChange(answer ? "yes" : "no");
    answerText.classList.remove("hidden");
    answerDiv.classList.remove("hidden");
  }, 3000);
}

function askQuestion(age) {
  let questionText;
  if (age && age > 0) {
    questionText = `Is ${pronoun} ${age} ${age > 1 ? "years" : "year"} old? `;
  }
  return questionText;
}

function emojiChange(file) {
  emoji.src = `${file}.png`;
}

function giveAnswer(check) {
  if (check) {
    answerText.textContent = "YES";
    answer = true;
  } else {
    answerText.textContent = "NO";
    answer = false;
  }
}

function appendItem(text) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(text));
  answerList.appendChild(li);

  attempts.textContent = guesses.length;
}

function checkAnswer(answer) {
  if (Number(answer) === randomAge) {
    return true;
  } else {
    return false;
  }
}
