import Backbone from 'backbone';
import Car from './car';

class CarList extends Backbone.Collection {
    
    constructor(options) {
        super(options);
        
        this.model = Car;
        
        this.url = 'https://api.parse.com/1/classes/car';
    }
    
    nextOrder() {
        if(!this.length) {
            return 1;
        }
        
        return this.last().get('order') + 1
    }
    
    comparator(car) {
        return car.get('order');
    }
    
    parse(data) {
        return data.results;
    }
    
    sync(method, collection, options) {
        options.beforeSend = function (xhr) {
            xhr.setRequestHeader('X-Parse-Application-Id', 'IvBZLAh4TFKfiG7vewerHgZpuWAjNMHowGSg2PMZ');
            xhr.setRequestHeader('X-Parse-REST-API-Key', 'kJbBe3wvZnh75A1GThWK15M27QomYQZhWxdIDTFO');
        };
        super.sync(method, collection, options);
    }
}

export default CarList;