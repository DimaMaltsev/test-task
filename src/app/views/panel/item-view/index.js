import _ from 'lodash';

const itemTemplateHTML = require('./item.tpl.html');

const SidebarItemView = Backbone.View.extend({
	initialize: function () {
		_.bindAll(this, 'render');
		this.render();
	},
	render: function () {
		const caption = this.model.get('caption');
		const active = this.model.get('active') ? 'active' : '';

		const compiledTemplate = _.template(itemTemplateHTML)({
			caption,
			active
		});

		this.setElement(compiledTemplate);
		return this;
	}
});

module.exports = SidebarItemView;