import icons from 'url:../../img/icons.svg';

export default class View{
    _data;
    render(data){
        if(!data) renderError('No Data Found.....');
        this._data = data;
        this._clear();
        const recipeHTML = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin',recipeHTML); 
    }
    renderSpinner(){
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    renderError(message){
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    _clear(){
        this._parentElement.innerHTML = '';
    }

}