// Global variables for timer
let timerInterval;
let timeLeft;
const TIMER_DURATION = 15; // 15 seconds

function showLevel1() {
    document.getElementById("buttonContainer").style.display = "none"; // Hide button container
    document.getElementById("mainTitle").style.display = "none";
    // Hide the option text
    if (document.querySelector("p#mainTitle")) {
        document.querySelector("p#mainTitle").style.display = "none";
    }

    fetch('data/htmlLevels.json')
        .then(response => response.json())
        .then(data => {
            const levelsContainer = document.getElementById("htmlLevelsContainer");
            levelsContainer.innerHTML = ''; // Clear any existing content
            
            // Add timer display
            const timerDiv = document.createElement("div");
            timerDiv.id = "timer";
            timerDiv.className = "timer";
            timerDiv.innerHTML = `Time Left: <span id="countdown">${TIMER_DURATION}</span> seconds`;
            levelsContainer.appendChild(timerDiv);
            
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
            
            // Start the timer
            startTimer();
        });
}

function startTimer() {
    // Clear any existing timer
    clearInterval(timerInterval);
    
    // Reset time left
    timeLeft = TIMER_DURATION;
    document.getElementById("countdown").textContent = timeLeft;
    
    // Start countdown
    timerInterval = setInterval(function() {
        timeLeft--;
        document.getElementById("countdown").textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showTimeUpMessage();
        }
    }, 1000);
}

function showTimeUpMessage() {
    // Hide all levels
    const levels = document.querySelectorAll(".level");
    levels.forEach(level => {
        level.style.display = "none";
    });
    
    // Create and show the time-up message
    const timeUpDiv = document.createElement("div");
    timeUpDiv.id = "timeUp";
    timeUpDiv.className = "message";
    timeUpDiv.innerHTML = `
        <h1>Time's Up!</h1>
        <p>Better luck next time!</p>
        <button onclick="returnToMainMenu()">Back to Main Menu</button>
    `;
    
    // Add to container
    const activeContainer = document.querySelector("#htmlLevelsContainer:not(:empty), #cLevelsContainer:not(:empty), #pythonLevelsContainer:not(:empty)");
    activeContainer.appendChild(timeUpDiv);
    document.getElementById("timer").style.display = "none";
    
    // Make sure the "Choose the option" text is hidden
    if (document.querySelector("h1#mainTitle")) {
        document.querySelector("h1#mainTitle").style.display = "none";
    }
    if (document.querySelector("p#mainTitle")) {
        document.querySelector("p#mainTitle").style.display = "none";
    }
}

function returnToMainMenu() {
    // Clear timer
    clearInterval(timerInterval);
    
    // Hide all game containers
    document.getElementById("htmlLevelsContainer").innerHTML = '';
    document.getElementById("cLevelsContainer").innerHTML = '';
    document.getElementById("pythonLevelsContainer").innerHTML = '';
    document.getElementById("win").style.display = "none";
    if (document.getElementById("timeUp")) {
        document.getElementById("timeUp").style.display = "none";
    }
    
    // Show main menu
    document.getElementById("buttonContainer").style.display = "flex";
    document.getElementById("mainTitle").style.display = "block";
    if (document.querySelector("p#mainTitle")) {
        document.querySelector("p#mainTitle").style.display = "block";
    }
}

function checkHtmlLevel(levelIndex) {
    fetch('data/htmlLevels.json')
        .then(response => response.json())
        .then(data => {
            const level = data.levels[levelIndex - 1];
            const userCode = document.getElementById(`htmlInput${levelIndex}`).value.trim();
            if (userCode === level.correctCode) {
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    // Reset timer for new level
                    startTimer();
                } else {
                    clearInterval(timerInterval);
                    document.getElementById("timer").style.display = "none";
                    document.getElementById("win").style.display = "block";
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
        
    // Load Python levels
    fetch('data/pythonLevels.json')
        .then(response => response.json())
        .then(data => {
            const levelsContainer = document.getElementById("pythonLevelsContainer");
            if (!levelsContainer) {
                const container = document.createElement("div");
                container.id = "pythonLevelsContainer";
                document.body.appendChild(container);
            }
            
            data.levels.map((level, index) => {
                const levelDiv = document.createElement("div");
                levelDiv.id = level.id;
                levelDiv.className = "level hidden";
                levelDiv.innerHTML = `
                    <h1>${level.title}</h1>
                    <p>${level.description}</p>
                    <textarea id="pythonInput${index + 1}" rows="12" cols="50" style="width: 476px; height: 178px">${level.initialCode}</textarea>
                    <br />
                    <button onclick="checkPythonLevel(${index + 1})">Submit</button>
                `;
                document.getElementById("pythonLevelsContainer").appendChild(levelDiv);
            });
        });
});

function showLevel2() {
    document.getElementById("buttonContainer").style.display = "none";
    document.getElementById("mainTitle").style.display = "none";
    // Hide the option text
    if (document.querySelector("p#mainTitle")) {
        document.querySelector("p#mainTitle").style.display = "none";
    }
    
    // Add timer display
    const timerDiv = document.createElement("div");
    timerDiv.id = "timer";
    timerDiv.className = "timer";
    timerDiv.innerHTML = `Time Left: <span id="countdown">${TIMER_DURATION}</span> seconds`;
    document.getElementById("cLevelsContainer").appendChild(timerDiv);
    
    const firstCLevel = document.querySelector("#cLevelsContainer .level");
    if (firstCLevel) {
        firstCLevel.style.display = "block";
    }
    
    // Start the timer
    startTimer();
}

function checkCLevel(levelIndex) {
    fetch('data/cLevels.json')
        .then(response => response.json())
        .then(data => {
            const level = data.levels[levelIndex - 1];
            const userCode = document.getElementById(`cInput${levelIndex}`).value.trim();
            if (userCode === level.correctCode) {
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    // Reset timer for new level
                    startTimer();
                } else {
                    clearInterval(timerInterval);
                    document.getElementById("timer").style.display = "none";
                    document.getElementById("win").style.display = "block";
                }
            } else {
                alert(`Incorrect ${level.language} code. Try again.`);
            }
        });
}

// New function for Python levels
function showLevel3() {
    document.getElementById("buttonContainer").style.display = "none";
    document.getElementById("mainTitle").style.display = "none";
    // Hide the option text
    if (document.querySelector("p#mainTitle")) {
        document.querySelector("p#mainTitle").style.display = "none";
    }
    
    // Add timer display
    const timerDiv = document.createElement("div");
    timerDiv.id = "timer";
    timerDiv.className = "timer";
    timerDiv.innerHTML = `Time Left: <span id="countdown">${TIMER_DURATION}</span> seconds`;
    document.getElementById("pythonLevelsContainer").appendChild(timerDiv);
    
    const firstPythonLevel = document.querySelector("#pythonLevelsContainer .level");
    if (firstPythonLevel) {
        firstPythonLevel.style.display = "block";
    }
    
    // Start the timer
    startTimer();
}

function checkPythonLevel(levelIndex) {
    fetch('data/pythonLevels.json')
        .then(response => response.json())
        .then(data => {
            const level = data.levels[levelIndex - 1];
            const userCode = document.getElementById(`pythonInput${levelIndex}`).value.trim();
            if (userCode === level.correctCode) {
                document.getElementById(level.id).style.display = "none";
                if (levelIndex < data.levels.length) {
                    document.getElementById(data.levels[levelIndex].id).style.display = "block";
                    // Reset timer for new level
                    startTimer();
                } else {
                    clearInterval(timerInterval);
                    document.getElementById("timer").style.display = "none";
                    document.getElementById("win").style.display = "block";
                }
            } else {
                alert(`Incorrect ${level.language} code. Try again.`);
            }
        });
}