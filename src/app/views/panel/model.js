import SidebarItemModel from './item-model';

const SidebarListModel = Backbone.Collection.extend({
	model: SidebarItemModel
});

module.exports = SidebarListModel;