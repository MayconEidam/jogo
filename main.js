var questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília"],
        answer: "Brasília"
    },
    {
        question: "Quem escreveu 'Dom Quixote'?",
        options: ["Miguel de Cervantes", "William Shakespeare", "Jorge Luis Borges"],
        answer: "Miguel de Cervantes"
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Júpiter", "Saturno", "Terra"],
        answer: "Júpiter"
    }
];

var currentQuestion = 0;
var score = 0;

function loadQuestion() {
    var q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;
    var optionsHTML = "";
    for (var i = 0; i < q.options.length; i++) {
        optionsHTML += '<div class="option"><input type="radio" name="answer" id="option' + (i+1) + '"><label for="option' + (i+1) + '">' + q.options[i] + '</label></div>';
    }
    document.getElementById("options").innerHTML = optionsHTML;
}

function checkAnswer() {
    var selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        if (selectedOption.nextSibling.textContent === questions[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            alert("Fim do Jogo! Sua pontuação: " + score + "/" + questions.length);
            currentQuestion = 0;
            score = 0;
            loadQuestion();
        }
    } else {
        alert("Por favor, selecione uma opção.");
    }
}

window.onload = function() {
    loadQuestion();
};
