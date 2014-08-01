(function(window, document, undefined) {
  var EntryView = {};

  var entryviewTemplate = document.getElementById('entry-template');
  var renderEntryView = Handlebars.compile(entryviewTemplate.innerHTML);
  /* Renders an entry into the given $entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */
  EntryView.render = function($entry, activeEntryData) {
	EntryModel.loadAll(function(error,entries){
		if(!error){
		    var entryview = {
		    	viewing: true,
		    	entries: entries,
		    	activeEntryData: activeEntryData
		    }
		    var finalHTML = renderEntryView(entryview); //render view of current entry
		    $entry.html(finalHTML);

		    var $map = $('.map');  //get jQuery var for map for GoogleMapView
		    GoogleMapView.render($map,activeEntryData)

		    var newButton = document.getElementsByClassName('green new')[0]; //Use creating page when new is pressed
		  	newButton.addEventListener("click", function(event) {
		  		CreatingEntryView.render($entry);
		  	});

		  	var editButton = document.getElementsByClassName('teal edit')[0] //Use editing page when update is pressed
		  	editButton.addEventListener("click", function(event) {
		  		EditingEntryView.render($entry,activeEntryData);
		  	});

		  	var deleteButton = document.getElementsByClassName('red delete')[0] //Delete current entry and go to another entry if available
		  	deleteButton.addEventListener("click", function(event) {
				EntryModel.loadAll(function(error,delEntries){
					if(!error){
						EntryModel.remove(activeEntryData.id, function(err) {
				          	if (err) {
				            	var errorDiv = document.getElementsByClassName('error')[0];
				            	errorDiv.innerHTML = err;
				          	} else {
				          		var changed = false
				            	for (var i = 0; i < delEntries.length; i++) {
				              		if (delEntries[i].id != activeEntryData.id) { //if other entry has different id than current deleted entry
				                		EntryView.render($entry, delEntries[i]);  //render this entry and exit function
				                		changed = true
				                		break;
				              		}
				            	}
				            	if(!changed){
				            		CreatingEntryView.render($entry) //if no other entry, then render creating page
				            	}
			         		}
			        	});
					}
				});
		        
		  	});
		  	var $select = $('.dropdown').find('select');
			$select.change(function(event) {
				event.preventDefault();
			  	for(var i=0; i<entries.length;i++){
			  		if(entries[i].id == $select.val()){
					   	EntryView.render($entry, entries[i]); //render new entry when it is selected in dropdown
					    break;
			  		}
			  	}
			});
		}
	});
  };
  	

  window.EntryView = EntryView;
})(this, this.document);
