import $ from 'jquery';
import _ from 'lodash';

import SidebarListModel from './model';
import SidebarItemView from './item-view/';

const panelTemplateHTML = require('./tpl.html');

const SidebarListView = Backbone.View.extend({
	initialize() {
		_.bindAll(this, 'render', 'appendItem');

		this.collection = new SidebarListModel();
	},

	render() {
		$(this.el).append(panelTemplateHTML);

		this.collection.each(function(itemModel){
			this.appendItem(itemModel)
		}.bind(this));

		return this;
	},

	appendItem(item) {
		const itemView = new SidebarItemView({
			model: item
		});

		itemView.onClick = this.onItemClick.bind(this);

		$('ul', this.el).append(itemView.el);
	},

	onItemClick(item) {
		this._changeCategory(item);
	},

	enableCategory(path) {
		return this.collection.some(function(itemModel){
			const itemPath = itemModel.get('path');

			if(path === itemPath) {
				this._enableItem(itemModel);
				return true;
			}
		}.bind(this));
	},

	_changeCategory(categoryItem) {
		const path = categoryItem.model.get('path');

		this.trigger('categoryChange', path);
	},

	_enableItem(itemModel) {
		this._disableAll();

		this._updateItemActivity(itemModel, true);
	},

	_disableAll() {
		this.collection.each(function(itemModel){
			this._updateItemActivity(itemModel, false);
		}, this);
	},

	_updateItemActivity(itemModel, isActive) {
		itemModel.set({ 'active': isActive });
	}
});

module.exports = SidebarListView;