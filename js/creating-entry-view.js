(function(window, document, undefined) {
  var CreatingEntryView = {};

  var entryviewTemplate = document.getElementById('entry-template');
  var renderEntryView = Handlebars.compile(entryviewTemplate.innerHTML);
  /* Renders a view to allow the user to create an entry. Requires the $entry
   * element. */
  CreatingEntryView.render = function($entry) {
    var entryview = {
    	creating: true,
    	entries: null,
    	activeEntryData: null
    }
    var finalHTML = renderEntryView(entryview);
    $entry.html(finalHTML);
    var addButton = document.getElementsByClassName('green add')[0]; //when add pressed get typed in information
    addButton.addEventListener("click", function(event) { //find name, address. and description from HTML after it is typed in
  		var name = document.getElementsByName('name')[0].value;
  		var address = document.getElementsByName('address')[0].value;
  		var description = document.getElementsByName('description')[0].value;
  		entry = {
  			address: address,
  			name: name,
  			description: description
  		};
  		EntryModel.add(entry, function(error, activeEntryData) { //add the entry to server
			if (error) {
				var errorDiv = document.getElementsByClassName('error')[0];
		        errorDiv.innerHTML = error;
			} else {
				EntryView.render($entry,activeEntryData)
			}
		});
  	});
  };

  window.CreatingEntryView = CreatingEntryView;
})(this, this.document);
