import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Your Supabase project details
const SUPABASE_URL = "https://ydesfbcsdzsdohsipspw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_MueE7hdwzWjMZU37kTGzXg_C2lcAd3y";

// Connect to Supabase
const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// ================================
// SIGN UP
// ================================

const signupButton = document.getElementById("signup-button");

signupButton.addEventListener("click", async () => {

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const message = document.getElementById("signup-message");

    if (!email || !password) {
        message.textContent = "Please enter an email and password.";
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        message.textContent = error.message;
        return;
    }

    message.textContent =
        "Account created! Please check your email to confirm your account.";

});


// ================================
// SIGN IN
// ================================

const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async () => {

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const message = document.getElementById("login-message");

    if (!email || !password) {
        message.textContent = "Please enter an email and password.";
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
    message.textContent = error.message;
    return;
}

await checkUser();

});


// ================================
// SWITCH BETWEEN SIGN UP & LOGIN
// ================================

document.getElementById("show-login-button")
    .addEventListener("click", () => {

        document.getElementById("signup-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";

    });


document.getElementById("show-signup-button")
    .addEventListener("click", () => {

        document.getElementById("login-form").style.display = "none";
        document.getElementById("signup-form").style.display = "block";

    });

// ================================
// CHECK LOGIN STATUS
// ================================

async function checkUser() {

    const { data: { user } } = await supabase.auth.getUser();

    const authSection = document.getElementById("auth-section");
    const dashboard = document.getElementById("dashboard");

    if (user) {

        // User is logged in
        authSection.style.display = "none";
        dashboard.style.display = "block";
        
        loadPlayerData();

        loadProfile();
    } else {

        // User is not logged in
        authSection.style.display = "block";
        dashboard.style.display = "none";

    }
}

checkUser();

const playerData = {
    name: "Shreyansh Dutta",
    matches: 360,
    innings: 322,
    runs: 8753,
    average: 37.41,
    strikeRate: 109.98,
};

function loadPlayerData() {

    showPage("home-page");

}

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.style.display = "none";

        });

    document
        .getElementById(pageId)
        .style.display = "block";
}

window.toggleDropdown = function() {

    const dropdown =
        document.getElementById("dropdown-menu");

    if (dropdown.style.display === "block") {

        dropdown.style.display = "none";

    } else {

        dropdown.style.display = "block";

    }
}


document.addEventListener("click", function(event) {

    const dropdown =
        document.getElementById("dropdown-menu");

    const userButton =
        document.querySelector(".user-button");

    if (
        !dropdown.contains(event.target) &&
        !userButton.contains(event.target)
    ) {

        dropdown.style.display = "none";

    }

});

window.signOut = async function() {

    await supabase.auth.signOut();

    location.reload();

}

window.showPage = function(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.style.display = "none";
    });

    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.style.display = "block";
    }
}

const battingRunChart = document.getElementById(
    "battingRunDistribution"
);

if (battingRunChart) {

    new Chart(battingRunChart, {

        type: "bar",

        data: {

            labels: [

                "Singles",
                "Doubles",
                "Triples",
                "Fours",
                "Sixes"

            ],

            datasets: [{

                label: "Percentage of Runs",

                data: [
                    30,
                    12,
                    1,
                    42,
                    15
                ],

                backgroundColor: [

                    "#22c55e",  // Singles

                    "#60a5fa",  // Doubles

                    "#a855f7",  // Triples

                    "#0218bf",  // Fours

                    "#ffd700"   // Sixes

                ]

            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    max: 50

                }

            }

        }

    });

}

const inningsChart = document.getElementById(
    "battingPositionInnings"
);

if (inningsChart) {

    new Chart(inningsChart, {

        type: "bar",

        data: {

            labels: [
                "1","2","3","4","5",
                "6","7","8","9","10","11"
            ],

            datasets: [{

                label: "Innings",

                data: [
                    89,
                    52,
                    57,
                    39,
                    29,
                    13,
                    12,
                    7,
                    5,
                    0,
                    2
                ],

                backgroundColor: "#bf0000"

            }]
        },

        options: {

            responsive: true,

            plugins: {

                title: {

                    display: true,

                    text: "Innings by Batting Position"

                }

            }

        }

    });

}

const runsChart = document.getElementById(
    "battingPositionRuns"
);

if (runsChart) {

    new Chart(runsChart, {

        type: "bar",

        data: {

            labels: [
                "1","2","3","4","5",
                "6","7","8","9","10","11"
            ],

            datasets: [{

                label: "Runs",

                data: [
                    3343,
                    1467,
                    1661,
                    769,
                    484,
                    236,
                    162,
                    46,
                    72,
                    0,
                    25
                ],

                backgroundColor: "#0218bf"

            }]
        },

        options: {

            responsive: true,

            plugins: {

                title: {

                    display: true,

                    text: "Runs by Batting Position"

                }

            }

        }

    });

}

const averageChart = document.getElementById(
    "battingPositionAverage"
);

if (averageChart) {

    new Chart(averageChart, {

        type: "bar",

        data: {

            labels: [
                "1","2","3","4","5",
                "6","7","8","9","10","11"
            ],

            datasets: [{

                label: "Average",

                data: [
                    45.79,
                    38.61,
                    41.52,
                    26.52,
                    24.20,
                    29.50,
                    23.14,
                    11.50,
                    72,
                    0,
                    12.50
                ],

                backgroundColor: "#22c55e"

            }]
        },

        options: {

            responsive: true,

            plugins: {

                title: {

                    display: true,

                    text: "Average by Batting Position"

                }

            }

        }

    });

}

const runsByYearChart =
    document.getElementById("runsByYear");

if (runsByYearChart) {

    new Chart(runsByYearChart, {

        type: "bar",

        data: {

            labels: [

                "2021",
                "2022",
                "2023",
                "2024",
                "2025",
                "2026"

            ],

            datasets: [{

                label: "Runs",

                data: [

                    367,
                    893,
                    1791,
                    904,
                    2361,
                    1949

                ],

                backgroundColor: "#bf0000",

                borderRadius: 6

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                },

                title: {

                    display: true,

                    text: "Runs Scored by Year"

                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

const wicketTypes =
    document.getElementById("wicketTypes");

if (wicketTypes) {

    new Chart(wicketTypes, {

        type: "bar",

        data: {

            labels: [

                "Bowled",
                "Caught",
                "LBW",
                "Stumped",
                "Caught Behind",
                "Caught & Bowled"

            ],

            datasets: [{

                data: [

                    59,
                    23,
                    6,
                    2,
                    4,
                    5

                ],

                backgroundColor: [

                    "#bf0000",
                    "#0218bf",
                    "#22c55e",
                    "#f97316",
                    "#ffd700",
                    "#a855f7"

                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}

const wicketsPosition =
    document.getElementById(
        "wicketsByPosition"
    );

if (wicketsPosition) {

    new Chart(wicketsPosition, {

        type: "bar",

        data: {

            labels: [

                "1","2","3","4","5",
                "6","7","8","9","10","11"

            ],

            datasets: [{

                label: "Wickets",

                data: [

                    12,
                    24,
                    11,
                    9,
                    12,
                    13,
                    6,
                    4,
                    4,
                    2,
                    3

                ],

                backgroundColor: "#bf0000"

            }]

        },

        options: {

            responsive: true,

            plugins: {

                title: {

                    display: true,

                    text: "Wickets by Batting Position"

                }

            }

        }

    });

}

const bowlingRuns =
    document.getElementById(
        "bowlingRunDistribution"
    );

if (bowlingRuns) {

    new Chart(bowlingRuns, {

        type: "bar",

        data: {

            labels: [

                "Singles",
                "Doubles",
                "Triples",
                "Fours",
                "Sixes",
                "Extras"

            ],

            datasets: [{

                data: [

                    30,
                    10,
                    1,
                    33,
                    4,
                    22

                ],

                backgroundColor: [

                    "#22c55e",
                    "#60a5fa",
                    "#a855f7",
                    "#0218bf",
                    "#ffd700",
                    "#bf0000"

                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}

const extrasChart =
    document.getElementById(
        "extrasChart"
    );

if (extrasChart) {

    new Chart(extrasChart, {

        type: "pie",

        data: {

            labels: [

                "Wides",
                "No Balls"

            ],

            datasets: [{

                data: [

                    276,
                    52

                ],

                backgroundColor: [

                    "#bf0000",
                    "#0218bf"

                ]

            }]

        },

        options: {

            responsive: true

        }

    });

}

const wicketsByYear =
    document.getElementById(
        "wicketsByYear"
    );

if (wicketsByYear) {

    new Chart(wicketsByYear, {

        type: "bar",

        data: {

            labels: [

                "2021",
                "2022",
                "2023",
                "2024",
                "2025",
                "2026"

            ],

            datasets: [{

                label: "Wickets",

                data: [

                    27,
                    18,
                    21,
                    13,
                    9,
                    5

                ],

                backgroundColor: "#bf0000",

                borderRadius: 6

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}

window.generateJournalAnalysis = function () {

    alert("Generate Clicked");
    
    try {

        const batConfidence =
            document.getElementById(
                "batConfidence"
            ).value;

        const output =
            document.getElementById(
                "analysisOutput"
            );

        output.style.display =
            "block";

        output.innerHTML =
            batConfidence;

    }

    catch(error) {

        alert(error);

    }

};

window.toggleBatting = function () {

    const status =
        document.getElementById(
            "batStatus"
        ).value;

    const section =
        document.getElementById(
            "battingSection"
        );

    if (status === "No") {

        section.style.display =
            "none";

    } else {

        section.style.display =
            "block";

    }

};

window.toggleBowling = function () {

    const status =
        document.getElementById(
            "bowlStatus"
        ).value;

    const section =
        document.getElementById(
            "bowlingSection"
        );

    if (status === "No") {

        section.style.display =
            "none";

    } else {

        section.style.display =
            "block";

    }

};

window.generateJournalAnalysis = function () {

    try {

        const matchDate =
            document.getElementById(
                "matchDate"
            ).value;

        const matchResult =
            document.getElementById(
                "matchResult"
            ).value;

        const batStatus =
            document.getElementById(
                "batStatus"
            ).value;

        const bowlStatus =
            document.getElementById(
                "bowlStatus"
            ).value;

        const batConfidence =
            Number(
                document.getElementById(
                    "batConfidence"
                ).value
            );

        const inningsRating =
            Number(
                document.getElementById(
                    "inningsRating"
                ).value
            );

        const batPosition =
            document.getElementById(
                "batPosition"
            ).value;

        const batRuns =
            document.getElementById(
                "batRuns"
            ).value;

        const batBalls =
            document.getElementById(
                "batBalls"
            ).value;

        const batOutStatus =
            document.getElementById(
                "batOutStatus"
            ).value;

        const batFours =
            document.getElementById(
                "batFours"
            ).value;

        const batSixes =
            document.getElementById(
                "batSixes"
            ).value;

        const dismissalType =
            document.getElementById(
                "dismissalType"
            ).value;

        const batStrength =
            document.getElementById(
                "batStrength"
            ).value;

        const batWeakness =
            document.getElementById(
                "batWeakness"
            ).value;

        const bowlRating =
            Number(
                document.getElementById(
                    "bowlRating"
                ).value
            );

        const bowlOvers =
            document.getElementById(
                "bowlOvers"
            ).value;

        const bowlMaidens =
            document.getElementById(
                "bowlMaidens"
            ).value;

        const bowlRuns =
            document.getElementById(
                "bowlRuns"
            ).value;

        const bowlWickets =
            document.getElementById(
                "bowlWickets"
            ).value;

        const bowlStrength =
            document.getElementById(
                "bowlStrength"
            ).value;

        const bowlWeakness =
            document.getElementById(
                "bowlWeakness"
            ).value;

        const fieldingRating =
            Number(
                document.getElementById(
                    "fieldingRating"
                ).value
            );

        const dropCatch =
            document.getElementById(
                "dropCatch"
            ).value;

        const catchesTaken =
            document.getElementById(
                "catchesTaken"
            ).value;

        const runOuts =
            document.getElementById(
                "runOuts"
            ).value;

        const focusRating =
            Number(
                document.getElementById(
                    "focusRating"
                ).value
            );

        const lessonLearned =
            document.getElementById(
                "lessonLearned"
            ).value;

        let analysis = "";

        analysis += `
            <h2>🏏 Match Performance Report</h2>

            <p><strong>Date:</strong> ${matchDate}</p>

            <p><strong>Result:</strong> ${matchResult}</p>

            <hr>
        `;

    if (batStatus === "Yes") {

            analysis += `
                <h3>Batting Summary</h3>

                <p>
                    Position: ${batPosition}
                </p>

                <p>
                    Score:
                    ${batRuns}
                    (${batBalls})
                </p>

                <p>
                    Status:
                    ${batOutStatus}
                </p>

                <p>
                    Boundaries:
                    ${batFours} fours,
                    ${batSixes} sixes
                </p>
            `;

            if (inningsRating >= 8) {

                analysis +=
                    "<p>✅ Excellent batting performance.</p>";

            }

            else if (inningsRating >= 5) {

                analysis +=
                    "<p>🟡 Solid batting performance.</p>";

            }

            else {

                analysis +=
                    "<p>🔴 Batting performance needs improvement.</p>";

            }

            analysis += `
                <p>
                    <strong>Strength:</strong>
                    ${batStrength}
                </p>

                <p>
                    <strong>Improvement Area:</strong>
                    ${batWeakness}
                </p>
            `;
        }

        if (bowlStatus === "Yes") {

            analysis += `
                <hr>

                <h3>Bowling Summary</h3>

                <p>
                    Figures:
                    ${bowlOvers}-${bowlMaidens}-${bowlRuns}-${bowlWickets}
                </p>
            `;

            if (bowlRating >= 8) {

                analysis +=
                    "<p>✅ Excellent bowling performance.</p>";

            }

            else if (bowlRating >= 5) {

                analysis +=
                    "<p>🟡 Solid bowling performance.</p>";

            }

            else {

                analysis +=
                    "<p>🔴 Bowling performance needs improvement.</p>";

            }

            analysis += `
                <p>
                    <strong>Strength:</strong>
                    ${bowlStrength}
                </p>

                <p>
                    <strong>Improvement Area:</strong>
                    ${bowlWeakness}
                </p>
            `;
        }

        analysis += `
            <hr>

            <h3>Fielding Summary</h3>

            <p>
                Fielding Rating:
                ${fieldingRating}/10
            </p>

            <p>
                Dropped Catch/Misfield:
                ${dropCatch}
            </p>

            <p>
                Catches Taken:
                ${catchesTaken}
            </p>

            <p>
                Run Outs:
                ${runOuts}
            </p>
        `;

        if (focusRating >= 8) {

            analysis +=
                "<p>✅ Excellent concentration and match awareness.</p>";

        }

        else if (focusRating >= 5) {

            analysis +=
                "<p>🟡 Reasonable concentration levels.</p>";

        }

        else {

            analysis +=
                "<p>🔴 Focus was below expected standards.</p>";

        }

        analysis += `
            <hr>

            <h3>Key Learning</h3>

            <p>
                ${lessonLearned}
            </p>
        `;

        const output =
            document.getElementById(
                "analysisOutput"
            );

        output.style.display =
            "block";

const report = {

    date: matchDate,

    result: matchResult,

    report: analysis

};

let history =
    JSON.parse(
        localStorage.getItem(
            "matchHistory"
        )
    ) || [];

if (
    !matchDate ||
    analysis.trim() === ""
) {
    return;
}

history.push(report);

localStorage.setItem(
    "matchHistory",
    JSON.stringify(history)
);

loadMatchHistory();




        output.innerHTML =
            analysis;

    }

    catch(error) {

        alert(error);

    }

};
function loadMatchHistory() {


    const historyReport =
    document.getElementById(
        "historyReport"
    );

historyReport.style.display =
    "none";


    const historyDiv =
        document.getElementById(
            "matchHistory"
        );

    let history =
        JSON.parse(
            localStorage.getItem(
                "matchHistory"
            )
        ) || [];

    if (history.length === 0) {

        historyDiv.innerHTML =
            "<p>No match reports yet.</p>";

        return;

    }

   historyDiv.innerHTML =
    history.map(match => `

        <div class="analysis-card">

          <h3>
    ${match.date || "Unknown Date"}
</h3>


            <p>
                Result:
                ${match.result}
            </p>

            <button
                onclick='viewMatchReport(
                    "${match.date}"
                )'>

                View Report

            </button>

            <button
                onclick='deleteMatch(
                    "${match.date}"
                )'
                style="
                    background:#bf0000;
                    color:white;
                    margin-left:10px;
                ">

                Delete

            </button>

        </div>

    `).join("");

}

window.viewMatchReport =
function(date) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "matchHistory"
            )
        ) || [];

    const report =
        history.find(
            match =>
            match.date === date
        );

    const historyReport =
        document.getElementById(
            "historyReport"
        );

    historyReport.style.display =
        "block";

    historyReport.innerHTML =
        report.report;

    historyReport.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

};

loadMatchHistory();

document.getElementById(
    "analysisOutput"
).style.display = "none";

window.deleteMatch =
function(date) {

    const confirmDelete =
        confirm(
            "Delete this match report?"
        );

    if (!confirmDelete) {

        return;

    }

    let history =
        JSON.parse(
            localStorage.getItem(
                "matchHistory"
            )
        ) || [];

    history =
        history.filter(
            match =>
            match.date !== date
        );


    localStorage.setItem(
        "matchHistory",
        JSON.stringify(history)
    );

    alert("Saved!");

    loadMatchHistory();

};

window.generateFitnessPlan =


function () {

    const height =
        Number(
            document.getElementById(
                "fitnessHeight"
            ).value
        );

    const weight =
        Number(
            document.getElementById(
                "fitnessWeight"
            ).value
        );

    const goal =
        document.getElementById(
            "fitnessGoal"
        ).value;

    const trainingDays =
        document.getElementById(
            "trainingDays"
        ).value;

    const sprintTime =
        Number(
            document.getElementById(
                "sprintTime"
            ).value
        );

    const yoyo =
        Number(
            document.getElementById(
                "yoyoScore"
            ).value
        );

    const jump =
        Number(
            document.getElementById(
                "verticalJump"
            ).value
        );

    const pushUps =
        Number(
            document.getElementById(
                "pushUps"
            ).value
        );

    const plank =
        Number(
            document.getElementById(
                "plankTime"
            ).value
        );

    let bmi =
        weight /
        ((height / 100) ** 2);

    let bmiStatus = "";

    if (bmi < 18.5) {

        bmiStatus = "Underweight";

    }

    else if (bmi < 25) {

        bmiStatus = "Healthy Range";

    }

    else if (bmi < 30) {

        bmiStatus = "Overweight";

    }

    else {

        bmiStatus = "Obese";

    }

    let strengths = "";
    let improvements = "";

    if (sprintTime <= 5.5) {

        strengths +=
            "<li>Excellent sprint speed.</li>";

    }

    else {

        improvements +=
            "<li>Improve sprint acceleration.</li>";

    }

    if (jump >= 50) {

        strengths +=
            "<li>Strong lower-body power.</li>";

    }

    else {

        improvements +=
            "<li>Develop explosive leg power.</li>";

    }

    if (pushUps >= 30) {

        strengths +=
            "<li>Good upper-body strength.</li>";

    }

    else {

        improvements +=
            "<li>Build upper-body strength.</li>";

    }

    if (plank >= 120) {

        strengths +=
            "<li>Excellent core stability.</li>";

    }

    else {

        improvements +=
            "<li>Increase core endurance.</li>";

    }

   let sessions = [];

   if (goal === "Fast Bowling") {

    sessions = [

        "Sprint Training",

        "Leg Strength",

        "Agility & Speed",

        "Bowling Conditioning",

        "Core Stability",

        "Power Development",

        "Endurance"

    ];

}

else if (goal === "Batting") {

    sessions = [

        "Sprint Training",

        "Core Strength",

        "Agility Training",

        "Reaction Work",

        "Endurance Session",

        "Mobility Training",

        "Power Development"

    ];

}

else if (goal === "Spin Bowling") {

    sessions = [

        "Mobility Training",

        "Core Strength",

        "Balance & Stability",

        "Bowling Conditioning",

        "Agility Training",

        "Endurance",

        "Recovery Training"

    ];

}

else if (goal === "Wicketkeeping") {

    sessions = [

        "Agility Drills",

        "Core Training",

        "Reaction Training",

        "Explosive Movement",

        "Endurance Work",

        "Mobility Work",

        "Sprint Training"

    ];

}

else if (
    goal ===
    "Fast-Bowling All-Rounder"
) {

    sessions = [

        "Sprint Training",

        "Upper Body Strength",

        "Batting Conditioning",

        "Bowling Conditioning",

        "Core Stability",

        "Power Development",

        "Endurance"

    ];

}

else {

    sessions = [

        "Core Stability",

        "Strength Training",

        "Agility Training",

        "Bowling Conditioning",

        "Batting Conditioning",

        "Mobility Work",

        "Endurance"

    ];

}

const days = [

    "Monday",

    "Tuesday",

    "Wednesday",

    "Thursday",

    "Friday",

    "Saturday",

    "Sunday"

];

let plan =
    "<ul>";

const schedules = {

    1: [0],

    2: [0, 3],

    3: [0, 2, 4],

    4: [0, 2, 4, 6],

    5: [0, 1, 3, 5, 6],

    6: [0, 1, 2, 4, 5, 6],

    7: [0, 1, 2, 3, 4, 5, 6]

};

const activeDays =
    schedules[
        Number(trainingDays)
    ] || [];

    let sessionIndex = 0;

    for (
    let i = 0;
    i < 7;
    i++
) {

    if (
        activeDays.includes(i)
    ) {

        plan += `

            <li>

                <strong>
                ${days[i]}
                </strong> -

                ${sessions[sessionIndex]}

            </li>

        `;

        sessionIndex++;

    }

    else {

        plan += `

            <li>

                <strong>
                ${days[i]}
                </strong> -

                Recovery /
                Practice /
                Match

            </li>

        `;

    }

}



plan +=
    "</ul>";




    const output =
        document.getElementById(
            "fitnessOutput"
        );

    output.style.display =
        "block";

    output.innerHTML = `

        <h2>
            Personal Fitness Report
        </h2>

        <p>
            <strong>BMI:</strong>
            ${bmi.toFixed(1)}
            (${bmiStatus})
        </p>

        <p>
            <strong>Primary Goal:</strong>
            ${goal}
        </p>

        <p>
            <strong>Training Days:</strong>
            ${trainingDays}
        </p>

        <hr>

        <h3>Strengths</h3>

        <ul>
            ${strengths}
        </ul>

        <h3>Areas For Improvement</h3>

        <ul>
            ${improvements}
        </ul>

        <h3>Recommended Training Plan</h3>

        ${plan}

    `;

localStorage.setItem(
    "fitnessPlan",
    output.innerHTML
);

saveFitnessProfile();

document.getElementById(
    "fitnessForm"
).style.display = "none";

loadFitnessProfile();

};

window.saveFitnessProfile =
function() {

    const profile = {

        age:
        document.getElementById(
            "fitnessAge"
        ).value,

        height:
        document.getElementById(
            "fitnessHeight"
        ).value,

        weight:
        document.getElementById(
            "fitnessWeight"
        ).value,

        goal:
        document.getElementById(
            "fitnessGoal"
        ).value,

        trainingDays:
        document.getElementById(
            "trainingDays"
        ).value

    };

    localStorage.setItem(

        "fitnessProfile",

        JSON.stringify(profile)

    );

    loadFitnessProfile();

    document.getElementById(
    "fitnessForm"
).style.display =
    "none";

};

function loadFitnessProfile() {

    const profile =

        JSON.parse(

            localStorage.getItem(
                "fitnessProfile"
            )

        );

    if (!profile) {

        document.getElementById(
    "resetFitnessButton"
).style.display =
    "none";

return;

    }

    const profileDiv =

        document.getElementById(
            "fitnessProfile"
        );

    profileDiv.style.display =
        "block";

    profileDiv.innerHTML = `

        <h2>
            Fitness Profile
        </h2>

        <p>
            Age:
            ${profile.age}
        </p>

        <p>
            Height:
            ${profile.height} cm
        </p>

        <p>
            Weight:
            ${profile.weight} kg
        </p>

        <p>
            Goal:
            ${profile.goal}
        </p>

        <p>
            Training Days:
            ${profile.trainingDays}
        </p>

    `;

profileDiv.style.display =
    "block";

document.getElementById(
    "resetFitnessButton"
).style.display =
    "inline-block";

}

loadFitnessProfile();

function initializeFitnessPage() {

    const profile =

        localStorage.getItem(
            "fitnessProfile"
        );

    const plan =

        localStorage.getItem(
            "fitnessPlan"
        );

    if (profile && plan) {

        document.getElementById(
            "fitnessForm"
        ).style.display =
            "none";

            document.getElementById(
    "resetFitnessButton"
).style.display =
    "inline-block";

        document.getElementById(
            "fitnessProfile"
        ).style.display =
            "block";

        document.getElementById(
            "fitnessOutput"
        ).style.display =
            "block";

        document.getElementById(
            "fitnessOutput"
        ).innerHTML =
            plan;

        loadFitnessProfile();

    }

    else {

        document.getElementById(
            "fitnessForm"
        ).style.display =
            "block";

    }

}

initializeFitnessPage();

window.resetFitnessProfile =
function() {

    localStorage.removeItem(
        "fitnessProfile"
    );

    localStorage.removeItem(
        "fitnessPlan"
    );

    document.getElementById(
    "resetFitnessButton"
).style.display =
    "none";

    location.reload();

};

window.saveNutritionTracker =
function() {

    const nutrition = {

        date:
        new Date()
        .toDateString(),

        water:
        document.getElementById(
            "waterInput"
        ).value,

        protein:
        document.getElementById(
            "proteinInput"
        ).value,

        calories:
        document.getElementById(
            "calorieInput"
        ).value

    };

    localStorage.setItem(

        "dailyNutrition",

        JSON.stringify(
            nutrition
        )

    );

};

function loadNutritionTracker() {

    const saved =

        JSON.parse(

            localStorage.getItem(
                "dailyNutrition"
            )

        );

    if (!saved) {

        return;

    }

    document.getElementById(
        "waterInput"
    ).value =
        saved.water;

    document.getElementById(
        "proteinInput"
    ).value =
        saved.protein;

    document.getElementById(
        "calorieInput"
    ).value =
        saved.calories;

}

function checkNutritionDate() {

    const saved =

        JSON.parse(

            localStorage.getItem(
                "dailyNutrition"
            )

        );

    if (!saved) {

        return;

    }

    const today =

        new Date()
        .toDateString();

    if (
        saved.date !== today
    ) {

        localStorage.removeItem(
            "dailyNutrition"
        );

    }

}

checkNutritionDate();

loadNutritionTracker();

window.generateDietPlan =
function() {

    const dietType =
        document.getElementById(
            "dietType"
        ).value;

    const fitnessProfile =
        JSON.parse(
            localStorage.getItem(
                "fitnessProfile"
            )
        );

    if (!fitnessProfile) {

        alert(
            "Please create a Fitness Profile first."
        );

        return;

    }

    const goal =
        fitnessProfile.goal;

    let breakfast = "";
    let lunch = "";
    let snack = "";
    let dinner = "";
    let calories = "";

    if (dietType === "Vegetarian") {

        breakfast =
            "Oats, Milk, Banana";

        lunch =
            "Rice, Dal, Mixed Vegetables";

        snack =
            "Greek Yogurt and Fruit";

        dinner =
            "Chapati, Paneer, Vegetables";

    }

    else if (
        dietType ===
        "Vegan"
    ) {

        breakfast =
            "Oats, Almond Milk, Banana";

        lunch =
            "Rice, Lentils, Vegetables";

        snack =
            "Fruit and Nuts";

        dinner =
            "Chapati, Tofu, Vegetables";

    }

    else {

        breakfast =
            "Oats, Eggs, Banana";

        lunch =
            "Rice, Chicken, Vegetables";

        snack =
            "Fruit and Protein Shake";

        dinner =
            "Chapati, Chicken, Vegetables";

    }

    if (
        goal ===
        "Fast Bowling"
    ) {

        calories =
            "3200 kcal";

    }

    else if (
        goal ===
        "Fast-Bowling All-Rounder"
    ) {

        calories =
            "3500 kcal";

    }

    else if (
        goal ===
        "Wicketkeeping"
    ) {

        calories =
            "2700 kcal";

    }

    else {

        calories =
            "2800 kcal";

    }

    const profileDiv =
        document.getElementById(
            "dietProfile"
        );

    profileDiv.style.display =
        "block";

    profileDiv.innerHTML = `

        <h3>Diet Profile</h3>

        <p>

            <strong>
            Diet Type:
            </strong>

            ${dietType}

        </p>

        <p>

            <strong>
            Cricket Role:
            </strong>

            ${goal}

        </p>

        <p>

            <strong>
            Recommended Calories:
            </strong>

            ${calories}

        </p>

    `;

    const output =
        document.getElementById(
            "dietOutput"
        );

    output.style.display =
        "block";

    output.innerHTML = `

        <h2>
            Cricket Diet Plan
        </h2>

        <h3>
            Breakfast
        </h3>

        <p>
            ${breakfast}
        </p>

        <h3>
            Lunch
        </h3>

        <p>
            ${lunch}
        </p>

        <h3>
            Snack
        </h3>

        <p>
            ${snack}
        </p>

        <h3>
            Dinner
        </h3>

        <p>
            ${dinner}
        </p>

        <hr>

        <h3>
            Match Nutrition
        </h3>

        <p>

            <strong>
            Pre-Match:
            </strong>

            Banana, Oats,
            Sports Drink

        </p>

        <p>

            <strong>
            Post-Match:
            </strong>

            Protein Shake,
            Milk, Fruit

        </p>

    `;

    localStorage.setItem(

        "dietProfile",

        JSON.stringify({

            dietType

        })

    );

    localStorage.setItem(

        "dietPlan",

        output.innerHTML

    );

    document.getElementById(
        "dietForm"
    ).style.display =
        "none";

    document.getElementById(
        "resetDietButton"
    ).style.display =
        "inline-block";

};

function initializeDietPage() {

    const profile =
        localStorage.getItem(
            "dietProfile"
        );

    const plan =
        localStorage.getItem(
            "dietPlan"
        );

    if (
        profile &&
        plan
    ) {

        document.getElementById(
            "dietForm"
        ).style.display =
            "none";

        document.getElementById(
            "dietOutput"
        ).style.display =
            "block";

        document.getElementById(
            "dietOutput"
        ).innerHTML =
            plan;

        document.getElementById(
            "resetDietButton"
        ).style.display =
            "inline-block";

    }

}

window.resetDietProfile =
function() {

    localStorage.removeItem(
        "dietProfile"
    );

    localStorage.removeItem(
        "dietPlan"
    );

    location.reload();

};

initializeDietPage();

window.saveProfile =
async function() {

    const fullName =
        document.getElementById(
            "fullName"
        ).value;

    const {
        data: { user }
    } =
    await supabase.auth.getUser();

    const { error } =
    await supabase
        .from("profiles")
        .upsert({

            id: user.id,

            full_name:
                fullName

        });

    if (error) {

        alert(
            error.message
        );

        return;

    }

    alert(
        "Profile saved!"
    );

};

async function loadProfile() {

document.getElementById(
    "userDisplayName"
).textContent =
    data.full_name;

    
    const {
        data: { user }
    } =
    await supabase.auth.getUser();

    if (!user) {

        return;

    }

    const {
        data,
        error
    } =
    await supabase
        .from("profiles")
        .select("*")
        .eq(
            "id",
            user.id
        )
        .single();

    if (
        error ||
        !data
    ) {

        return;

    }

    document.getElementById(
        "fullName"
    ).value =
        data.full_name;

}

