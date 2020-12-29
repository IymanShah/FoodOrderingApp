// Get Data from API
document.addEventListener("DOMContentLoaded", function(e) {
    getDataFromAPI();

  })
function getDataFromAPI(){
    sortRestaurant();
}

function getCardForUI(restaurantdata){

    let cardBlock = document.querySelector(".row");
    //card column
    let cardColumn = document.createElement("div");
    cardColumn.classList.add('column');    
    //card block
    let card = document.createElement('div');
    card.classList.add('card');
    //card img
    let cardImg = document.createElement('img');
    cardImg.setAttribute('src',restaurantdata.photo);

    //card heading
    let cardHeading = document.createElement('div');
    cardHeading.classList.add('restName');
    cardHeading.innerText = restaurantdata.name;
   //card tags
   let cardtags = document.createElement('div');
   cardtags.classList.add('cardtags');
   cardtags.innerText = restaurantdata.tags;
   //card rating
   let cardStars = document.createElement('i');
   cardStars.classList.add('fa', 'fa-star');
   if(restaurantdata.rating >= 4){
       cardStars.setAttribute('style', 'color:#30b230');
   }
   else{
    cardStars.setAttribute('style', 'color:#df7b1e');
   }
  
   let cardRating = document.createElement('div');
   cardRating.classList.add('cardRating');
   cardRating.innerText = restaurantdata.rating;
   //card eta
   let cardEta = document.createElement('div');
   cardEta.classList.add('cardEta');
   cardEta.innerText=restaurantdata.eta+'mins';

   //card distance
   let cardDistance = document.createElement('div');
   cardDistance.classList.add('cardDistance');
   cardDistance.innerText=restaurantdata.distance;
   
   card.appendChild(cardImg);
   card.appendChild(cardHeading);
   card.appendChild(cardtags);
   card.appendChild(cardStars);
   card.appendChild(cardRating);
   card.appendChild(cardEta);
   card.appendChild(cardDistance);
   cardColumn.appendChild(card);
   cardBlock.appendChild(cardColumn);
}
//Map Function to use get data for ui card
function generateView(listOfRestaurants){
    listOfRestaurants.map(getCardForUI);
}

//search functionality
function searchRestaurant(inpQuery){

}

//sorting  _orderBy
function sortRestaurant(){
    let filterVal = document.getElementById('filter').value;
    let sortedObjs = _.sortBy( restData.Restaurants, filterVal );
    if(filterVal == 'rating'){
        sortedObjs.reverse();
    }
    clearUIHtmlContent();
    generateView(sortedObjs);
}

function clearUIHtmlContent(){
    let cardBlock = document.querySelector(".row");
    cardBlock.innerHTML="";
}

//Filter  loadash methods



const delay = function( fn, delay){
    let timer;
    return function(...args){
        let contxt = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(contxt,args);
        },delay );
    }
}

function filterRestaurants(){
    let inpLabel = document.getElementById("searchText").value;
    if(!inpLabel){
        sortRestaurant();
    }
    else{
        let lowSearch = inpLabel.toLowerCase();
        let searchItems =  restData.Restaurants.filter(function(restItem){
            return Object.values(restItem).some( val => 
                String(val).toLowerCase().includes(lowSearch) 
            );
        });
        clearUIHtmlContent();
        generateView(searchItems);
    }
}

const debounceSearch=delay(filterRestaurants, 500);

//EventBubb or capturing and save list use local storage
function markMyFavoriteRestaurants(inpRestaurant){

}