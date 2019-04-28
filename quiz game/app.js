
(() => {

    function Question(question, answers, correct){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    
    Question.prototype.displayQuestion = function () {
        console.log(this.question);
        for(let i = 0; i < this.answers.length; i++){
            console.log(`${i}: ${this.answers[i]}`);
        }
    }
    
    Question.prototype.checkAnswer = function (ans, callback) {
        let sc;
        if(parseInt(ans) === this.correct){
            console.log(`Correct answer!`);
            sc = callback(true);
        }
        else{
            console.log(`Wrong answer! Try again!`);
            sc = callback(false);
        }
        this.displayAnswer(sc);
    }

    Question.prototype.displayAnswer = function (score) {
        console.log(`Your current is: ${score}`);
        console.log(`--------------------`);
        console.log(``);
    }
    
    const q1 = new Question(
        `What is the preferred programming language?`,
        ['PHP', 'JavaScript', 'C++', 'Java', 'Python'],
        1
    );
    const q2 = new Question(
        `Is JavaScript a client side programming language?`,
        ['Yes', 'No'],
        0
    );
    const q3 = new Question(
        `Is JavaScript a server side programming language?`,
        ['Yes', 'No'],
        1
    );
    const q4 = new Question(
        `What is the platform used to learn JavaScript?`,
        ['W3school', 'E-learning Techadviser', 'Udemy', 'CodeAcademy'],
        2
    );
    const q5 = new Question(
        `With what programming language was this game written?`,
        ['C#', 'PHP', 'Action Script', 'JavaScript'],
        3
    );
    
    const questions = [q1, q2, q3, q4, q5];

    function score(){
        let sc = 0;
        return correct => {
            if(correct){
                sc++;
            }
            return sc;
        }
    }
    
    const keepScore = score();

    function nextQuestion(){
        const nr = Math.floor(Math.random() * questions.length);
    
        const currentQuestion = questions[nr];
    
        currentQuestion.displayQuestion();
    
        const answer = prompt(`Please select the correct answer, or write exit to close the window.`);
    
        currentQuestion.checkAnswer(answer, keepScore);
    
        if(answer !== 'exit') nextQuestion();
    }
    
    nextQuestion();

})();
