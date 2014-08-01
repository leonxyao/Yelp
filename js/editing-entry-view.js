(function(window, document, undefined) {
  var EditingEntryView = {};
  
  var entryviewTemplate = document.getElementById('entry-template');
  var renderEntryView = Handlebars.compile(entryviewTemplate.innerHTML);
  /* Renders a view to allow the user to edit an entry. Requires the $entry
   * element and an object representing the active entry. */
  EditingEntryView.render = function($entry, activeEntryData) {
    var entryview = {
    	editing: true,
    	entries: null,
    	activeEntryData: null
    }
    var finalHTML = renderEntryView(entryview);
    $entry.html(finalHTML); 
    var editButton = document.getElementsByClassName('teal update')[0]; //same as creating-entry-view but for edit
    editButton.addEventListener("click", function(event) {
  		var name = document.getElementsByName('name')[0].value;
  		var address = document.getElementsByName('address')[0].value;
  		var description = document.getElementsByName('description')[0].value;
  		var id = activeEntryData.id
  		entry = {
  			address: address,
  			name: name,
  			description: description,
  			id: id
  		};
  		EntryModel.update(entry, function(error) {
			if (error) {
				var errorDiv = document.getElementsByClassName('error')[0];
		        errorDiv.innerHTML = error;
			} else {
				EntryView.render($entry,entry)
			}
		});
  	});
  };

  window.EditingEntryView = EditingEntryView;
})(this, this.document);
