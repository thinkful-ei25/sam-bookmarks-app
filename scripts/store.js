'use strict';

const store = (function(){

  const addBookmark = function(item){
    this.bookmarks.push(item);
    console.log('ran addBookmark');
  };
  
  const findById = function(id){
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndUpdate = function(id, newData){
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id );
  };

  const setBookmarkIsExpanded = function(id, isExpanded){
    const item = this.findById(id);
    item.isExpanded = isExpanded;
  };

  const setRatingFilter = function(ratingFilter){
    this.ratingFilter = ratingFilter;
  };

  const setAddingBookmark = function(addingBookmark){
    this.addingBookmark = addingBookmark;
  };

  return {
    bookmarks : [],
    ratingFilter : 0,
    error: '',
    addingBookmark : false,

    addBookmark,
    findById,
    findAndUpdate,
    findAndDelete,
    setBookmarkIsExpanded,
    setRatingFilter,
    setAddingBookmark
  };

}());