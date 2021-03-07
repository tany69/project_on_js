import {Cart} from "./carts.js";
import {Products} from "./Products.js";
import {Search} from "./search.js";
import {errord} from "./errors.js";

const App = {
    components: {
        Cart,
        Products
    },
    data() {
        return {
            API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            userSearch: ''
        }
    },
    provide() {
        return {
            API: this.API,
            getJson: this.getJson,
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.errors.setError(error))
        }
    }
};

Vue.createApp(App).mount('#app');

