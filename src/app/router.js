import $ from 'jquery';
import Backbone from 'backbone';

const Sidebar = require('./views/sidebar/');
const Panel = require('./views/panel/');

export default Backbone.Router.extend({

	routes: {
		'': 'home'
	},

	initialize() {
		$('body').append('<div class="row" id="js-app"></div>');
	},

	home() {
	    const sidebar = new Sidebar();
	    const panel = new Panel();

	    $('#js-app')
	    	.empty()
	    	.append(sidebar.render().el)
	    	.append(panel.render().el);

	    sidebar.collection.add({
	    	caption: 'Some Caption',
	    	path: 'somePath'
	    });
	    sidebar.collection.add({
	    	caption: 'Some Caption1',
	    	path: 'somePath1'
	    });
	    sidebar.collection.add({
	    	caption: 'Some Caption1',
	    	path: 'somePath1'
	    });
	    sidebar.collection.add({
	    	caption: 'Some Caption1',
	    	path: 'somePath1'
	    });
	    sidebar.collection.add({
	    	caption: 'Some Caption1',
	    	path: 'somePath1'
	    });
	    panel.collection.add({
	    	caption: 'Some Caption',
	    	path: 'somePath'
	    });
 	}
});
