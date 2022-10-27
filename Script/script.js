let counter = 0;
let individualError = [0,0,0,0,0,0];

function initialize() {
  let theForm = document.forms[0]; //document.getElementById("example-form");
  console.log(theForm.name, theForm)
  theForm.addEventListener("submit", formSubmitHandler);
}

async function formSubmitHandler(event) {
	event.preventDefault();

  let thankyou = ""
  let validSubmission = 0;
  let errorCode = 0;
	const form = event.currentTarget;
	const url = form.action;
  if(form.name == "submitScoresIndividual"){
    thankyou = "thankyouIndividual.html"
    validSubmission = 6;
    errorCode = 6;
  } else {
    thankyou = "thankyouOverall.html"
    validSubmission = 1;
    errorCode = 1;
  }
  console.log(form)
  console.log(url)

  if(counter == validSubmission){
    try {
      const formData = new FormData(document.querySelector("form"));
      const responseData = await fetch(url, { method: 'POST', body: formData})
        .then(response => {console.log('Success! ', response);
          window.location.assign(thankyou)});
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  } else {
    showError(errorCode);
  }

}

function showError(errorCode){
  let errorMsg = "Error: ";
  let errorElement = "";
  if(errorCode == 6){
    errorMsg = errorMsg + "Individual Ratings not complete!";
    displayErrorMsgs();
  } else {
    errorMsg = errorMsg + "Overall Ratings not complete!"
    errorElement = "overall_Rating";
    let feedbackElement = document.getElementById("feedback_" + errorElement);
    feedbackElement.innerText += errorMsg;
  }
  console.log(errorMsg);
  console.log(errorElement);
  console.log(errorMsg);
}

function showHide() {
  showSliderThumb('overall_Rating')
  var showHide = document.getElementById("showHide");
  console.log(showHide.style.display)
  //if (showHide.style.display === "none") {
    showHide.style.display = "block";
  //} else {
  //  showHide.style.display = "none";
  //}
  console.log(showHide.style.display)
  
} 

function displayErrorMsgs()
{
  console.log(individualError);
  let errorElement = "individual_Rating";
  let errorMsg = "Error: Please click on the bar to provide a score!";
  let sum = 0;
  for (let index = 0; index < 6; index++) {
    let val = index + 1;
    console.log(val.toString());
    let errorName = errorElement + val.toString();
    console.log(errorName);
    let currentError = "feedback_" + errorName;
    let feedbackElement = document.getElementById(currentError);
    if(individualError[index] == 0){
      feedbackElement.innerText = errorMsg;
    }
    else {
      feedbackElement.innerText = "";
    }
  }
  console.log(individualError);
  return false;
}

const rangeInputs = document.querySelectorAll('input[type="range"]')
const numberInput = document.querySelector('input[type="number"]')

function handleInputChange(event) {
  showSliderThumb(event)
  let target =  document.querySelector('input[type=range]'); // event.target.type
  //let input = event.target.

  const min = target.min
  const max = target.max
  const val = target.value
  alert(val);
  
  //target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

function showSliderThumb(theId){
  let userInput = document.getElementById(theId)//document.querySelector('input[type=range]', '::-webkit-slider-thumb');
  // let scores = ["scoreQ1","scoreQ2","scoreQ3","scoreQ4","scoreQ5","scoreQ6"]
  let val =  userInput.value;
  let rangeNum = parseInt(userInput.name.slice(-1))-1
  console.log(val)
  if(userInput.classList.contains("disabled")){
    // userInput.style.setProperty('--OpValue', '100')
    userInput.classList.remove("disabled")
    userInput.classList.add("enabled")
    if(theId.includes("overall")){
      console.log(theId)
      let feedbackElement = document.getElementById("feedback_overall_Rating");
      feedbackElement.innerText = "";
    } else {
      individualError[rangeNum] = 1;
      rangeNum += 1;
      let feedbackElement = document.getElementById("feedback_individual_Rating"+rangeNum.toString());
      feedbackElement.innerText = "";  
    }
    counter++;
    // userInput.value = val
  }
  console.log(userInput.name)
  console.log(userInput.value)
  console.log(counter)
  console.log(userInput.name.slice(-1))
  console.log("showSliderThumb")
}

// Connect event listeners and start the application when the page loads
window.addEventListener("load", initialize);
