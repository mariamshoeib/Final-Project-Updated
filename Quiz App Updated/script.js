let score = 0;
let questions = [];

let storedPoints = [];

let start = function (category) {
  //clone the questions so that we can keep track of which are left deleting them from our temporary 'questions' array
  for (question of allQuestions[category]) {
    questions.push(question);
  }

  const nextQuestion = getRandomQuestion();

  //display a random question alongside answers
  changeQuestion(nextQuestion.question);
  listAnswers(nextQuestion);
  //hide buttons
  const buttons = (document.getElementById("buttons").style.display = "none");
};

let changeQuestion = function (question) {
  document.getElementById("question").innerHTML = question;
};

let getRandomQuestion = function () {
  const numberOfQuestionsLeft = questions.length;
  //calculate a possible index to choose a question from the questions array
  const randomIndex = getRandomInt(numberOfQuestionsLeft);
  const randomQuestion = questions[randomIndex];
  return randomQuestion;
};

//round to integer so we can use the number as index
//the number of questions that are left are used as maximum, since the random function uses a number as its maximum possible outcome as parameter
getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

//loop through all answers and create htmtl elements that enable clicking on them
//we need to run an additional counter in the loop so we can create the ids of the answer elements
let listAnswers = function (question) {
  const allAnswers = question.answers;
  let content = "";
  let counter = 0;
  for (answer of allAnswers) {
    content =
      content +
      "<div id='answer" +
      counter +
      "' class='answer'" +
      "onclick='answerQuestion(" +
      counter +
      "," +
      question.id +
      ")'>" +
      answer +
      "</div>";
    counter++;
  }

  //render all answers
  let answersElement = document.getElementById("answers");
  answersElement.innerHTML = content;
};

//check if the clicked answer (=answerIndex) is the correct one (=question.solutionIndex)
//use questionId to find the correct question to check the answer against
//increment score if correct, remove question from our pool of possible questions and move to the next question either way

let answerQuestion = function (answerIndex, questionId) {

  questions.forEach(function (question) {
    if (question.id == questionId) {
      if (question.solutionIndex === answerIndex) {
        score++;
      }
      removeQuestion(questionId);
    }
    nextQuestion();
  });
};

//if we have no more questions left to answer, end the quiz
//otherwise get the next random question
let nextQuestion = function () {
  if (questions.length === 0) {
    finishQuiz();
  } else {
    const nextQuestion = getRandomQuestion();
    changeQuestion(nextQuestion.question);
    listAnswers(nextQuestion);
  }
};

//to not ask the same questions multiple times
let removeQuestion = function (questionId) {
  const indexToDelete = questions.findIndex(function (q) {
    return q.id === questionId;
  });
  if (indexToDelete !== -1) questions.splice(indexToDelete, 1);
};

//hide questions and answers
//show result and restart button
let finishQuiz = function () {
  //remove question and answers
  let questionElement = document.getElementById("question");
  questionElement.innerHTML = "";
  let answersElement = document.getElementById("answers");
  answersElement.innerHTML = "";
  let resultElement = document.getElementById("result");
  resultElement.innerHTML =
    "You finished the quiz and scored " + score + " points!";
  const restartMenu = (document.getElementById("restartMenu").style.display =
    "inline");

  //save result to local storage
  //check if results have been saved before, otherwise create an empty array
  //push new score to the new or existing array and store it
  const previousStorage = localStorage.getItem("points");
  if (previousStorage === null) {
    localStorage.setItem("points", "[]");
  }
  storedPoints = JSON.parse(localStorage.getItem("points"));
  storedPoints.push(score);
  localStorage.points = JSON.stringify(storedPoints);
};

let restart = function () {
  const restartMenu = (document.getElementById("restartMenu").style.display =
    "none");
  score = 0;
  const buttons = (document.getElementById("buttons").style.display = "inline");
};

//questions
const allQuestions = {
  tv: [
    {
      id: 0,
      question:
        "Which 2005 movie tells the story of a lion, a hippo, a zebra, and a giraffe who escape from Central Park Zoo?",
      answers: ["1. Madagascar", "2. Shark Tale", "3. Ice Age", "4. Shrek"],
      solutionIndex: 0,

    },
    {
      id: 1,
      question:
        "What was the name of the first film in the 'Harry Potter' series?",
      answers: [
        "1. Harry Potter And The Philosopher's Stone",
        "2. Harry Potter and the Chamber of Secrets",
        "3. bHarry Potter and the Goblet of Fire",
        "4. Harry Potter and the Prisoner of Azkaban",
      ],
      solutionIndex: 0,
    },
    {
      id: 2,
      question: "After which movie did the sale of pet rats increase rapidly?",
      answers: ["1. Ratatouille", "2. Pets 2", "3. Stuart Little", "4. Deadly Eyes"],
      solutionIndex: 0,
    }
    ,
    {
      id: 3,
      question: "Which animated Tv Shows main characters are inspired by Seven Deadly Sins?",
      answers: ["1. Winnie the Pooh", "2. Fairly Odd Parents 2", "3. Spongebob Squarepants", "4. Phineas and Ferb"],
      solutionIndex: 2,
    },
    {
      id: 4,
      question: "For which movie did Tim Burton train 40 squirrels to crack nuts for, rather than use CGI?",
      answers: ["1. Alvin & the Chipmunks", "2. Ice Age 2", "3. Brave", "4. Charlie and the Chocolate Factory"],
      solutionIndex: 3,
    },
    {
      id: 5,
      question: "Where did the Matrix code from The Matrix movies come from?",
      answers: ["1. A Sushi cookbook", "2. Programming Code", "3. Tree branch pattern", "4. A Chip"],
      solutionIndex: 0,
    },
    {
      id: 6,
      question: "Which movie was incorrectly announced as the winner of Best Picture at the 2017 Academy Awards, during the greatest Oscars flub of all time?",
      answers: ["1. Moonlight", "2. La La Land", "3. Arrival", "4. Lion"],
      solutionIndex: 1,
    },
    {
      id: 7,
      question: "Whats the name of the skyscraper in Die Hard?",
      answers: ["1. Wilshire Grand Center", "2. Nakatomi Plaza", "3. Two California Plaza", "4. Willis Tower"],
      solutionIndex: 1,
    },
    {
      id: 8,
      question: "Which movie was accidentally deleted, but was recovered by an employee who saved the movie to her computer at home while on maternity leave?",
      answers: ["1. Nemo", "2. Shrek", "3. Toy Story 2", "4. Shak Tale"],
      solutionIndex: 2,
    },
    {
      id: 9,
      question: "Who auditioned to be a cast member of Saturday Night Live multiple times, but was never hired?",
      answers: ["1. Kanye West", "2. Kevn Hart", "3. Ice Cube", "4. Jim Carrey"],
      solutionIndex: 3,
    },
  ],
  music: [
    {
      id: 0,
      question:
        "According to the lyrics of Kelis' 'Milkshake', released in 2003, where does her milkshake bring all the boys?",
      answers: ["1. The yard", "2. The bedroom", "3. The farm", "4. Bahamas"],
      solutionIndex: 0,
    },
    {
      id: 1,
      question: "Who is the first (and only) to tour on all seven continents?",
      answers: ["1. Queen", "2. Metallica", "3. Alica Cooper", "4. Backstreet Boys"],
      solutionIndex: 1,
    },
    {
      id: 2,
      question: "What country has the most metal bands per capita?",
      answers: ["1. Finland", "2. Sweden", "3. Germany", "4. Denmark"],
      solutionIndex: 0,
    },
    {
      id: 3,
      question: "Whos lips inspired Katy Perry to write “I Kissed a Girl”?",
      answers: ["1. Miley Cyrus", "2. Scarlett Johansson", "3. Taylor Swift ", "4. Lady Gaga"],
      solutionIndex: 1,
    },
    {
      id: 4,
      question: "Van Halen famously banned what color M&Ms in their rider?",
      answers: ["1. Red", "2. Yellow", "3. Brown", "4. Green"],
      solutionIndex: 2,
    },
    {
      id: 5,
      question: "Who was the first woman ever inducted into the Rock and Roll Hall of Fame?",
      answers: ["1. Whitney Houston", "2. Tina Turner", "3. Janis Joplin", "4. Aretha Franklin"],
      solutionIndex: 3,
    },
    {
      id: 6,
      question: "What is the most streamed song in the 20th century?",
      answers: ["1. Bohemian Rhapsody (Queen)", "2. Smells Like Teen Spirit (Nirvana)", "3. Sweet Child OMine (Guns N' Roses) ", "4. November Rain (Guns N' Roses)"],
      solutionIndex: 0,
    },
    {
      id: 7,
      question: "Which country has won Eurovision the most times?",
      answers: ["1. Sweden", "2. Ireland", "3. Netherlands", "4. UK"],
      solutionIndex: 1,
    },
    {
      id: 8,
      question: "What was the first song to be performed in outer space?",
      answers: ["1. US national anthem", "2. Happy Birthday", "3. Russian national anthem", "4. Imagine"],
      solutionIndex: 1,
    },
    {
      id: 9,
      question: "What rock star moonlights as a horror movie writer and director?",
      answers: ["1. Alice Cooper", "2. Marilyn Manson", "3. Rob Zombie", "4. Slipknot"],
      solutionIndex: 2,
    },
  ],
  food: [
    {
      id: 0,
      question: "Where are french fries from?",
      answers: ["1. USA", "2. France", "3. Belgium", "4. Germanz"],
      solutionIndex: 2,
    },
    {
      id: 1,
      question: "Whats the national dish for the US?",
      answers: ["1. Turkey", "2. No officially designated food", "3. Burgers", "4. Apple Pie"],
      solutionIndex: 1,
    },
    {
      id: 2,
      question: "Which of the following is NOT an existing food?",
      answers: ["1. Pancake soup", "2. Lime-flavored Skittle ", "3. Wasp crackers", "4. Roasted whole guinea pig"],
      solutionIndex: 1,
    },
    {
      id: 3,
      question: "What is the most widely consumed alcoholic drink on the planet?",
      answers: ["1. Wine", "2. Gin ", "3. Beer", "4. Vodka"],
      solutionIndex: 2,
    },
    {
      id: 4,
      question: "Which of the following is NOT technically a berry?",
      answers: ["1. Blackcurrant", "2. Gooseberry ", "3. Banana", "4. Strawberry"],
      solutionIndex: 3,
    },
    {
      id: 5,
      question: "Best candy for teeth:",
      answers: ["1. Chocolate", "2. Gummy Bears ", "3. Lollipop", "4. Licorice"],
      solutionIndex: 0,
    },
    {
      id: 6,
      question: "Which country consumes the most tea per person?",
      answers: ["1. Vietnam", "2. Turkey ", "3. England", "4. Japan"],
      solutionIndex: 1,
    },
    {
      id: 7,
      question: "Where are fortune cookies from?",
      answers: ["1. Japan", "2. USA ", "3. China", "4. Morocco"],
      solutionIndex: 1,
    },
    {
      id: 8,
      question: "Why do apples float on the water?",
      answers: ["1. They are 50% water", "2. Their skin doesnt let them drown", "3. They are 25% air", "4. They are sprayed with a chemical that will make them float"],
      solutionIndex: 2,
    },
    {
      id: 9,
      question: "Which of the following will NEVER go bad?",
      answers: ["1. Cheese", "2. Nuts", "3. Chocolate", "4. Honey"],
      solutionIndex: 3,

    },
  ],
};
