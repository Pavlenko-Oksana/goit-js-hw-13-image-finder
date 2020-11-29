import './styles.css';
import ApiPhoto from './js/apServise';
import templatePhotoGallery from './templates/photoGallery.hbs';
import getRefs from './js/get-refs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';
import 'material-design-icons/iconfont/material-icons.css';
import { defaults, alert } from '@pnotify/core';
defaults.icons = 'material';
defaults.styling = 'material';
defaults.type = 'error';
defaults.hide = true;
defaults.width = '360px';
defaults.minHeight = '16px';
defaults.delay = '1500';
defaults.closer = false;
defaults.sticker = false;

const refs = getRefs();
const apiPhoto = new ApiPhoto();

refs.serchPhotoInput.addEventListener('submit', onSerch)

function onSerch(evt) {
    evt.preventDefault();
    apiPhoto.query = evt.currentTarget.elements.query.value;

     if (apiPhoto.query === '' || apiPhoto.query === ' ') {
       return alert({
            text: `Please try again!`,
        });
     };
   
    clearMarcupImg();
    apiPhoto.resetPage();
    
    apiPhoto.fetchPhotos().then(renderMarcupImg).catch(onFetchError);

}

function renderMarcupImg(img) {
    operateObserver(img);
    const marcup = templatePhotoGallery(img);
    
    refs.imgContainer.insertAdjacentHTML('beforeend', marcup);
    
}

function clearMarcupImg() {
    refs.imgContainer.innerHTML = '';
}

function onFetchError(img) {
  
      if ( img.status === 404 || img.error === SyntaxError || img.length === 0) {
       return alert({
            text: `Please try again!`,
           });
  };
  
    
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && apiPhoto.query !== '') {
             apiPhoto.fetchPhotos().then(renderMarcupImg);
        }
    });
}

const options = {
    rootMargin: "200px"
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);

function operateObserver(img) {
 
    if (img.length !== 12) {
      observer.unobserve(refs.sentinel);  
    }
}