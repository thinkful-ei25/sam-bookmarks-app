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

    const array = generateRatingFilterRadio(item.id);

    console.log('ran generateBookmarkElement');

    if(!item.isExpanded){
      return `<div class="panel panel-default js-bookmark js-bookmark-closed" data-item-id="${item.id}">
        <div class="panel-heading">${item.title}</div>
        <div class="panel-body">
            <div class="rating">
                ${ratingHTML}
            </div>
        </div>
        </div>`;
    } else if (item.isEditing){
      return `<div class="panel panel-default panel js-bookmark editBookmark-panel" data-item-id="${item.id}">
      <div class="panel-heading">Edit Bookmark<button class="js-exit-edit exit-edit">✖</button></div>
      <div class="panel-body">
        <form class="edit-bookmark-form js-edit-bookmark-form">
          <input name="website" class="websiteInput js-website-input" type="text" placeholder="${item.title}">
          <input name="url" class="urlInput js-url-input" type="text" placeholder="${item.url}">
          <textarea placeholder="${item.desc}" class="website-description js-website-description"></textarea>
          <div class="js-bookmark-rating bookmark-rating">
            <input type="radio" name="rating" value=5 ${array[5]}><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><br>
            <input type="radio" name="rating" value=4 ${array[4]}><span>☆</span><span>☆</span><span>☆</span><span>☆</span><br>
            <input type="radio" name="rating" value=3 ${array[3]}><span>☆</span><span>☆</span><span>☆</span><br>
            <input type="radio" name="rating" value=2 ${array[2]}><span>☆</span><span>☆</span><br>
            <input type="radio" name="rating" value=1 ${array[1]}><span>☆</span>
          </div>
          <button class="edit-bookmark-submit js-edit-bookmark-submit">Submit Changes</button>
        </form>
      </div>
    </div>`;
    } else {
      return `<div class="panel panel-default js-bookmark js-bookmark-expanded" data-item-id="${item.id}">
          <div class="panel-heading">${item.title}<button class="js-exit-expanded exit-expanded">✖</button></div>
          <div class="panel-body">
            <div class="rating">
                ${ratingHTML}
            </div>
            <div class="description">
              <p>${item.desc}</p>
            </div>
            <div class="bookmark-buttons">
              <div class="js-visitURL visitURL bookmark-button">
                <button><span class="glyphicon glyphicon-globe"></span> Visit URL</button>
              </div>
              <div class="js-editBookmark-button editBookmark bookmark-button">
                <button><span class="glyphicon glyphicon-pencil"></span> Edit</button>
              </div>
              <div class="js-removeBookmark removeBookmark bookmark-button">
                <button><span class="glyphicon glyphicon-trash"></span> Remove</button>
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
      <div class="panel-heading">Add a Bookmark<button class="js-exit-add exit-add">✖</button></div>
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
    const rating = generateRatingFilter();
    if(!store.addingBookmark){
      return `
      <div class="js-addBookmark-button addBookmark">
          <button>Add Bookmark</button>
        </div>
        <div class="js-filterRating filterRating">
            <select id="minimum-rating-filter" name="Minimum Rating">
                <option value="0" ${rating[0]}>Minimum Rating</option>
                <option value="5" ${rating[5]}><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></option>
                <option value="4" ${rating[4]}><span>☆</span><span>☆</span><span>☆</span><span>☆</span></option>
                <option value="3" ${rating[3]}><span>☆</span><span>☆</span><span>☆</span></option>
                <option value="2" ${rating[2]}><span>☆</span><span>☆</span></option>
                <option value="1" ${rating[1]}><span>☆</span></option>
            </select>
        </div>`;
    } else {
      return '';
    }

  }

  function generateRatingFilter(){
    const rating = store.ratingFilter;
    const answer = ['','','','','',''];
    answer[rating] = 'selected="selected"';
    return answer;
  }

  function generateRatingFilterRadio(id){
    const array = store.bookmarks;
    const bookmark = array.find(item => item.id === id);
    const rating = bookmark.rating;
    const answer = ['','','','','',''];
    answer[rating] = 'checked="checked"';
    return answer;
  }


  function render(){
    let bookmarks = store.bookmarks;

    $('.js-buttons').html(generateBookmarkTopBar());
    
    const ratingFilter = store.ratingFilter;
    bookmarks = store.bookmarks.filter(item => item.rating >= ratingFilter);


    console.log('render ran');
    const bookmarkItemsString = generateBookmarksString(bookmarks);
    $('.js-bookmarks').html(generateAddBookmarkElement()+bookmarkItemsString);

  }

  function getBookmarkIDFromElement(item){
    return $(item)
      .closest('.js-bookmark')
      .data('item-id');
  }


  function handleAddBookmarkClicked(){
    $('.js-buttons').on('click', '.js-addBookmark-button', event => {
      store.setAddingBookmark(true);
      render();
    });
  }

  function handleAddBookmarkExited(){
    $('.js-bookmarks').on('click', '.js-exit-add', event =>{
      store.setAddingBookmark(false);
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
      }, function(result){
        //retrieve actual error given by AJAX
        const x = JSON.parse(result.responseText);
        store.error = x.message;
      });

      store.addingBookmark = false;

    });
  }
 

  function handleFilterByRatingsClicked(){
    $('.js-buttons').on('change','.js-filterRating', event => {
      const newFilter = $(':selected').val();
      store.ratingFilter = newFilter;
      render();
    });
  }

  function handleExpandBookmarkClicked(){
    $('.js-bookmarks').on('click', '.js-bookmark-closed', event =>{
      const id = getBookmarkIDFromElement(event.currentTarget);
      store.setBookmarkIsExpanded(id, true);
      render();
    });
  }

  function handleExpandBookmarkClosed(){
    $('.js-bookmarks').on('click', '.js-exit-expanded',event =>{
      const id = getBookmarkIDFromElement(event.currentTarget);
      store.setBookmarkIsExpanded(id, false);
      render();
    });
  }

  function handleVisitWebsiteClicked(){
    $('.js-bookmarks').on('click', '.js-visitURL', event => {
      const id = getBookmarkIDFromElement(event.currentTarget);
      event.preventDefault();
      const bookmark = store.bookmarks.find(item => item.id ===id);
      const url = bookmark.url;
      openInNewTab(url);
    });
  }

  function openInNewTab(url){
    var win = window.open(url, '_blank');
    win.focus();
  }


  function handleEditBookmarkClicked(){
    $('.js-bookmarks').on('click', '.js-editBookmark-button', event =>{
      const id = getBookmarkIDFromElement(event.currentTarget);
      event.preventDefault();
      store.setBookmarkIsEditing(id, true);
      render();
    });
  }

  function handleEditBookmarkExit(){
    $('.js-bookmarks').on('click', '.js-exit-edit', event =>{
      const id = getBookmarkIDFromElement(event.currentTarget);
      console.log(event.currentTarget);
      event.preventDefault();
      store.setBookmarkIsEditing(id, false);
      render();
    });
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
    handleAddBookmarkExited();
    handleNewBookmarkSubmit();
    handleFilterByRatingsClicked();
    handleExpandBookmarkClicked();
    handleExpandBookmarkClosed();
    handleVisitWebsiteClicked();
    handleEditBookmarkClicked();
    handleEditBookmarkExit();
    handleRemoveBookmarkClicked();
  }

  return {
    render,
    bindEventListeners
  };

}());