export const CartItem = {
    props: ['img', 'cartItem'],
    emits: ['delProduct'],
    template: `

            <div class="item-cart-list" >                  
                       
                        <img :src= "img" :alt="cartItem.product_name" >
                       <p class="cart-item" id="title">{{cartItem.product_name}}</p>
                       <p class="cart-item" id="pricetItem">цена: {{cartItem.price}} </p>
                        <p class="cart-item" id="countItem">Кол-во: {{cartItem.quantity}} </p>
                       <p class="cart-item" id="summa"> {{cartItem.price*cartItem.quantity}} руб. </p>
                        <button  class="btn-del" @click="$root.$refs.cart.delProduct(cartItem)" type="submit">&times;</button> 
                                      
            </div>
    `
};