import Backbone from 'backbone';

class Folder extends Backbone.Model {
    constructor(options) {
        super(options);
        
        this.id = null;
        this.idAttribute = 'objectId';
    }
    
    url() {
    	console.log('url', this.id);
    	var url = 'https://api.parse.com/1/classes/list/';
    	if(this.id) {
	        return url + this.id;
    	}
    	
    	return url;
    }
    
    defaults() {
        return {
            objectId: null,
            name: null,
            parent: null,
            isTerminam: false
        }
    }
    
    sync(method, model, options) {
        options.beforeSend = function (xhr) {
            xhr.setRequestHeader('X-Parse-Application-Id', 'IvBZLAh4TFKfiG7vewerHgZpuWAjNMHowGSg2PMZ');
            xhr.setRequestHeader('X-Parse-REST-API-Key', 'kJbBe3wvZnh75A1GThWK15M27QomYQZhWxdIDTFO');
        };
        super.sync(method, model, options);
    }
}

export default Folder;