import './styles.css';
import ApiPhoto from './js/apServise';
import templatePhotoGallery from './templates/photoGallery.hbs';
import getRefs from './js/get-refs';
// import { alert, defaultModules } from 'node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';

const refs = getRefs();
const apiPhoto = new ApiPhoto();

refs.serchPhotoInput.addEventListener('submit', onSerch)

function onSerch(evt) {
    evt.preventDefault();
    clearMarcupImg();
    apiPhoto.query = evt.currentTarget.elements.query.value;
    // resetPage();
    apiPhoto.fetchPhotos().then(renderMarcupImg);
}

function renderMarcupImg(img) {
    const marcup = templatePhotoGallery(img);
    console.log(marcup);
    refs.imgContainer.insertAdjacentHTML('beforeend', marcup);
    
}

function clearMarcupImg() {
    refs.imgContainer.innerHTML = '';
}