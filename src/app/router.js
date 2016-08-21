import $ from 'jquery';
import Backbone from 'backbone';

const Sidebar = require('./views/sidebar/');
const Panel = require('./views/panel/');

export default Backbone.Router.extend({

	routes: {          
		'': 'home',
		'main/:categoryName/:subCategoryName': 'setCategory',
		'*other': 'home'
	},

	initialize() {
		$('body').append('<div class="row" id="js-app"></div>');

		this.sidebar = new Sidebar();
	    this.panel = new Panel();

	    $('#js-app')
	    	.empty()
	    	.append(this.sidebar.render().el)
	    	.append(this.panel.render().el);

	    this.sidebar.on('categoryChange', (path) => {
	    	this.navigateCategory(path);
	    });
	},

	home() {
	    const initialCategory = 'products';

	    this.navigateCategory(initialCategory);
 	},

 	setCategory(categoryName, subCategoryName) {
 		const categoryFound = this.sidebar.enableCategory(categoryName);

 		if(!categoryFound) {
 			this.home();
 		}
 	},

 	navigateCategory(categoryPath) {
	    const initialSubCategory = 'general';

 		this.navigate('main/' + categoryPath + '/' + initialSubCategory, {trigger: true});
 	}
});
