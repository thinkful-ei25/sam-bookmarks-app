'use strict';

const store = (function(){

  const addBookmark = function(item){
    const newItem = {
      id: item.id,
      title: item.title,
      url : item.url,
      desc : item.desc,
      rating : item.rating,
      expanded : false,
      isEditing : false
    };
    this.bookmarks.push(newItem);
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
    this.bookmarks = this.bookmarks.filter(item => item.id !== id );
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

  const setBookmarkIsEditing= function (id, isEditing){
    const item = this.findById(id);
    item.isEditing = isEditing;
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
    setAddingBookmark,
    setBookmarkIsEditing
  };

}());