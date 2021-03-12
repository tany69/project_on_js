import {Cart} from "./carts.js";
import {Products} from "./Products.js";
import {Search} from "./search.js";
import {Errors} from "./errors.js";

const App = {
    components: {
        Cart,
        Products,
        Search,
        Errors
    },
    data() {
        return {
            //API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            userSearch: ''
        }
    },
    provide() {
        return {
            API: this.API,
            getJson: this.getJson,
            putJson: this.putJson,
            postJson: this.postJson,
             deleteJson:this.deleteJson
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.errors.setError(error))
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error))
        },
        putJson(url, data){
            console.log(url);
            console.log(data);
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error))
        },
        deleteJson(url, data){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error))
        }
    }
};

Vue.createApp(App).mount('#app');

