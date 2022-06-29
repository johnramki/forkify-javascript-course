import View from './View.js';
import icons from 'url:../../img/icons.svg';

class resultsView extends View{
    _parentElement = document.querySelector('.results');

    _generateMarkup(){ 
        //console.log('Result',this._data);
        return this._data.map(this._generateMarkupPreview).join('');
        
    }

    _generateMarkupPreview(result){
        return `
            <li class="preview">
            <a class="preview__link preview__link--active" href="#${result.recipe_id}">
            <figure class="preview__fig">
                <img src="src/img/test-1.jpg" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
                </div>
            </div>
            </a>
        </li>
        `;
    }
}
export default new resultsView();