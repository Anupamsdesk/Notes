//app.js
var Request = (function($){
	var makeRequest = function(url,cb,args){
		$.ajax({
			url: url,
			method: 'GET',
            dataType: 'text',
            async: false,
			success: function(data){
				console.log('succeeded!');		
				cb(null, data, args);
			},
			failure: function(err){
				cb(err,null);
			}	
		});	
	}
	return makeRequest;
})($);
var MockRequest = (function($){
	var makeRequest = function(url,cb){
		cb(null, '<h2>'+url+'</h2>');
	}
	return makeRequest;
})($);


var Views = {};
Views.DropDownListView = Backbone.View.extend({
	tagName: 'ul',
	className: 'dropdown-menu',
	render: function(){
		this.$el.html('');
		var self = this;		
		this.collection.forEach(function(d){
			console.log(d);
			var item;
			if (!self.clickHandler){
				item = new Views.DropDownListItemView({model: d});								
			}
			else{
				item = new Views.DropDownListItemView({model: d});	
				item.clickHandler = self.clickHandler;
			} 
			this.$el.append(item.render().$el);
		},this);
		return this;
	}
});
Views.DropDownListItemView = Backbone.View.extend({
	tagName: 'li',
	render: function(){
		var data = this.model.title;//get('title');
		var a = $('<a href="#"></a>');
		a.attr('data-key',this.model.file);
		a.html(data);		
		if (this.clickHandler){
			a.on('click', this.clickHandler);
		}else{
			console.log('clickHandler not found!');
		}
		this.$el.append(a);
		return this;
	}
});


var pageList = [
	{
		title: 'Backbone',
		file: 'backbone.html'
	},
	{
		title: 'Angular',
		file: 'angular.html'
	},
	{
		title: 'Grunt',
		file: 'grunt.html'
	},
];


var app = (function(Backbone,$,_,Request,pages){	
	var partialsPath = 'partials/backbone.html';
	var containerId = '#subContent';
	var render = function(err,data,cId){
		if (err) {
			console.log('Some error occured '+ err);
			return;
		}
		$(cId).html(data);
	}
	Request(partialsPath, render);
	//Request("partials/backbone/models.html", render, '#models');
	
	var clickHandler = function(evt){
		var elem = evt.currentTarget;
		var url = elem.getAttribute('data-key');
		console.log(url);
		var url = 'partials/'+url;
		Request(url,render,containerId);

	}
	var pagesMenuContainerId = '#pagesMenu';
	var vw = new Views.DropDownListView({
		collection: pages,
	});
	vw.clickHandler = clickHandler;

	$(pagesMenuContainerId).replaceWith(vw.render().$el);


	return{
		loadPage: function(url,containerId){
			url = 'partials/'+ url;
			Request(url, render, containerId);
		}
	}

})(Backbone,$,_,Request,pageList);

