'use strict';

function saveToStorage(key, val) {// getts a key and a value
    localStorage.setItem(key, JSON.stringify(val))//creates the item in the storage//turns the value into a string because the storage only has strings
}

function loadFromStorage(key) {// gets akey
    var val = localStorage.getItem(key)// gets the value of the key from the storage
    return JSON.parse(val)// turns the value back to an object
}


