//Access the input box value.
let userInput = document.getElementById("user-input");

//Access the results-div.
const results = document.getElementById("results-div");
const resultMsg = document.getElementById("result-msg");

//Access the dial keys.
const key1 = document.getElementById("key1");
const key2 = document.getElementById("key2");
const key3 = document.getElementById("key3");
const key4 = document.getElementById("key4");
const key5 = document.getElementById("key5");
const key6 = document.getElementById("key6");
const key7 = document.getElementById("key7");
const key8 = document.getElementById("key8");
const key9 = document.getElementById("key9");
const keyStar = document.getElementById("keyStar");
const key0 = document.getElementById("key0");
const keyPound = document.getElementById("keyPound");

//Access the check-btn, delete-btn, and clear-btn.
const checkBtn = document.getElementById("check-btn");
const delBtn = document.getElementById("delete-btn");
const clearBtn = document.getElementById("clear-btn");

//Update userInput when button in keypad is pressed.
function updateInput(key) {
    let input = userInput.value;
    let newInput = key.value;
    input += newInput;
    userInput.value += newInput;
};

key1.addEventListener("click", (e) => updateInput(key1));
key2.addEventListener("click", (e) => updateInput(key2));
key3.addEventListener("click", (e) => updateInput(key3));
key4.addEventListener("click", (e) => updateInput(key4));
key5.addEventListener("click", (e) => updateInput(key5));
key6.addEventListener("click", (e) => updateInput(key6));
key7.addEventListener("click", (e) => updateInput(key7));
key8.addEventListener("click", (e) => updateInput(key8));
key9.addEventListener("click", (e) => updateInput(key9));
keyStar.addEventListener("click", (e) => updateInput(keyStar));
key0.addEventListener("click", (e) => updateInput(key0));
keyPound.addEventListener("click", (e) => updateInput(keyPound));

//Clear one character when clear-btn is pressed.
function delInput() {
    let input = userInput.value;
    let delInput = input.substring(0, input.length - 1);
    input = delInput;
    userInput.value = delInput;
}

delBtn.addEventListener("click", (e) => delInput());

//Check if input is valid when check-btn is pressed.
function checkInput() {
    let input = userInput.value;
    const regex = /^1?\s?(\(\d{3}\)|\d{3})\s?-?\d{3}\s?-?\d{4}$/;
    //If there is no value in #user-input, alert "Please provide a phone number"
    //Check if input contains acceptable US phone number formats using Regex.
    if (input === ""){
        alert("Please provide a phone number.");
    } else if (regex.test(input) === true) {
        //If valid, output message "Valid US number:" + input
        results.innerHTML = `<p>Valid US number: ${input}</p>`
        results.style.display = "block";
    } else {
        //If invalid, output message "Invalid US number:" + input
        results.innerHTML = `<p>Invalid US number: ${input}</p>`
        results.style.display = "block";
    }
}

checkBtn.addEventListener("click", (e) => {
    checkInput();
});

//Remove the contents of #results-div when the #clear-btn is clicked.
clearBtn.addEventListener("click", (e) => {
    results.innerHTML = ``;
    results.style.display = "none";
    userInput.value = "";
})