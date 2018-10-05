/* global $ */
'use strict';

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/sam';

  const getBookmarks = function(callback){
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createBookmark = function(title, url, desc, rating, callbackSuccess, callbackFail){
    const newBookmark = JSON.stringify({title, url, desc, rating});
    $.ajax(
      {
        url : `${BASE_URL}/bookmarks`,
        method : 'POST',
        dataType : 'json',
        contentType : 'application/json',
        data : newBookmark,
        success : callbackSuccess,
        error : callbackFail
      }
    );
  };

  const deleteBookmark = function(id, callback){ 
    $.ajax(
      {
        url : `${BASE_URL}/bookmarks/${id}`,
        method : 'DELETE', 
        dataType : 'json',
        contentType : 'application/json',
        success : callback
      }
    ); 

  };
  
  const updateBookmark = function(id, updateData, callback){
    updateData = JSON.stringify(updateData);
    $.ajax(
      {
        url : `${BASE_URL}/bookmarks/${id}`,
        method : 'PATCH', 
        dataType : 'json',
        contentType : 'application/json',
        data :  updateData,
        success : callback 
      }
    );
  };


  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
    updateBookmark
  };


}());