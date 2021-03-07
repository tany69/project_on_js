import {CartItem} from "./cartItem.js";

export const Cart = {
    inject: ['API', 'getJson'],
    components: {
        cartItem
    },
    data() {
        return {
            isVisible: true,
            cartUrl: '/getBasket.json',
            imgCart: 'pics/img_mini.png',
            cartItems: [],
            cartNullText: "Корзина пуста!"
        }
    },
    methods: {
        addProduct(product) {
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    }
                })
        },
        delProduct(product){
            this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.getJson(`${this.API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
           <button class="btn-cart"  @click="isVisible = !isVisible">Корзина</button>
            <div class="list-cart"  :class="{invisible : isVisible}">
            <cartItem  v-for="item of cartItems" 
                            :key="item.id_product"
                            :img="imgCart"
                            :cartItem="item"
                            @remove="delProduct">
            
            </cartItem>
        <div>
                   <p>В корзине {{ CountItemCart }} товаров</p>
                   <p id="CartNull">{{ cartItems.length ? '': cartNullText}}</p>
               </div>
        </div>
    `
};