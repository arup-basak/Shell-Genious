require('dotenv').config();

const prompt = require('prompt-sync')();
const figlet = require("figlet");
const clear = require("clear");

clear(); // Clear Screen

const API_ENDPOINT = process.env.API_ENDPOINT
const TOKEN = process.env.TOKEN

const welcome = "Welcome to ShellGenius";


figlet(welcome, (err, data) => {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  import("boxen").then((boxen) => {
    console.log(boxen.default(data, { padding: 1 }));

    askQuestion();

  }).catch((error) => {
    console.error("Error occurred while importing 'boxen':", error);
  });
});

const askQuestion = () => {
  const question = prompt("Type Your Question Here > ");

  if (question === "exit")
    return;
  else if (question === "clear"){
    clear()
    askQuestion()
  }

  fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept-Encoding': 'gzip, deflate',
      'Connection': 'keep-alive',
      'Content-Type': 'application/json',
      'User-Agent': 'python-requests/2.28.1',
      'accept': 'application/json',
      'token': TOKEN
    },
    body: JSON.stringify({
      'question': question,
      'chat_history': []
    })
  }).then(response => response.json())
    .then(response => {
      console.log(`blackGPT > ${response[0].data.answer}`)

      askQuestion()
    })
    .catch((e) => {
      console.log(e)
    })
}