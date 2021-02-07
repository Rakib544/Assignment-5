//capturing input value
const getInputValue = () => {
    const inputValue = document.getElementById('search-input').value;
    console.log(inputValue);
    return inputValue;
}


//handling search food functionality
const searchFood = () => {
    const searchValue = getInputValue().trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            showFood(data.meals)
        })
    document.getElementById('search-input').value = "";
    document.getElementById('parent-div').innerHTML = ``;

}

//handling show food functionality
const showFood = foods => {
    if (foods) {
        foods.forEach(food => {
            const item = document.createElement('div');
            item.classList.add('col');
            item.innerHTML = `
                <div onclick="" class="card h-100 cursor-pointer">
                    <img src=${food.strMealThumb} class="card-img-top" alt="...">
                    <div class="card-body">
                    <h4 class="card-title text-center">${food.strMeal}</h4>
                    </div>
                </div>
            `
            const parentDiv = document.getElementById('parent-div');
            parentDiv.appendChild(item);
        })
    } else {
        const notFoundMessage = document.createElement('div');
        notFoundMessage.innerText = "Result not found";
        notFoundMessage.classList.add('mx-auto', 'fs-2')
        document.getElementById('parent-div').appendChild(notFoundMessage);
    }
} 


//handling selected food item's full information functionality 