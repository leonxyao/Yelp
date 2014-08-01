(function(window, document, undefined) {
  var EntryModel = {};

  var ENTRIES_URL = 'http://callbackjs.me:4155/entries';
  var STATUS_OK = 200;

  // XHR request finished code
  var REQUEST_DONE = 4;

  /* Load all entries from the server. Call successCallback on success,
   * and errorCallback on error.
   *
   * Calls: callback(error, entries)
   *  error -- the error that occurred or NULL if no error occurred
   *  entries -- an array of entries
   */
  EntryModel.loadAll = function(callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      if(this.status === STATUS_OK){
        var entries = JSON.parse(this.responseText);
        callback(null,entries)
      }else{
        callback(this.responseText);
      }
    });
    request.open('GET',ENTRIES_URL,true);
    request.send();
  };


  /* Add the given entry to the list of entries. The entry must *not* have
   * an id associated with it.
   *
   * Calls: callback(error, entry)
   *  error -- the error that occurred or NULL if no error occurred
   *  entry -- the entry added, with an id attribute
   */
  EntryModel.add = function(entry, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      if(this.status === STATUS_OK){
        var response = JSON.parse(this.responseText);
        callback(null,response)
      }else{
        callback(this.responseText);
      }
    });
    request.open('POST',ENTRIES_URL,true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(entry));
    console.log('sent')
  };



  /* Update the given entry. The entry must have an id attribute that
   * identifies it.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or NULL if no error occurred
   */
  EntryModel.update = function(entry, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      if(request.status === STATUS_OK){
        callback(null)
      }else{
        callback(request.responseText);
      }
    });
    request.open('POST',ENTRIES_URL+'/'+entry.id,true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(entry));
  };

  /* Deletes the entry with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or NULL if no error occurred
   */
  EntryModel.remove = function(id, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
      if(request.status === STATUS_OK){
        callback(null)
      }else{
        callback(request.responseText);
      }
    });
    request.open('POST',ENTRIES_URL+'/'+id+'/delete',true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    console.log('Deleted this entry')
  };



  window.EntryModel = EntryModel;
})(this, this.document);
