document.addEventListener("DOMContentLoaded", ()=>{
    displayHouse()
})
function displayHouse(){
    fetch("http://localhost:4000/house")
    .then(r => r.json())
    .then(iterateHouses)
}
function iterateHouses(houses){
    houses.forEach(houseList)
}
function houseList(houses){
    const dispHouse = document.querySelector(".display-houses")
    const div = document.createElement("div")
    div.innerHTML = `
    <article class = "house-card">
    <div class="card-img">
    <img src="${houses.image}">
    </div>
    <div class="card-content">
    <h2>${houses.type_house}</h2>
    <h3>${houses.price}</h3>
    </div>
    </article>
    `
    div.addEventListener("click", ()=>{
        fetch("http://localhost:5000/house", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image:`${houses.image}`,
            type_house:`${houses.type_house}`,
            price:`${houses.price}`
            })
        }).then(r => r.json())
        .then(data => console.log(data))
    })
    dispHouse.appendChild(div)
}
const form = document.querySelector(".form").addEventListener("submit", (e)=> {
    e.preventDefault()
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const phoneNumber = document.querySelector("#phone-number").value
    const rooms = document.querySelector("#rooms").value
    const budget = document.querySelector("#budget").value
    const date = document.querySelector("#date").value
    const description = document.querySelector("#description").value
    const typeOfHouse = document.querySelector("#house").value
    

    fetch("http://localhost:3000/architecture",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name:name,
            email:email,
            phone_number:phoneNumber,
            number_rooms:rooms,
            type_of_house:typeOfHouse,
            description:description,
            date:date,
            budget:budget,
        })
    }).then(r => r.json())
    .then(data => console.log(data))
  })


