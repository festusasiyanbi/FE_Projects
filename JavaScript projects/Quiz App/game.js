const id = (id) => document.getElementById(id);
const choices = Array.from(document.getElementsByClassName("choice-text")),
question = id("question"),
arrowBtn = id("arrow"),
progressBarFull = id("progress-bar-full"),
questionLength = id("question-counter"),
playerScore = id("score"),
maxQuestion = 5,
correctBonus = 10;


let score = 0
let currentQuestion = {};
let availableQuestion = [];
let questionCounter = 0;
let acceptingAnswer = false;

let questions = [];

const fetchUrl = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=100&category=9&difficulty=easy&type=multiple")
    const loadedQuestions = await response.json()
    questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };
        const answerChoices = [ ...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
        });
        return formattedQuestion;
})
startGame()
}
fetchUrl()

arrowBtn.addEventListener("click", () => {
    window.location.assign('/index.html');
})
const startGame = () => {
    score = 0;
    questionCounter = 0;
    availableQuestion = [ ...questions];
    getNewQuestion();
}

const getNewQuestion = () => {
    if (availableQuestion.length ===  0 || questionCounter >= maxQuestion) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('end.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerHTML = currentQuestion.question;
    questionLength.innerHTML = `Question: <span id="current-question">${questionCounter}</span> / ${maxQuestion}`;
    progressBarFull.style.width = `${(questionCounter / maxQuestion) * 100}%`;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number]
    });
    availableQuestion.splice(questionIndex, 1);
    acceptingAnswer = true;
};
    choices.forEach(choice => {
        choice.addEventListener("click", (e) => {
            if (!acceptingAnswer) return;
            acceptingAnswer = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];
           const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
           if (classToApply === 'correct') {
               incrementScore(correctBonus);
           }
           selectedChoice.parentElement.classList.add(classToApply)
           setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
           }, 1000)
            
        }); 
    });
    

const incrementScore = (num) => {
    score += num
    playerScore.innerHTML = `Score: ${score}`
}

