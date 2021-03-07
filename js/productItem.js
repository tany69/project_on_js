export const ProductItem = {
    props: ['img', 'product'],
    template: `
    <div class="product-item" >
                    <img :src="img" :alt="product.product_name">
                    <div>
                        <h3>{{product.product_name}}</h3>
                        <p> ����:{{product.price}}</p>
                        <button class="add" @click="$root.$refs.cart.addProduct(product)">������</button>
                    </div>
                </div>
    
    `
};