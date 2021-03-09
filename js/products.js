import {ProductItem} from "./productItem.js";
import {Search} from "./search.js";

 export const Products = {
     inject: ['API', 'getJson'],
     components: {
         ProductItem
     },
     data() {
         return {
             catalogUrl: '/catalogData.json',
             products: [],
             imgCatalog: 'pics/img.png'
         }
     },
     computed: {
         filtered() {
             return this.products.filter(el => new RegExp(this.$root.$refs.search.userSearch, 'i').test(el.product_name));
         }
     },
     mounted() {
         this.getJson(`${this.API + this.catalogUrl}`)
             .then(data => {
                 for (let el of data) {
                     this.products.push(el)
                 }
             })
         // this.getJson(`getProducts.json`)
         //     .then(data => {
         //         for (let el of data) {
         //             this.products.push(el);
         //         }
         //     })
     },
     template: `
        <div class="products">
                <ProductItem 
                v-for="el of filtered" 
                :key="el.id_product"
                :img="imgCatalog"
                :product="el"
                >
                </ProductItem>
            </div>
    `
 }