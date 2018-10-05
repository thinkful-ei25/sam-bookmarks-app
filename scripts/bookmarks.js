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
      return `<div class="panel panel-default js-bookmark js-bookmark-expanded" data-item-id=${item.id}>
          <div class="panel-heading">${item.title}</div>
          <div class="panel-body">
            <div class="rating">
                ${rating.html}
            </div>
            <div class="description">
              <p>Website Description</p>
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
          </div>`;
    }


  
  
  
  }

  function generateBookmarksString(bookmarkList){
    const items = bookmarkList.map((item)=> generateBookmarkElement(item));
    return items.join('');
  }


  function render(){
    let bookmarks = store.bookmarks;

    if(!store.addingBookmark){
      const addAndFilter = `
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
      $('.js-buttons').html(addAndFilter);
    } else {
      const addingBookmark = `<div class="panel panel-default panel js-addBookmark addBookmark-panel">
          <div class="panel-heading">Add a Bookmark</div>
          <div class="panel-body">
            <form class="js-add-bookmark-form add-bookmark-form">
              <input name="website" class="websiteInput js-website-input" type="text" placeholder="Website Name">
              <input name="url" class="urlInput js-url-input" type="text" placeholder="Website URL">
              <textarea placeholder="Enter a website description..." class="website-description js-website-description"></textarea>
              <div class="js-bookmark-rating bookmark-rating">
                <input type="radio" value=5><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><br>
                <input type="radio" value=4><span>☆</span><span>☆</span><span>☆</span><span>☆</span><br>
                <input type="radio" value=3><span>☆</span><span>☆</span><span>☆</span><br>
                <input type="radio" value=2><span>☆</span><span>☆</span><br>
                <input type="radio" value=1><span>☆</span>
              </div>
              <button class="add-bookmark-submit js-add-bookmark-submit">Add Bookmark</button>
            </form>
          </div>
        </div>`;
      $('.js-bookmarks').html(addingBookmark);
    }


    console.log('render ran');


  }

  function handleAddBookmarkClicked(){
    $('.js-buttons').on('click', '.js-addBookmark-button', event =>{
      store.setAddingBookmark(true);
      render();
    });
  }


  function handleNewBookmarkSubmit(){

  }

  function handleFilterByRatingsClicked(){

  }

  function handleVisitWebsiteClicked(){

  }

  function handleEditBookmarkClicked(){

  }

  function handleRemoveBookmarkClicked(){

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