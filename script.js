// code for the html css debuging part 

function showLevel1() {
    // Hide all initial elements
    document.getElementById("buttonContainer").style.display = "none";
    document.getElementById("mainTitle").style.display = "none";
    document.getElementById("subTitle").style.display = "none";  // Added this line
    document.getElementById("introText").style.display = "none"; // Added this line

    fetch('data/htmlLevels.json')
        .then(response => response.json())
        .then(data => {
            const levelsContainer = document.getElementById("htmlLevelsContainer");
            levelsContainer.innerHTML = ''; // Clear any existing content
            data.levels.map((level, index) => {
                const levelDiv = document.createElement("div");
                levelDiv.id = level.id;
                levelDiv.className = "level hidden";
                levelDiv.innerHTML = `
                    <h1>${level.title}</h1>
                    <p>${level.description}</p>
                    <textarea id="htmlInput${index + 1}" rows="12" cols="50" style="width: 476px; height: 178px">${level.initialCode}</textarea>
                    <br />
                    <button onclick="checkHtmlLevel(${index + 1})">Submit</button>
                `;
                levelsContainer.appendChild(levelDiv);
            });
            document.getElementById(data.levels[0].id).style.display = "block"; // Show the first level
            startTimer(1, checkHtmlLevel);
        });
}

function checkHtmlLevel(levelIndex, autoSubmit = false) {
    fetch('data/htmlLevels.json')
        .then(response => response.json())
        .then(data => {
            const level = data.levels[levelIndex - 1];
            const userCode = document.getElementById(`htmlInput${levelIndex}`).value.trim();
            if (userCode === level.correctCode) {
                updateScore();
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    startTimer(levelIndex + 1, checkHtmlLevel);
                } else {
                    showFinalScreen(); // Changed from direct win display to final screen check
                }
            } else if (autoSubmit) {
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    startTimer(levelIndex + 1, checkHtmlLevel);
                } else {
                    showFinalScreen(); // Changed from direct win display to final screen check
                }
            } else {
                alert(`Incorrect ${level.language} code. Try again.`);
            }
        });
}


// code for the c c++ debuging part 

document.addEventListener("DOMContentLoaded", function() {
    fetch('data/cLevels.json')
        .then(response => response.json())
        .then(data => {
            const levelsContainer = document.getElementById("cLevelsContainer");
            data.levels.map((level, index) => {
                const levelDiv = document.createElement("div");
                levelDiv.id = level.id;
                levelDiv.className = "level hidden";
                levelDiv.innerHTML = `
                    <h1>${level.title}</h1>
                    <p>${level.description}</p>
                    <textarea id="cInput${index + 1}" rows="12" cols="50" style="width: 476px; height: 178px">${level.initialCode}</textarea>
                    <br />
                    <button onclick="checkCLevel(${index + 1})">Submit</button>
                `;
                levelsContainer.appendChild(levelDiv);
            });
        });
});

function checkCLevel(levelIndex, autoSubmit = false) {
    fetch('data/cLevels.json')
        .then(response => response.json())
        .then(data => {
            const level = data.levels[levelIndex - 1];
            const userCode = document.getElementById(`cInput${levelIndex}`).value.trim();
            if (userCode === level.correctCode) {
                updateScore();
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    startTimer(levelIndex + 1, checkCLevel);
                } else {
                    showFinalScreen(); // Changed from direct win display to final screen check
                }
            } else if (autoSubmit) {
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    startTimer(levelIndex + 1, checkCLevel);
                } else {
                    showFinalScreen(); // Changed from direct win display to final screen check
                }
            } else {
                alert(`Incorrect ${level.language} code. Try again.`);
            }
        });
}

function showLevel2() {
    // Hide all initial elements
    document.getElementById("buttonContainer").style.display = "none";
    document.getElementById("mainTitle").style.display = "none";
    document.getElementById("subTitle").style.display = "none";  // Added this line
    document.getElementById("introText").style.display = "none"; // Added this line
    
    const firstCLevel = document.querySelector("#cLevelsContainer .level");
    if (firstCLevel) {
        firstCLevel.style.display = "block";
        startTimer(1, checkCLevel);
    }
}

// python debuggingg code
function showLevel3() {
    // Hide all initial elements
    document.getElementById("buttonContainer").style.display = "none"; // Hide button container
    document.getElementById("mainTitle").style.display = "none";
    document.getElementById("subTitle").style.display = "none";  // Added this line
    document.getElementById("introText").style.display = "none"; // Added this line

    fetch('data/pyLevels.json')
        .then(response => response.json())
        .then(data => {
            const levelsContainer = document.getElementById("pyLevelsContainer");
            levelsContainer.innerHTML = ''; // Clear any existing content
            data.levels.map((level, index) => {
                const levelDiv = document.createElement("div");
                levelDiv.id = level.id;
                levelDiv.className = "level hidden";
                levelDiv.innerHTML = `
                    <h1>${level.title}</h1>
                    <p>${level.description}</p>
                    <textarea id="pyInput${index + 1}" rows="12" cols="50" style="width: 476px; height: 178px">${level.initialCode}</textarea>
                    <br />
                    <button onclick="checkpyLevel(${index + 1})">Submit</button>
                `;
                levelsContainer.appendChild(levelDiv);
            });
            document.getElementById(data.levels[0].id).style.display = "block"; // Show the first level
            startTimer(1, checkpyLevel);
        });
}

function checkpyLevel(levelIndex, autoSubmit = false) {
    fetch('data/pyLevels.json')
        .then(response => response.json())
        .then(data => {
            const level = data.levels[levelIndex - 1];
            const userCode = document.getElementById(`pyInput${levelIndex}`).value.trim();
            if (userCode === level.correctCode) {
                updateScore(); // Only update score when code is correct
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    startTimer(levelIndex + 1, checkpyLevel);
                } else {
                    showFinalScreen();
                }
            } else if (autoSubmit) {
                // Just move to next level without updating score when time runs out
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    startTimer(levelIndex + 1, checkpyLevel);
                } else {
                    showFinalScreen();
                }
            } else {
                alert(`Incorrect ${level.language} code. Try again.`);
            }
        });
}

// Add this new function to handle the final screen
function showFinalScreen() {
    // Hide all containers
    document.getElementById("htmlLevelsContainer").style.display = "none";
    document.getElementById("cLevelsContainer").style.display = "none";
    document.getElementById("pyLevelsContainer").style.display = "none";
    document.getElementById("buttonContainer").style.display = "none";
    document.getElementById("mainTitle").style.display = "none";
    document.getElementById("subTitle").style.display = "none";
    document.getElementById("introText").style.display = "none";
    
    // Check score and show appropriate message
    if (score >= 3) {
        document.getElementById("win").style.display = "block";
        document.getElementById("fail").style.display = "none";
    } else {
        document.getElementById("win").style.display = "none";
        document.getElementById("fail").style.display = "block";
        document.getElementById("finalScore").textContent = score;
    }
}

// Add timer and score elements to HTML
document.addEventListener("DOMContentLoaded", function() {
    const timerDiv = document.createElement("div");
    timerDiv.id = "timer";
    timerDiv.style.position = "fixed";
    timerDiv.style.top = "10px";
    timerDiv.style.right = "10px";
    timerDiv.innerHTML = 'Time left: <span id="timeLeft">15</span>s';
    document.body.appendChild(timerDiv);

    const scoreDiv = document.createElement("div");
    scoreDiv.id = "score";
    scoreDiv.style.position = "fixed";
    scoreDiv.style.top = "40px";
    scoreDiv.style.right = "10px";
    scoreDiv.innerHTML = 'Score: <span id="scoreValue">0</span>';
    document.body.appendChild(scoreDiv);
});

// Timer code
let timer;
let timeLeft = 15;
let score = 0;

function startTimer(levelIndex, checkFunction) {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById("timeLeft").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timeLeft").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkFunction(levelIndex, true); // Auto-submit when time runs out
        }
    }, 1000);
}

function updateScore() {
    score++;
    document.getElementById("scoreValue").textContent = score;
}

function showLevel2() {
    // Hide all initial elements
    document.getElementById("buttonContainer").style.display = "none";
    document.getElementById("mainTitle").style.display = "none";
    document.getElementById("subTitle").style.display = "none";  // Added this line
    document.getElementById("introText").style.display = "none"; // Added this line
    
    const firstCLevel = document.querySelector("#cLevelsContainer .level");
    if (firstCLevel) {
        firstCLevel.style.display = "block";
        startTimer(1, checkCLevel);
    }
}

function showLevel1() {
    // Hide all initial elements
    document.getElementById("buttonContainer").style.display = "none";
    document.getElementById("mainTitle").style.display = "none";
    document.getElementById("subTitle").style.display = "none";  // Added this line
    document.getElementById("introText").style.display = "none"; // Added this line

    fetch('data/htmlLevels.json')
        .then(response => response.json())
        .then(data => {
            const levelsContainer = document.getElementById("htmlLevelsContainer");
            levelsContainer.innerHTML = ''; // Clear any existing content
            data.levels.map((level, index) => {
                const levelDiv = document.createElement("div");
                levelDiv.id = level.id;
                levelDiv.className = "level hidden";
                levelDiv.innerHTML = `
                    <h1>${level.title}</h1>
                    <p>${level.description}</p>
                    <textarea id="htmlInput${index + 1}" rows="12" cols="50" style="width: 476px; height: 178px">${level.initialCode}</textarea>
                    <br />
                    <button onclick="checkHtmlLevel(${index + 1})">Submit</button>
                `;
                levelsContainer.appendChild(levelDiv);
            });
            document.getElementById(data.levels[0].id).style.display = "block"; // Show the first level
            startTimer(1, checkHtmlLevel);
        });
}

// Python debugging code
function showLevel3() {
    // Hide all initial elements
    document.getElementById("buttonContainer").style.display = "none"; // Hide button container
    document.getElementById("mainTitle").style.display = "none";
    document.getElementById("subTitle").style.display = "none";  // Added this line
    document.getElementById("introText").style.display = "none"; // Added this line

    fetch('data/pyLevels.json')
        .then(response => response.json())
        .then(data => {
            const levelsContainer = document.getElementById("pyLevelsContainer");
            levelsContainer.innerHTML = ''; // Clear any existing content
            data.levels.map((level, index) => {
                const levelDiv = document.createElement("div");
                levelDiv.id = level.id;
                levelDiv.className = "level hidden";
                levelDiv.innerHTML = `
                    <h1>${level.title}</h1>
                    <p>${level.description}</p>
                    <textarea id="pyInput${index + 1}" rows="12" cols="50" style="width: 476px; height: 178px">${level.initialCode}</textarea>
                    <br />
                    <button onclick="checkpyLevel(${index + 1})">Submit</button>
                `;
                levelsContainer.appendChild(levelDiv);
            });
            document.getElementById(data.levels[0].id).style.display = "block"; // Show the first level
            startTimer(1, checkpyLevel);
        });
}

function checkpyLevel(levelIndex, autoSubmit = false) {
    fetch('data/pyLevels.json')
        .then(response => response.json())
        .then(data => {
            const level = data.levels[levelIndex - 1];
            const userCode = document.getElementById(`pyInput${levelIndex}`).value.trim();
            if (userCode === level.correctCode) {
                updateScore(); // Only update score when code is correct
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    startTimer(levelIndex + 1, checkpyLevel);
                } else {
                    showFinalScreen();
                }
            } else if (autoSubmit) {
                // Just move to next level without updating score when time runs out
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    startTimer(levelIndex + 1, checkpyLevel);
                } else {
                    showFinalScreen();
                }
            } else {
                alert(`Incorrect ${level.language} code. Try again.`);
            }
        });
}

// Add this new function to handle the final screen
function showFinalScreen() {
    // Hide all containers
    document.getElementById("htmlLevelsContainer").style.display = "none";
    document.getElementById("cLevelsContainer").style.display = "none";
    document.getElementById("pyLevelsContainer").style.display = "none";
    document.getElementById("buttonContainer").style.display = "none";
    document.getElementById("mainTitle").style.display = "none";
    document.getElementById("subTitle").style.display = "none";
    document.getElementById("introText").style.display = "none";
    
    // Check score and show appropriate message
    if (score >= 3) {
        document.getElementById("win").style.display = "block";
        document.getElementById("fail").style.display = "none";
    } else {
        document.getElementById("win").style.display = "none";
        document.getElementById("fail").style.display = "block";
        document.getElementById("finalScore").textContent = score;
    }
}
