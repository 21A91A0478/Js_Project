const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputField = document.querySelector("input")
const timeText = document.querySelector(".time b");

let correctWord, timer;

const initTimer = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerHTML = maxTime;
        }
        clearInterval(timer);
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();

    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    let len = wordArray.length;
    for (let i = len - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLocaleLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    // console.log(randomObj);
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    // console.log(userWord);
    if (!userWord) {
        return alert("Please enter a word");
    }
    if (userWord != correctWord) {
        return alert(`Oops! ${userWord} is not a correct word`);
    }
    else {
        alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
        initGame();
        return;
    }
}
 
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);