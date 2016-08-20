import $ from 'jquery';
import _ from 'lodash';

import SidebarListModel from './model';
import SidebarItemView from './item-view/';

const panelTemplateHTML = require('./tpl.html');

const SidebarListView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'render', 'appendItem');

		this.collection = new SidebarListModel();
		this.collection.bind('add', this.appendItem);
	},

	render: function() {
		$(this.el).append(panelTemplateHTML);
		_(this.collection).each(function(item){
			this.appendItem(item);
		}, this);

		return this;
	},
	appendItem: function(item) {
		const itemView = new SidebarItemView({
			model: item
		});

		$('ul', this.el).append(itemView.el);
	}
});

module.exports = SidebarListView;