import SidebarItemModel from './item-model';
import _ from 'lodash';

const SidebarListModel = Backbone.Collection.extend({
	model: SidebarItemModel
});

module.exports = SidebarListModel;