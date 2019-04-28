
import Search from './modules/Search';
import Recipe from './modules/Recipe';
import List from './modules/List';
import Like from './modules/Like';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';


/**
 *  Global state of the app
 *      - search object
 *      - current reccipe object
 *      - shoping list object
 *      - liked recipes
 */
const state = {};


/**
*  SEARCH CONTROLLER
*/

const controlSearch = async () => {

    //  1. get query from view
    const query = searchView.getInput();

    if(query){

        //  2. new search object and add to state
        state.search = new Search(query);

        //  3. preper UI for result
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);

        try {
            //  4. search for recipes
            await state.search.getResult();
    
            //  5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }
        catch(e){
            alert(e);
            clearLoader();
        }
    }
};


/**
*  RECIPE CONTROLLER
*/

const controlRecipe = async () => {

    const id = window.location.hash.replace('#', '');

    if(id){

        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        if(state.search) searchView.highlightSelected(id);

        // create new recipe object
        state.recipe = new Recipe(id);

        try{
            // get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        }
        catch(e){
            alert(e);
        }
    }
};


/**
*  LIST CONTROLLER
*/

const controlList = () => {

    if(!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);

        listView.renderItem(item);
    });
};


/**
*  LIKE CONTROLLER
*/

const controlLike = () => {
    if(!state.likes) state.likes = new Like();

    const currentId = state.recipe.id;

    if(!state.likes.isLiked(currentId)){

        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        likeView.toggleLikeBtn(true);
        likeView.renderLike(newLike);
    }
    else{
        state.likes.deleteLike(currentId);
        likeView.toggleLikeBtn(false);
        likeView.deleteLike(currentId);
    }
    likeView.toggleLikeMenu(state.likes.getNumLikes());
};


/**
 *  EVENTS
 */

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);
    }
});

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches('.shopping__delete, .shopping__delete *')){

        state.list.deleteItem(id);
        listView.deleteItem(id);
    }
    else if(e.target.matches('.shopping__count-value')){

        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

window.addEventListener('load', () => {

    state.likes = new Like();
    state.likes.readStorage();
    likeView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likeView.renderLike(like));
});

elements.recipe.addEventListener('click', e => {

    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    else if(e.target.matches('.recipe__btn-add, recipe__btn-add *')){
        controlList();
    }
    else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));