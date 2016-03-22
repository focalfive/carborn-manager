import Backbone from 'backbone';

class Folder extends Backbone.Model {
    constructor(options) {
        super(options);
        
        this.id = null;
    }
    
    url() {
    	if(this.id) {
	        return 'https://api.parse.com/1/classes/list/' + this.id;
    	}
    	
    	return null;
    }
    
    defaults() {
        return {
            objectId: '',
            name: ''
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