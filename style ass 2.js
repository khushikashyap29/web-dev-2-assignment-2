const apiKey = "YOUR_API_KEY";   // put API key here
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("weatherResult");
const historyList = document.getElementById("historyList");


console.log("Script started");


searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if(city === ""){
        alert("Please enter city name");
        return;
    }

    getWeather(city);
});


async function getWeather(city){

console.log("Fetching weather...");

try{

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

console.log("Fetch request sent");

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

console.log("Data received");

displayWeather(data);
saveHistory(city);

}catch(error){

console.log("Error occurred");

result.innerHTML = "Error: " + error.message;

}

console.log("Function finished");

}


function displayWeather(data){

const cityName = data.name;
const temp = data.main.temp;
const condition = data.weather[0].main;

result.innerHTML = `
City: ${cityName} <br>
Temperature: ${temp} °C <br>
Condition: ${condition}
`;

}


function saveHistory(city){

let history = JSON.parse(localStorage.getItem("cities")) || [];

if(!history.includes(city)){
history.push(city);
localStorage.setItem("cities", JSON.stringify(history));
}

loadHistory();

}


function loadHistory(){

historyList.innerHTML="";

let history = JSON.parse(localStorage.getItem("cities")) || [];

history.forEach(city => {

const li = document.createElement("li");

li.textContent = city;

li.addEventListener("click",()=>{
getWeather(city);
});

historyList.appendChild(li);

});

}


loadHistory();
