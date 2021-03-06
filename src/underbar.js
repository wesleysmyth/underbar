/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.slice(array.length-n < 0 ? 0 : array.length-n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0, x = collection.length; i < x; i+=1) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
          iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // create newArr to push passed elements
    var newArr = [];
    // if array
    if (Array.isArray(collection)){
      for (var i = 0, x = collection.length; i < x; i+=1) {
        if (test(collection[i])) {
          newArr.push(collection[i]);
        }
      }
    } else { //if object
      for (var key in collection) {
        if (test(collection[key])) {
          newArr.push(collection[key]);
        }
      }
    }
    return newArr;
    /* 
      OR... using _.each
      var newArr = [];
    _.each(collection, function (value) {
      if (test(value)) {
        newArr.push(value);
      }
    });
    return newArr;
    */
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var antiTest = function(value) {
      return !test(value);
    }
    return _.filter(collection, antiTest);
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // create newArr to push unique values to
    var newArr = [];
    // loop over array and push unique values to newArr
    for (var i = 0, x = array.length; i < x; i+=1) {
      if (newArr.indexOf(array[i]) < 0) {
        newArr.push(array[i]);
      }
    }
    return newArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(value) {
      result.push(iterator(value));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    // if functionOrKey === "function"
    if (typeof functionOrKey === "function") {
      return _.map(collection, function(item) {
        return functionOrKey.apply(item, args);
      });
    } else { // else, functionOrKey would be a method
      return _.map(collection, function(item) {
        return item[functionOrKey].apply(item, args);
      });
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    var firstElement = Array.isArray(collection) ? collection[0] : Object.keys(collection)[0];
    var result = accumulator === undefined ? firstElement : accumulator;
    _.each(collection, function(item){
      result = iterator(result, item);
    });
    return result;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    // If no iterator is given, we will set the iterator function to _.identity, which will just return the item
    if (iterator === undefined) {
      iterator = _.identity;
    }
    return _.reduce(collection, function(passed, current){
      return iterator(current) ? passed : false;
    },true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // If false is returned from the statement below (since at least one element passed the every test), this reverses the false to true
    return !_.every(collection, function(item){  
    // If no iterator is given, we will set the iterator function to _.identity, which will just return the item
    if (iterator === undefined){
      iterator = _.identity;
    }
    // if any element passes every as truthful, the opposite (false) will be returned...
    return !iterator(item);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var result = arguments[0];
    for (var i = 1, x = arguments.length; i < x; i+=1) {
      for (var key in arguments[i]){
        result[key] = arguments[i][key];
      }
    }
    return result;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var result = arguments[0];
    for (var i = 1, x = arguments.length; i < x; i+=1) {
      for (var key in arguments[i]) {
        if (result[key] === undefined) {
          result[key] = arguments[i][key];
        }
      }
    }
    return result;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memo = {};
    function check(f) {
      var value;
      if (f in memo) {
         value = memo[f];
      } else {
        value = func.apply(this, arguments);
        memo[f] = value;
      }
      return value;
    }
    return check;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments,2); // Get arguments
    return setTimeout(function(){
      return func.apply(null, args);  // pass in sliced arguments array with apply
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var newArr = array.slice();  //copy of array
    return newArr.sort(function() {  // returns a positive number or negative number 50% of the time
      return Math.random() - 0.5;
    });
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    return collection.sort(function(a,b){
      if (typeof iterator === "string") {
        return a[iterator] - b[iterator];
      } else {
        return iterator(a) - iterator(b);
      }
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = arguments;
    var length = args.length;
    var results = [];
    var item;
    for (var i = 0; i < length; i++) {
      item = _.map(args, function(arg) {
        return arg[i];
      });
      results.push(item);
    }
    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var results = [];
    results = results.concat.apply(results, nestedArray);
    for (var i = 0, x = results.length; i < x; i++) {
      if (Array.isArray(results[i])) {
        return _.flatten(results, result);
      }
    }
    return results;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  // _.intersection = function() {
  //   var args = arguments;
  //   var length = args.length;
  //   var results = args[0];
  //   for (var i = 1; i < length; i++) {
  //     for (var j = 0, x = results.length; j < x; j++) {
  //       if (args[i].indexOf(results[j]) < 0) {
  //         results.splice(results.indexOf(results[j]), 1);
  //       }
  //     }
  //   }
  //   return results;
  // };
  _.intersection = function() {
    var args = arguments;
    var length = args.length;
    var results = args[0];
    for (var i = 1; i < length; i++) {
      var arg = args[i];
      var nextResult = [];
      for (var j = 0, x = arg.length; j < x; j++){
        if (results.indexOf(arg[j]) >= 0){
          nextResult.push(arg[j]);
        }
      }
      results = nextResult;
    }
    return _.uniq(results);
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = arguments;
    var length = args.length;
    var results = array;
    for (var i = 1; i < length; i++) {
      var arg = args[i];
      var nextResult = [];
      for (var j = 0, x = results.length; j < x; j++){
        if (arg.indexOf(results[j]) < 0) {
          nextResult.push(results[j]);
        }
      }
      results = nextResult;
    }
    return results;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var waiting = false;
    var result;
    return function (){
      if (!waiting){
        waiting = true;
        result = func.apply(this,arguments);
        setTimeout(function(){
          waiting = false;
        },wait);
      } else {
        setTimeout(function(){
          waiting = true;
          result = func.apply(this,arguments);
          return result;
        },wait);
      }
      return result;
    };
  };

}).call(this);
