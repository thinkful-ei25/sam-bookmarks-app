'use strict';
/* global store, $, api*/
// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){

  function generateBookmarkElement(item) {
    const rating = item.rating;
    let ratingHTML = '';
    if(rating === 5){
      ratingHTML = '<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>';
    } else if (rating === 4){
      ratingHTML = '<span>☆</span><span>☆</span><span>☆</span><span>☆</span>';
    } else if (rating === 3){
      ratingHTML = '<span>☆</span><span>☆</span><span>☆</span>';
    } else if (rating === 2){
      ratingHTML = '<span>☆</span><span>☆</span>';
    } else {
      ratingHTML = '<span>☆</span>';
    }

    console.log('ran generateBookmarkElement');

    if(item.isExpanded){
      return `<div class="panel panel-default js-bookmark" data-item-id="${item.id}">
        <div class="panel-heading">${item.title}</div>
        <div class="panel-body">
            <div class="rating">
                ${ratingHTML}
            </div>
        </div>
        </div>`;
    } else {
      return `<div class="panel panel-default js-bookmark js-bookmark-expanded" data-item-id="${item.id}">
          <div class="panel-heading">${item.title}</div>
          <div class="panel-body">
            <div class="rating">
                ${ratingHTML}
            </div>
            <div class="description">
              <p>${item.desc}</p>
            </div>
            <div class="bookmark-buttons">
              <div class="js-visitURL visitURL bookmark-button">
                <button>Visit Website</button>
              </div>
              <div class="js-editBookmark editBookmark bookmark-button">
                <button>Edit</button>
              </div>
              <div class="js-removeBookmark removeBookmark bookmark-button">
                <button>Remove</button>
              </div>
            </div>
          </div>
          </div>`;
    }

  
  
  }

  function generateBookmarksString(bookmarkList){
    const items = bookmarkList.map((item)=> generateBookmarkElement(item));
    return items.join('');
  }

  function generateAddBookmarkElement(){
    if(store.addingBookmark){
      return `<div class="panel panel-default panel js-addBookmark addBookmark-panel">
      <div class="panel-heading">Add a Bookmark</div>
      <div class="panel-body">
        <form class="add-bookmark-form js-add-bookmark-form" id="js-add-bookmark-form">
          <input name="website" class="websiteInput js-website-input" type="text" placeholder="Website Name">
          <input name="url" class="urlInput js-url-input" type="text" placeholder="Website URL">
          <textarea placeholder="Enter a website description..." class="website-description js-website-description"></textarea>
          <div class="js-bookmark-rating bookmark-rating">
            <input type="radio" name="rating" value=5><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><br>
            <input type="radio" name="rating" value=4><span>☆</span><span>☆</span><span>☆</span><span>☆</span><br>
            <input type="radio" name="rating" value=3><span>☆</span><span>☆</span><span>☆</span><br>
            <input type="radio" name="rating" value=2><span>☆</span><span>☆</span><br>
            <input type="radio" name="rating" value=1><span>☆</span>
          </div>
          <button class="add-bookmark-submit js-add-bookmark-submit">Add Bookmark</button>
        </form>
      </div>
    </div>`;
    } else {
      return '';
    }
  }

  function generateBookmarkTopBar() {
    if(!store.addingBookmark){
      return `
      <div class="js-addBookmark-button addBookmark">
          <button>Add Bookmark</button>
        </div>
        <div class="js-filterRating filterRating">
            <select id="minimum-rating-filter" name="Minimum Rating">
                <option value="0">Minimum Rating</option>
                <option value="5"><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></option>
                <option value="4"><span>☆</span><span>☆</span><span>☆</span><span>☆</span></option>
                <option value="3"><span>☆</span><span>☆</span><span>☆</span></option>
                <option value="2"><span>☆</span><span>☆</span></option>
                <option value="1"><span>☆</span></option>
            </select>
        </div>`;
    } else {
      return '';
    }

  }


  function render(){
    let bookmarks = store.bookmarks;

    $('.js-buttons').html(generateBookmarkTopBar());
    
    const ratingFilter = store.ratingFilter;
    console.log(ratingFilter);
    bookmarks = store.bookmarks.filter(item => item.rating >= ratingFilter);


    console.log('render ran');
    const bookmarkItemsString = generateBookmarksString(bookmarks);
    $('.js-bookmarks').html(generateAddBookmarkElement()+bookmarkItemsString);

  }

  function handleAddBookmarkClicked(){
    $('.js-buttons').on('click', '.js-addBookmark-button', event => {
      store.setAddingBookmark(true);
      render();
    });
  }


  function handleNewBookmarkSubmit(){
    $('.js-bookmarks').on('click', '.js-add-bookmark-submit', function (event){
      event.preventDefault();
      const newBookmarkTitle = $('.js-website-input').val();
      const newBookmarkURL = $('.js-url-input').val();
      const newBookmarkDescription = $('.js-website-description').val();
      const newBookmarkRating = $('input[name="rating"]:checked').val();

      
      api.createBookmark(newBookmarkTitle, newBookmarkURL, newBookmarkDescription, newBookmarkRating, (item)=> {
        store.addBookmark(item);
        store.error ='';
        render();
      }, function(){
        store.error = 'Failed to add item because input field(s) were empty';
        console.log(store.error);
      });

      store.addingBookmark = false;

    });
  }

  function getBookmarkIDFromElement(item){
    return $(item)
      .closest('.js-bookmark-expanded')
      .data('item-id');
  }

  function handleFilterByRatingsClicked(){
    $('.js-buttons').on('change','.js-filterRating', event => {
      const newFilter = $(':selected').val();
      store.ratingFilter = newFilter;
      render();
    });
  }

  function handleVisitWebsiteClicked(){

  }

  function handleEditBookmarkClicked(){

  }

  function handleRemoveBookmarkClicked(){
    $('.js-bookmarks').on('click', '.js-removeBookmark', event => {
      const id = getBookmarkIDFromElement(event.currentTarget);
      api.deleteBookmark(id, function(){
        store.findAndDelete(id);
        render();
      });
    });
  }


  function bindEventListeners(){
    handleAddBookmarkClicked();
    handleNewBookmarkSubmit();
    handleFilterByRatingsClicked();
    handleVisitWebsiteClicked();
    handleEditBookmarkClicked();
    handleRemoveBookmarkClicked();
  }

  return {
    render,
    bindEventListeners
  };

}());