import _ from 'lodash';

const panelTemplateHTML = require('./tpl.html');
const generalTabContentTemplateHTML = require('./tab-content-templates/general.tpl.html');
const addressesTabContentTemplateHTML = require('./tab-content-templates/addresses.tpl.html');
const ordersTabContentTemplateHTML = require('./tab-content-templates/orders.tpl.html');

const PanelView = Backbone.View.extend({
	initialize() {
		_.bindAll(this, 'render');

		this.data = {};
	},

	render() {
		$(this.el).append(panelTemplateHTML);
		$(this.el, 'a').click(function(event){
			if(!this._isValidClick(event)) {
				return;
			}

			this._onClick(event);
		}.bind(this))

		$(this.el).find('#general').html(generalTabContentTemplateHTML);
		$(this.el).find('#addresses').html(addressesTabContentTemplateHTML);
		$(this.el).find('#orders').html(ordersTabContentTemplateHTML);

		return this;
	},

	enableCategory(categoryPath) {
		const categoryData = this.data[categoryPath];

		['general', 'addresses', 'orders'].forEach((subCategoryPath) => {
			$(this.el).find('#' + subCategoryPath + ' #shipping').html(categoryData[subCategoryPath].shipping);
			$(this.el).find('#' + subCategoryPath + ' #billing').html(categoryData[subCategoryPath].billing);
			$(this.el).find('#' + subCategoryPath + ' #home').html(categoryData[subCategoryPath].home);
		});
	},

	enableSubCategory(subCategoryPath) {
		const selector = 'a[data-target="#' + subCategoryPath + '"]';

		$(selector).tab('show');
	},

	setData(data) {
		const result = {};

		data.forEach((dataEntry) => {
			result[dataEntry.categoryPath] = {
				addresses: dataEntry.addresses,
				general: dataEntry.general,
				orders: dataEntry.orders
			}
		});

		this.data = result;
	},

	_onClick(event) {
		const tabTarget = event.target.attributes['data-target'].value;
		const subCategoryPath = tabTarget.replace('#', '');

		this.trigger('subCategoryChange', subCategoryPath);
	},

	_isValidClick(event) {
		return !!event.target.attributes['data-target'];
	}
});

module.exports = PanelView;