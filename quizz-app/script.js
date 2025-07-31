// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("option").children;
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

// Emoji mapping
const emojiMap = {
    0: "🤮",
    1: "😞",
    2: "😐",
    3: "🙂",
    4: "😎",
    5: "🎉"
};

// Question bank (30 total - sample shown here, you must add the rest)
const questionBank = [
    { question: "What gas do plants absorb?", options: ["O2", "N2", "CO2", "H2"], correctIndex: 2 },
    { question: "Chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Go"], correctIndex: 0 },
    { question: "Cell part with DNA?", options: ["Nucleus", "Cytoplasm", "Membrane", "Ribosome"], correctIndex: 0 },
    { question: "Square root of 144?", options: ["11", "12", "13", "14"], correctIndex: 1 },
    { question: "Sides in hexagon?", options: ["5", "6", "7", "8"], correctIndex: 1 },
    { question: "15% of 200?", options: ["20", "25", "30", "35"], correctIndex: 2 },
    { question: "Next in 2,4,8,16?", options: ["18", "24", "32", "30"], correctIndex: 2 },
    { question: "Some flowers fade. Roses are flowers. Then?", options: ["All roses fade", "Some roses fade", "Some flowers don't fade", "All flowers fade"], correctIndex: 2 },
    { question: "John’s sister is my brother’s wife. John is?", options: ["BIL", "Cousin", "Friend", "Uncle"], correctIndex: 0 },
    { question: "Greek god of underworld?", options: ["Zeus", "Ares", "Hades", "Hermes"], correctIndex: 2 },
    { question: "Norse god of thunder?", options: ["Odin", "Thor", "Loki", "Freyr"], correctIndex: 1 },
    { question: "Egyptian sun god?", options: ["Ra", "Osiris", "Anubis", "Set"], correctIndex: 0 },
    { question: "Roman goddess of love?", options: ["Juno", "Venus", "Minerva", "Diana"], correctIndex: 1 },
    { question: "Hero who killed Minotaur?", options: ["Achilles", "Theseus", "Perseus", "Hercules"], correctIndex: 1 },
    { question: "Red planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctIndex: 1 },
    { question: "Bones in human body?", options: ["206", "201", "210", "198"], correctIndex: 0 },
    { question: "Next prime after 7?", options: ["9", "11", "13", "10"], correctIndex: 1 },
    { question: "Norse gods reside in?", options: ["Midgard", "Helheim", "Asgard", "Jotunheim"], correctIndex: 2 },
    { question: "Solve 8 x (3 + 2)", options: ["40", "24", "20", "32"], correctIndex: 0 },
    { question: "1 light year = ?", options: ["9.46e+12 km", "1e+6 km", "300k km", "150m km"], correctIndex: 0 },
    // Add 10 more unique ones following the structure
];

// Helper to shuffle an array
function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// Game state
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;

// Start quiz
function startQuiz() {
    selectedQuestions = shuffleArray([...questionBank]).slice(0, 5);
    currentIndex = 0;
    score = 0;
    nextBtn.style.display = "inline-block";
    resultEl.style.display = "none";
    nextBtn.innerText = "Next";
    showQuestion();
}

// Show current question
function showQuestion() {
    const q = selectedQuestions[currentIndex];
    questionEl.textContent = `Q${currentIndex + 1}: ${q.question}`;

    Array.from(optionsEl).forEach((btn, index) => {
        btn.textContent = q.options[index];
        btn.className = "option-btn";
        btn.disabled = false;
        btn.onclick = () => handleAnswer(index, btn, q.correctIndex);
    });
}

// Handle answer click
function handleAnswer(selectedIndex, btn, correctIndex) {
    if (selectedIndex === correctIndex) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        optionsEl[correctIndex].classList.add("correct");
    }

    Array.from(optionsEl).forEach(b => b.disabled = true);
}

// Handle next button
nextBtn.addEventListener("click", () => {
    if (currentIndex < selectedQuestions.length - 1) {
        currentIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
});

// Show result
function endQuiz() {
    questionEl.textContent = "Quiz Completed!";
    document.getElementById("option").innerHTML = "";
    nextBtn.style.display = "none";
    resultEl.style.display = "block";

    const emoji = emojiMap[score] || "";
    scoreEl.textContent = `${score} / 5 ${emoji}`;
}

// Start on load
window.onload = startQuiz;
