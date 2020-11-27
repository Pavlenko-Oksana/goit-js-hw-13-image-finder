export default class ApiPhoto{
    constructor() {
        this.serchQuery = '';
        this.page = 1;
    }
    fetchPhotos() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.serchQuery}&page=${this.page}&per_page=12&key=19200060-9ee0fe46aea3b43e45ced2ab9`;
    
    return fetch(url).then(response => {
        return response.json();
     }).then(data => {
         this.page += 1;
         return data.hits;
    })
       
  }

    resetPage() {
        this.page = 1;
    }    
    
     get query(){
            return this.serchQuery;
    }
    
    set query(newQuery) {
        this.serchQuery = newQuery;
    }



}
