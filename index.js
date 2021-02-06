//capturing input value
const getInputValue = () => {
    const inputValue = document.getElementById('search-input').value;
    console.log(inputValue);
    return inputValue;
}


//handling search food functionality
const searchFood = () => {
    const searchValue = getInputValue()
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`)
    .then(res => res.json())
    .then(data => {
        showFood(data.meals)
    })
    document.getElementById('search-input').value = "";

}

//handling show food functionality
const showFood = foods => {
    foods.forEach(food => {
        const item = document.createElement('div');
        item.classList.add('col');
        item.innerHTML = `
            <div class="card h-100">
                <img src=${food.strMealThumb} class="card-img-top" alt="...">
                <div class="card-body">
                <h4 class="card-title text-center">${food.strMeal}</h4>
                </div>
            </div>
        `

        const parentDiv = document.getElementById('parent-div');
        parentDiv.appendChild(item);
    })
}