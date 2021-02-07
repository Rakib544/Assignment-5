//capturing input value
const getInputValue = () => {
    const inputValue = document.getElementById('search-input').value;
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
                <div onclick="showFullDetails(${food.idMeal})" class="card h-100 cursor-pointer">
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
const showFullDetails = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            //slicing objects value and convert them into array
            const ingredient = Object.values(data.meals[0]).slice(9, 29);
            const measure = Object.values(data.meals[0]).slice(29, 49);

            //adding two arrays value
            const ingredients = measure.map((item, index) => {
                return `${measure[index]} ${ingredient[index]}`
            })

            //removing empty array
            const filterIngredients = ingredients.filter(item => {
                return item.trim().length > 0;
            })


            const fullDetailsDiv = document.getElementById('full-details');
            fullDetailsDiv.classList.add('card')
            fullDetailsDiv.innerHTML = `
                        <img src=${data.meals[0].strMealThumb} class="card-img-top height" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">${data.meals[0].strMeal}</h4>
                            <h2>Ingredients</h2>
                        </div>
            `
            showIngredients(filterIngredients)
        })
}


//show ingredient list functionality
const showIngredients = (filterIngredients) => {
    filterIngredients.forEach(item => {
        console.log(item)
        const list = document.createElement('p');
        list.classList.add('ps-2')
        list.innerText = `✅ ${item}`
        console.log(list)
        document.getElementById('full-details').appendChild(list);
    })
}