import $ from 'jquery';
import Backbone from 'backbone';

import data from 'json!./data.json';

const Sidebar = require('./components/sidebar/');
const Panel = require('./components/panel/');

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

	    this.sidebar.setData(data);
	    this.panel.setData(data);

	    this.currentCategoryPath = '';

	    $('#js-app')
	    	.empty()
	    	.append(this.sidebar.render().el)
	    	.append(this.panel.render().el);

	    this.sidebar.on('categoryChange', (path) => {
	    	this._navigateCategory(path);
	    });

	    this.panel.on('subCategoryChange', (subcategoryPath) => {
	    	this._navigateSubCategory(subcategoryPath);
	    });
	},

	home() {
	    const initialCategory = 'products';

	    this._navigateCategory(initialCategory);
 	},

 	setCategory(categoryPath, subCategoryPath) {
 		const categoryFound = this.sidebar.enableCategory(categoryPath);

 		if(!categoryFound) {
 			this.home();
 			return;
 		}

 		this.currentCategoryPath = categoryPath;
 		this.panel.enableCategory(categoryPath);
 		this.panel.enableSubCategory(subCategoryPath);
 	},

 	_navigateCategory(categoryPath) {
	    const initialSubCategory = 'general';
	    this.currentCategoryPath = categoryPath;

 		this._navigate(categoryPath, initialSubCategory);
 	},

 	_navigateSubCategory(subCategoryPath) {
 		this._navigate(this.currentCategoryPath , subCategoryPath);
 	},

 	_navigate(categoryPath, subCategoryPath) {
 		this.navigate('main/' + categoryPath + '/' + subCategoryPath, {trigger: true});
 	}
});
