var el = x => document.getElementById(x);
const DOGS = ["Corgi", "Pug", "Husky"];

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);

  // This is to reset the label and button analyze. However, the code should not be here
  initAnalyzeButton();
}

function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) {
    alert("Please select a file to analyze!");
    return 0;
  }

  toggleResultUnderline(false);
  el("analyze-button").innerHTML = "Analyzing...";

  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      var results = generateLotteryDogs();
      results.push(response["result"]);
      showResults(results);
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}


// generate loading dogs before showing the result
function generateLotteryDogs() {
  // generate random lottery dogs (from 7 to 30) 
  var nPreResults = Math.floor(Math.random() * 30) + 7;  
  var lotteryDogs = Array(nPreResults);
  for (i = 0; i < nPreResults; i ++) {
    var dogIndex = Math.floor(Math.random() * 3);
    lotteryDogs[i] = DOGS[dogIndex];
  }
  return lotteryDogs;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showResults(results) {
  var nLoading = 0;
  while (nLoading < results.length) {
    console.log(results[nLoading]);
    el("result-label").innerHTML = results[nLoading];
    await sleep(50 * (nLoading % 4));
    nLoading++;
  }
  toggleResultUnderline(true);
}

function toggleResultUnderline(isOn) {
  if (isOn) {
    el("result-label").classList.add("underline");
  } else {
    el("result-label").classList.remove("underline");  
  }
}

function initAnalyzeButton() {
  el("result-label").innerHTML = "";
  el("analyze-button").innerHTML = "Analyze";
}