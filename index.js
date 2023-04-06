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
  });

  const searchInput = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');
const houseDetails = document.getElementById('house-details');

searchInput.addEventListener('input', function() {
  const searchQuery = this.value;

  fetch(`houses.json`)
    .then(response => response.json())
    .then(data => {
      let results = '';

      data.forEach(house => {
        if (house.type.toLowerCase().includes(searchQuery.toLowerCase())) {
          results += `<div class="house" data-name="${house.name}" data-type="${house.type}" data-location="${house.location}" data-images="${house.images}" data-price="${house.price}">
                        <h2>${house.name}</h2>
                        <p>Type: ${house.type}</p>
                        <p>Location: ${house.location}</p>
                      </div>`;
        }
      });

      searchResults.innerHTML = results;
      houseDetails.innerHTML = '';
    });
});

searchResults.addEventListener('click', function(event) {
  const selectedHouse = event.target.closest('.house');

  if (selectedHouse) {
    const name = selectedHouse.getAttribute('data-name');
    const type = selectedHouse.getAttribute('data-type');
    const location = selectedHouse.getAttribute('data-location');
    const images = selectedHouse.getAttribute('data-images').split(',');
    const price = selectedHouse.getAttribute('data-price');

    let imageHTML = '';
    images.forEach(image => {
      imageHTML += `<img src="${image}" alt="${name}" class="house-image">`;
    });

    houseDetails.innerHTML = `<div>
                                 ${imageHTML}
                               </div>
                               <div>
                                 <p>Name: ${name}</p>
                                 <p>Type: ${type}</p>
                                 <p>Location: ${location}</p>
                                 <p>Price: ${price}</p>
                               </div>`;
  }
});



