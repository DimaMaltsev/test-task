import $ from 'jquery';
import _ from 'lodash';

import SidebarListModel from './model';
import SidebarItemView from './item-view/';

const panelTemplateHTML = require('./tpl.html');

const SidebarListView = Backbone.View.extend({
	initialize() {
		_.bindAll(this, 'render', '_appendItem');

		this.collection = new SidebarListModel();
	},

	render() {
		$(this.el).append(panelTemplateHTML);

		this.collection.each((itemModel) => this._appendItem(itemModel));

		return this;
	},

	setData(data) {
		data.forEach((dataEntry) => {
			const item = {
				caption: dataEntry.categoryName,
				path: dataEntry.categoryPath,
				active: false
			}
			
			this.collection.add(item);
		});
	},

	enableCategory(path) {
		return this.collection.some((itemModel) => {
			const itemPath = itemModel.get('path');

			if(path === itemPath) {
				this._enableItem(itemModel);
				return true;
			}
		});
	},

	_appendItem(item) {
		const itemView = new SidebarItemView({
			model: item
		});

		itemView.onClick = (item) => this._changeCategory(item);

		$('ul', this.el).append(itemView.el);
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
		this.collection.each((itemModel) => this._updateItemActivity(itemModel, false));
	},

	_updateItemActivity(itemModel, isActive) {
		itemModel.set({ 'active': isActive });
	}
});

module.exports = SidebarListView;