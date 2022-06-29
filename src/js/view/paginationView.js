import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View{
    _parentElement = document.querySelector('.pagination');

    _generateMarkup(){ 
        console.log(this._data)
        const currPage = this._data.page;
        const numPage = Math.ceil(this._data.result.length / this._data.perPage);
        //console.log(numPage);
        if( numPage > 1 && this._data.page === 1){
            return `
                <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currPage+1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        
        if( numPage === currPage && numPage > 1){
            return `
            <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage-1}</span>
            </button>`;
        }
       
        if(currPage < numPage){ 
            return `
            <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage+1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
            <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage-1}</span>
            </button>
            `;
        }
    }
    addHandlerClick(handler){
        this._parentElement.addEventListener('click',function(e){
            const btn = e.target.closest('.btn--inline');
            const goto = +btn.dataset.goto;
            handler(goto)
        })
        
    }
}
export default new paginationView();