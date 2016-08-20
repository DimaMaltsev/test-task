import $ from 'jquery';
import Backbone from 'backbone';

import SideBarView from './views/sideBar';

var SideBar = require('./views/sideBar/');

export default Backbone.Router.extend({

	routes: {
		'': 'dashboard',
		'about': 'about'
	},

	initialize() {
		$('body').append('<div id="js-app"></div>');
	},

	dashboard() {
    /*var collection = new Backbone.Collection([
      {text: 'Some Text', url: '/items/1'},
      {text: 'Some other text', url: '/items/4'}
    ]);

    var view = new SideBar({
      collection: collection
    });
    $('#js-app').empty().append(view.render().el);*/

    var view = new SideBar();
    $('#js-app').empty().append(view.render().el);
    view.collection.add({
    	caption: 'Some Caption',
    	path: 'somePath'
    });
    view.collection.add({
    	caption: 'Some Caption1',
    	path: 'somePath1'
    });
    view.collection.add({
    	caption: 'Some Caption1',
    	path: 'somePath1'
    });
    view.collection.add({
    	caption: 'Some Caption1',
    	path: 'somePath1'
    });
    view.collection.add({
    	caption: 'Some Caption1',
    	path: 'somePath1'
    });
  }/*,

  about() {
    console.log('here1');
    var helloView = new SideBarView({
      template: _.template('Im the about page')
    }).render();

    $('#js-app').empty().append(helloView.$el);
}*/

});
