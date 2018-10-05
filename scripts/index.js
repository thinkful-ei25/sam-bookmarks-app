'use strict';
/* global bookmarks, store, api, $*/


$(document).ready(function() {
  bookmarks.bindEventListeners();
  api.getBookmarks((items)=> {
    
    //console.log('hello there');
    items.forEach((item) => store.addBookmark(item));
    bookmarks.render();
  });
});

