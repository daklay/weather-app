function d(x){
    return document.querySelector(x)
}
const app = d(".weather_container");
const temp = d(".temp");
const date_output = d(".date");
const condition_output = d(".condition");
const city_ouput = d(".city");
const icon = d(".header_date img");
// const humidity_icon = d(".icon_info .humidity");
const humidity_info = d(".text_info .humidity");
// const wind_icon = d(".icon_info .wind");
const wind_info = d(".text_info .wind");
const form = document.getElementById("locationInput");
const search = d("form .search");
const btn = d("form .submit");

let city_input = "Rabat"
form.addEventListener("submit", (e)=>{
    if(search.value.length == 0){
        alert("no city detected")
    } else {
        // alert("no city adfasd")
        city_input= search.value;
        fetchWeather();
        search.value = '';
        app.style.opacity="0";
    }
    e.preventDefault();
})
function getMonths(month, day, year){
    const month_arr= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    // let day_val = new Date(`${day}/${month}/${year}`).getDate()
    return month_arr[new Date(`${month}/${day}/${year}`).getMonth()]
}
function fetchWeather(){
    fetch(`https://api.weatherapi.com/v1/current.json?key=dc448c8304464dbd9fa101722223007&q=${city_input}`)
    .then(Response => Response.json())
    .then(data=> {
        temp.innerHTML = data.current.temp_c;
        condition_output.innerHTML = data.current.condition.text;
        let date = data.location.localtime;
        let y = parseInt(date.substring(0,4))
        let m = parseInt(date.substring(5))
        let d = parseInt(date.substring(8))
        date_output.innerHTML = `${d} ${getMonths(m,d,y).toUpperCase()}`
        console.log(data.location.name.toUpperCase())
        city_ouput.innerHTML = `${data.location.name.toUpperCase()}, ${data.location.country.toUpperCase()}`
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length)
        console.log(data)
        icon.src = "./src/icons/"+iconId;
        humidity_info.innerHTML = data.current.humidity + "%";
        wind_info.innerHTML = data.current.wind_kph + "Km/h";
        const code = data.current.condition.code;
        let timeOfDay = "day";
        if(!data.current.is_day){
            timeOfDay = "night";
        }
        var cloudy_weather=[1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282]
        var rainy_weather=[1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1292, 1195, 1204, 1207, 1240, 1207, 1240, 1243, 1246, 1249, 1252]
        if(code == 1000){
            app.style.backgroundImage = `url(/src/imgs/${timeOfDay}/clear.jpg)`
        
        }
        else if(cloudy_weather.includes(code)){
            app.style.backgroundImage = `url(/src/imgs/${timeOfDay}/cloudy.jpg)`
        }
        else if(rainy_weather.includes(code)){
            app.style.backgroundImage = `url(/src/imgs/${timeOfDay}/rainy.jpg)`
        }
        else{
            app.style.backgroundImage = `url(/src/imgs/${timeOfDay}/snowy.jpg)`
        }
        setTimeout(()=>{
            app.style.opacity = "1"
        }, 100) 
    }).catch(()=>{
        alert("city not found")
        app.style.opacity = "1"
    })
}
fetchWeather()
// app.style.opacity = "1"
