import SidebarItemModel from './item-model';
import _ from 'lodash';

const SidebarListModel = Backbone.Collection.extend({
	model: SidebarItemModel,

	initialize: function () {
		const sidebarItems = [
			{
		    	caption: 'Products',
		    	path: 'products'
		    },
		    {
		    	caption: 'Customers',
		    	path: 'customers'
		    },
		    {
		    	caption: 'Orders',
		    	path: 'orders'
		    },
		    {
		    	caption: 'News',
		    	path: 'news'
		    }
	    ];

	    console.log(sidebarItems)
		
		_.each(sidebarItems, function(item) {
			this.add(item);
		}.bind(this));
	}
});

module.exports = SidebarListModel;