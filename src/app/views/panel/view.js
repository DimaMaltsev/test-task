//import $ from 'bootstrap-jquery';
import _ from 'lodash';

import SidebarListModel from './model';
import SidebarItemView from './item-view/';

const panelTemplateHTML = require('./tpl.html');

const SidebarListView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'render');
	},

	render: function() {
		$(this.el).append(panelTemplateHTML);

		return this;
	}
});

module.exports = SidebarListView;