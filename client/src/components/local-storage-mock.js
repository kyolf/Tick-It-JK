'use strict';

/////////////////////////////////////////////////////////////////////////////////////
///////////////          Local Storage Test File           /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Creating Local Storage Object for testing
export default class LocalStorageMock {
  //Every local storage object is defined with a store state
  constructor() {
    this.store = {};
  }

  //resets the localstorage state
  clear() {
    this.store = {};
  }

  //gets the item in the localStorage depending on the key
  //if no such key is defined return null
  getItem(key) {
    return this.store[key] || null;
  }

  //creates a key value pair in the store state
  setItem(key, value) {
    this.store[key] = value;
  }

  //remove the key value pair from the store state
  removeItem(key) {
    delete this.store[key];
  }
}