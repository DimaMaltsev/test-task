import _ from 'lodash';

const itemTemplateHTML = require('./item.tpl.html');

const SidebarItemView = Backbone.View.extend({
	initialize() {
		_.bindAll(this, 'render');
		this.model.on('change', this._updateElementClass.bind(this));
		this.render();
	},

	render() {
		this._createElement();
		this._subscribeClickEvent();

		return this;
	},

	_updateElementClass() {
		const active = this.model.get('active') ? 'active' : '';
		$(this.el).attr('class', 'list-group-item ' + active);
	},

	_createElement() {
		const caption = this.model.get('caption');
		const active = this.model.get('active') ? 'active' : '';

		const compiledTemplate = _.template(itemTemplateHTML)({
			caption,
			active
		});

		this.setElement(compiledTemplate);
	},

	_subscribeClickEvent() {
		$(this.el).click(() => this.onClick(this));
	}
});

module.exports = SidebarItemView;