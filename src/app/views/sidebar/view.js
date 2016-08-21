import $ from 'jquery';
import _ from 'lodash';

import SidebarListModel from './model';
import SidebarItemView from './item-view/';

const panelTemplateHTML = require('./tpl.html');

const SidebarListView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'render', 'appendItem');

		this.collection = new SidebarListModel();
	},

	render: function() {
		$(this.el).append(panelTemplateHTML);

		this.collection.each(function(itemModel){
			this.appendItem(itemModel)
		}.bind(this));

		return this;
	},

	appendItem: function(item) {
		const itemView = new SidebarItemView({
			model: item
		});

		itemView.onClick = this.onItemClick.bind(this);

		$('ul', this.el).append(itemView.el);
	},

	onItemClick: function (item) {
		this._changeCategory(item);
	},

	enableCategory: function(path) {
		return this.collection.some(function(itemModel){
			const itemPath = itemModel.get('path');

			if(path === itemPath) {
				this._enableItem(itemModel);
				return true;
			}
		}.bind(this));
	},

	_changeCategory: function(categoryItem) {
		const path = categoryItem.model.get('path');

		this.trigger('categoryChange', path);
		//window.history.pushState('object or string', 'Title', '#/' + path + '/general');
	},

	_enableItem: function(itemModel) {
		this._disableAll();

		itemModel.set({
			'active': true
		});
	},

	_disableAll: function() {
		this.collection.each(function(itemModel){
			itemModel.set({
				'active': false
			});
		}, this);
	}
});

module.exports = SidebarListView;