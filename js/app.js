//app.js

var app = (function(Backbone,$,_){
	console.log('Hello world!');
	var id = '_partial_backbone'
	
	var containerId = '#subContent';
	$.ajax({
			url: 'partials/backbone.html',
			method: 'GET',
            dataType: 'text',
            async: false,
			success: function(data){
				console.log('succeeded!');		
				$(containerId).html(data);
			},
			failure: function(){
				console.log('failed!');
			}	
		});
})(Backbone,$,_);

