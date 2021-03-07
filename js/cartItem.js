export const CartItem = {
    props: ['img', 'cartItem'],
    emits: ['delProduct'],
    template: `

            <div class="item-cart-list" >
                    <div>
                        <img :src= "img" :alt="cartItem.product_name" >
                        <p id="title">{{cartItem.product_name}}</p>
                        <p id="pricetItem">����: {{cartItem.price}} </p>
                        <p id="countItem">���-��: {{cartItem.quantity}} </p>
                        <p id="summa"> {{cartItem.price*cartItem.quantity}} ���. </p>
                        <button  class="btn-del" @click="$emit('delProduct',cartItem)" type="submit">&times;</button>
                    </div>
            </div>
    `
};