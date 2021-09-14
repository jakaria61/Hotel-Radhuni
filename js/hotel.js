
// for enter button 
const inputFiled = document.getElementById('input-text');
const enterButton = document.getElementById('button-addon2');

inputFiled.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        enterButton.click();
    }
});


//error hide
const errorContainer = document.getElementById('error');
errorContainer.style.display = 'none'
//spiner hide
const spinerShow = document.getElementById('spiner-show');
spinerShow.style.display = 'none';

const getInputValue = () => {
    const inputText = document.getElementById('input-text');
    const searchText = inputText.value;
    inputText.value = '';
    if (searchText == '') {
        const errorContainer = document.getElementById('error');
        errorContainer.style.display = 'block'
    }
    else {
        const spinerShow = document.getElementById('spiner-show');
        spinerShow.style.display = 'block';
        const errorContainer = document.getElementById('error');
        errorContainer.style.display = 'none'

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayMeal(data.meals))
    }
}

const displayMeal = (meals) => {
    // spiner hide
    const spinerShow = document.getElementById('spiner-show');
    meals.length ? spinerShow.style.display = 'none' : '';
    //spiner hide
    const mealContainer = document.getElementById('meal-container');
    mealContainer.textContent = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="showDetails()" class="card">
                        <img   src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text"> ${meal.strInstructions.slice(0, 100)}.</p>
                        </div>
                    </div>
        
        `;
        mealContainer.appendChild(div);
    });
}

const showDetails = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`
    fetch(url)
        .then(res => res.json())
        .then(mealId => displayDetails(mealId.meals[0]))
}
const displayDetails = (mealId) => {
    const mealDetails = document.getElementById('meal-details');
    mealDetails.innerHTML = `
    
    <div onclick="showDetails()" class="card">
                        <img   src="${mealId.strMealThumb}"  class="card-img-top " alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${mealId.strMeal}</h5>
                            <p>${mealId.strArea}</p>
                            <p>${mealId.idMeal}</p>
                        </div>
                    </div>
    
    `
}