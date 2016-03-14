import Backbone from 'backbone';

class Car extends Backbone.Model {
    defaults() {
        return {
            objectId: '',
            model: '',
            maker: ''
        }
    }
}

export default Car;