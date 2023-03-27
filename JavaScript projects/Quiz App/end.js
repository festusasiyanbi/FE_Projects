const id = (id) => document.getElementById(id);
const finalScore = id("finalscore"),
mostRecentScore = localStorage.getItem("mostRecentScore"),
username = id("username"),
saveScoreBtn = id("savescore");


finalScore.innerHTML = `Your Score <br><span id="score">${mostRecentScore}</span><span id="pt">pt</span>`;


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const maxHighScore = 10;
username.addEventListener("keyup", (e) => {
    saveScoreBtn.disabled = !username.value
})


saveScoreBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5)
    localStorage.setItem("highScores", JSON.stringify(highScores));
    username.value = "";
})

