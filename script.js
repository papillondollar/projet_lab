//Sélection des éléments
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".button .quit");
const continue_btn = info_box.querySelector(".button .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .time_sec");

//au click du bouton commencez le quiz
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");//afficher la classe info_box
}

//au clic du bouton quiter
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");//cacher la classe info_box
}

//au click du bouton continuer
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");//montrer la classe quiz_box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
}



let que_count = 0;
let que_number = 1;
let counter;
const next_btn = quiz_box.querySelector(".next_btn");

//au clic du bouton next
next_btn.onclick = () =>{
    if(que_count < questions.length - 1){
        que_count++;
        que_number++;
        showQuestions(que_count);
        queCounter(que_number);
    }else{
        console.log("fin");
    }
}
//obtenir la liste de questios et les options du quiz
function showQuestions(index){
    const que_text = document.querySelector(".question");
    
    let que_tag = '<span>'+ questions[index].number +". "+ questions[index].question + '</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                    +'<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                    +'<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                    +'<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelector(".option");
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", optionSelected(this));
    }

    let tickIcon = '<div class="icon tick"><i class="fa fa-check" aria-hidden="true"></i></div>'
    let crossIcon = '<div class="icon tick"><i class="fa fa-check" aria-hidden="true"></i></div>'


    //Sélection des réponses
    function optionSelected(answer){
        let userAns = answer.textContent;
        let correctAns = questions[que_count].answer;
        let allOptions = option_list.children.length;
        console.log(correctAns)
        if(userAns == correctAns){
            answer.classList.add("correct");
            console.log("reponse correcte");
            answer.insertAdjacentHTML("beforeend", tickIcon);
        }else{
            answer.classList.add("incorrect");
            answer.insertAdjacentHTML("beforeend", crossIcon);

            for(let i=0; i< allOptions; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
        }

        for(let i=0; i< allOptions; i++){
            option_list.children[i].classList.add("disabled");
        }
    }
}

//pour le chrono
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
    }

}

//pour le décompt de la question sur le nombre total de questions
function queCounter(index){
    const botom_ques_counter = document.querySelector(".total_question");
    let totalQuesCountTag = '<span><p>'+ index + '</p>sur <p>' + questions.length + '</p>Questions</span>';
    botom_ques_counter.innerHTML = totalQuesCountTag;
}
