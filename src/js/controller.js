import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import addRecipeView from './view/addRecipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//Get recipes
const getRecipe = async function(){
  try{

    //get dynamic recipe 
    const ID = window.location.href.split('#')[1];

    //load sinner
    if(!ID) return;
    recipeView.renderSpinner();

    //Get recipe
    await model.loadRecipe(ID);
    const recipe = model.state.recipe;

    //Render Recipe
    recipeView.render(model.state.recipe);

  }catch(err){
    recipeView.renderError(`We couldn't find that Recipe.So please try another`);
  }
}

const controlSearchResults = async function(){
  try{
    //Render spiner
    resultsView.renderSpinner();

    //Get query
    const query = searchView.getQuery(); 
    if(!query) return;

    //Load search result
    await model.loadSearchResult(query);

    //Render results
    resultsView.render(model.getSearchResultPage());

    //Render pagination
    paginationView.render(model.state.search);
    
  }catch(err){
    console.log(err);
  }
}

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlAddRecipe = function(data){
  console.log(data);
}

//get recipe while load and change
const init = function(){
    recipeView.addHandlerRender(getRecipe);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();