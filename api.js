//  const APIurl = "https://api.geoapify.com/v2/places?"
// const apiKey = "e5d8cb0d2d35428b9e92e43c4486dcc6"

const cityname = document.getElementById("ID")
const searchBTN = document.getElementById('SearchBTN')
const catagories = document.querySelector('select')

var placeID = ""

// API That generates location info
function callLocationInformation(catagories, placeID) { 
    const InformationAPI = `https://api.geoapify.com/v2/places?categories=${catagories}&filter=place:${placeID}&limit=20&apiKey=e5d8cb0d2d35428b9e92e43c4486dcc6`
    fetch (InformationAPI)
        .then(response => response.json())
        .then(data => {
            console.log(data)
             });
}

// Event listener on search 
searchBTN.addEventListener("click", function () {
    var cityNameInput = cityname.value
    var toDo = catagories.value
    console.log(catagories.value)
    callPlaceID(cityNameInput)

// Place ID Generator API 
    function callPlaceID(searchedCity) {
        const PlaceIdAPI = `https://api.geoapify.com/v1/geocode/search?text=${searchedCity}&format=json&apiKey=d548c5ed24604be6a9dd0d989631f783`
        fetch(PlaceIdAPI)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                 placeID = data.results[0].place_id
                 console.log(placeID)
                 callLocationInformation(toDo , placeID)
                //  Call function that loops info in the same scope
                 });
    }
})

// Next steps 

// Grab the information by traversing the API 
// Create function in the JS for for it to loop through the information (Don't forgot to hide search information)
// Create render function