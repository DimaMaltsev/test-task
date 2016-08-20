const SidebarItemModel = Backbone.Model.extend({
	dafaults: {
		caption: 'Some Caption',
		path: 'somePath',
		active: true
	}
});

module.exports = SidebarItemModel;