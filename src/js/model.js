import { async } from "regenerator-runtime";
import { API_URL,ITEM_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe  : {},
    search  : {
        query : '',
        result : [],
        perPage : ITEM_PER_PAGE,
        page : 1
    }
}

export const loadRecipe = async function (ID){ 
    try{
        //Get recipe
        const recipe = await getJSON(`${API_URL}get?rId=${ID}`);
        //console.log(recipe);
        state.recipe = recipe.recipe;
    }catch(err){
        console.log(`${err} 🤦🏻🤦🏻🤦🏻🤦🏻🤦🏻🤦🏻🤦🏻🤦🏻🤦🏻🤦🏻`);
        throw err;
    }
}

export const loadSearchResult = async function(query){
    try{
        //Get recipe search result
        const data = await getJSON(`${API_URL}search?q=${query}`);
        console.log(data);
        state.search.query = query;
        state.search.result = data.recipes;
        
    }catch(err){
        console.log(err);
        throw err;
    }
}

export const getSearchResultPage = function(page = state.search.page){
    state.search.page = page;
    const start = (page - 1) * state.search.perPage;
    const end = page * state.search.perPage;
    console.log(start,end);
    return state.search.result.slice(start,end);
}

export const uploadRecipe = async function (newRecipe) {
    try {
      const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
          const ingArr = ing[1].split(',').map(el => el.trim());
          // const ingArr = ing[1].replaceAll(' ', '').split(',');
          if (ingArr.length !== 3)
            throw new Error(
              'Wrong ingredient fromat! Please use the correct format :)'
            );
  
          const [quantity, unit, description] = ingArr;
  
          return { quantity: quantity ? +quantity : null, unit, description };
        });
  
      const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
      };
  
      const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
      state.recipe = createRecipeObject(data);
      addBookmark(state.recipe);
    } catch (err) {
      throw err;
    }
  };