

 let getRequest= url=> {
     return new Promise((resolve,reject)=> {
         let xhr = new XMLHttpRequest();
         xhr.open('get', url, true);
         xhr.onreadystatechange = () => {
             if (xhr.readyState !== 4) {
                 return;
             }
             if (xhr.status !== 200) {
                 reject('error');
                 return;
             }
             resolve(xhr.responseText);
         }

     });
 };
 ///getRequest().then();


 class Item{
     product_name='';
     price= 0;
     id_product  =0;
     img='';
     rendered =false;
     constructor(product,img = 'pics/img.png'){
         ({product_name:this.product_name, id_product:this.id_product,price:this.price}=product);
         this.img= img;
     }
     render(){
         this.rendered= true;
         return `<div class="product-item" data-id="${this.id_product}"> 
                <h3>${this.product_name}</h3>
                <img src="${this.img}" class="product-img">
                <p> Цена: ${this.price} руб. </p>
                <button class="add" data-id="${this.id_product}">Добавить</button>
            </div>
        `;
     }


 }

 class ProductItem extends Item{}

 class CartItem extends Item{
     quantity=0;
     constructor(product,img='pics/img_mini.png'){
         super(product,img);
         this.quantity =product.quantity;
     }

     changeCountItem(count){
         this.quantity+=count;
         this._updateItem();
     }


     render(){
         this.rendered= true;
         return `<div class="item-cart-list" data-id ="${this.id_product}">
                <table border="0" align="center" width="90%">
                <tr>
                <td id="img"><img src= "${this.img}" ></td>
                <td id="title">${this.product_name}</td>
                <td id="pricetItem">цена: ${this.price} </td>
                 <td id="countItem">Кол-во: ${this.quantity} </td>
                 <td id="summa"> ${this.price*this.quantity} руб. </td>
                <td><button  class="btn-del" data-id ="${this.id_product}" type="submit">x</button></td>
                </tr></table></div>  `;
     }
     _updateItem(){
         const blok = document.querySelector(`.item-cart-list[data-id="${this.id_product}"]`);
         blok.querySelector(`#countItem`).textContent=`Кол-во: ${this.quantity}`;
         blok.querySelector(`#summa`).textContent=`${this.price*this.quantity} руб.`;
     }
     removecartItem(){
         const blok = document.querySelector(`.item-cart-list[data-id="${this.id_product}"]`).remove();
     }

 }


 class List{
     static itemMap={
         Products:ProductItem,
         Cart:CartItem
     }
     static Api= `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;
     products=[];
     container= null;
     url= '';
     constructor(selector,url){
         this.container = document.querySelector(selector);
         this.url =url;
         this._init();

     }

     // плдучение данных
     getJson(url){
         return fetch(url?url:`${List.Api+this.url}`)
             .then(result=>result.json())
     }

     //обработка данных
     handleData(data){
         for(let item of data){
             const product = new List.itemMap[this.constructor.name](item);
             this.products.push(product);
          }
         this._render();
     }

     calcSum(){
         return this.products.reduce((accum,item) => accum += item.price,0);
     }
     //поиск элемента массива
     getItemId(id){
         return this.products.find(el => el.id_product === id);
     }

     _init(){}

     _render(){
         for(let product of this.products){
             if(product.rendered){
                 continue;
             }
             this.container.insertAdjacentHTML('beforeend',product.render());

         }
     }


 }


 class Products extends List{
    cart = null;
    filtered= [];
     constructor(cart,container = '.products',url="/catalogData.json"){
        super(container,url);
        this.cart=cart;
        this.getJson()
        .then(data => this.handleData(data));
    }
    filter(value){
         const regexp = new RegExp(value,'i');
         this.filtered= this.products.filter(el=>regexp.test(el.product_name));
         this.products.forEach(el => {
             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if(!this.filtered.includes(el)){
                block.classList.add('invisible');
            }else{
                block.classList.remove('invisible');
            }

        }
     )}

    _init(){
         this.container.addEventListener('click',e => {
             if(e.target.classList.contains('add')){
                 const id = +e.target.dataset['id'];
                 this.cart.addProduct(this.getItemId(id));

             }
         })
    document.querySelector('.search-form').addEventListener('submit',e=> {
        e.preventDefault();// останавливает  обработку клика по кнопке формы
        this.filter(document.querySelector('.search-field').value);
        })
     }


}

 class Cart extends List{
     constructor(container= '.list-cart',url = "/getBasket.json"){
         super(container,url);
         this.getJson()
             .then(data => this.handleData(data.contents));
     }

     addProduct(product){
        this.getJson(`${List.Api}/addToBasket.json`)
            .then(data=> {
                if (data.result){
                    let find =this.products.find(el => el.id_product === product.id_product);
                    if(find){
                        find.changeCountItem(1);
                        return;
                    }
                    let prod =Object.assign({quantity:1},product);
                    this.handleData([prod]);
                }
                else{
                    console.log('Error!');
                }

            })
     }

     removeProduct(product){
         this.getJson(`${List.Api}/deleteFromBasket.json`)
             .then(data=> {
                 if (data.result){
                     if(product.quantity >1){
                         console.log(product.quantity);
                         product.changeCountItem(-1);
                         return;
                     }
                     this.product.splice(this.product.index0f(product),1);
                     product.removecartItem();
                 }
                 else{
                     console.log('Error!');
                 }

             })
     }

     _init(){
         this.container.addEventListener('click',e => {
             if(e.target.classList.contains('btn-del')){
                 const id = +e.target.dataset['id'];
                 this.cart.removeProduct(this.getItemId(id));

             }
         })

         document.querySelector('.btn-cart').addEventListener('click', ()=>{
             this.container.classList.toggle('invisible');

         })
     }



 }


// вызов объектов
const cart =  new Cart();
const list = new Products(cart);
// list.getJson(`getProducts.json`).then(data=>list.handleData(Data));
