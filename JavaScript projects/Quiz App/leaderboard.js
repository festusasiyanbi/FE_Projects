const leaderboardList = document.getElementById("leaderboardList"),
arrow = document.getElementById("arrow"),
highScores = JSON.parse(localStorage.getItem("highScores")) || [];

arrow.addEventListener("click", () => {
    return window.history.back();
})
leaderboardList.innerHTML = highScores.map(score => {
    return `<li id="leaderboard"> ${score.name} <span id="score">Score: ${score.score} </span></li>`
}).join("")