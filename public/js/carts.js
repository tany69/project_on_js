import {CartItem} from "./cartItem.js";

export const Cart = {
    inject: ['API', 'getJson','postJson','putJson','deleteJson'],
    components: {
        CartItem
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
    computed: {
        CountItemCart() {
            let accum=0;
          for ( let el of this.cartItems){
              accum = accum + el.quantity;
          }
            return accum
            //не получилось через REDUCE  не поняла почему сругалось
           // return this.cartItems.reduce((accum,this.cartItems) => accum += this.cartItems.quantity, 0);
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            console.log(find);
            if (find) {
                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++
                        }
                    });
                return;
            }

            const prod = Object.assign( product,{quantity: 1});
            console.log(prod);
            this.postJson(`/api/cart`, prod)
                .then(data => {
                    console.log(data.result);
                    if (data.result) {
                        console.log(data);
                        this.cartItems.push(prod);
                    }
                });
        },

        delProduct(product){
                let find = this.cartItems.find(el => el.id_product === product.id_product);
                if (find.quantity> 1) {
                    this.deleteJson(`/api/cart/${find.id_product}`, { quantity: -1 })
                        .then(data => {
                            if (data.result) {
                                find.quantity--
                            }
                        });
                    return;
                }
                // //не работает этот блок
                this.deleteJson(`/api/cart/${find.id_product}`, { quantity: 0 })
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(find), 1);
                        }
                    });
           // this.cartItems.splice(this.cartItems.indexOf(find.id_product), 1);
        }
    },
    mounted() {
        this.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
            })
    },
    template: `
           <button class="btn-cart"  @click="isVisible = !isVisible">Корзина</button>
            <div class="list-cart"  :class="{invisible : isVisible}">
            <CartItem  v-for="item of cartItems" 
                            :key="item.id_product"
                            :img="imgCart"
                            :cartItem="item"
                            @remove="delProduct">
            
            </CartItem>
        <div>
                   <p>В корзине {{ CountItemCart }} товаров</p>
                   <p id="CartNull">{{ CountItemCart ? '': cartNullText}}</p>
               </div>
        </div>
    `
};