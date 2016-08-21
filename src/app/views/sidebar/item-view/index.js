import _ from 'lodash';

const itemTemplateHTML = require('./item.tpl.html');

const SidebarItemView = Backbone.View.extend({
	initialize: function () {
		_.bindAll(this, 'render');
		this.model.on('change', this._updateElementClass.bind(this));
		this.render();
	},

	render: function () {
		this._createElement();
		this._subscribeClickEvent();

		return this;
	},

	_updateElementClass: function() {
		const active = this.model.get('active') ? 'active' : '';
		$(this.el).attr('class', 'list-group-item ' + active);
	},

	_createElement: function() {
		const caption = this.model.get('caption');
		const active = this.model.get('active') ? 'active' : '';

		const compiledTemplate = _.template(itemTemplateHTML)({
			caption,
			active
		});

		this.setElement(compiledTemplate);
	},

	_subscribeClickEvent: function() {
		$(this.el).click(function(){
			this.onClick(this);
		}.bind(this));
	}
});

module.exports = SidebarItemView;