const api=`https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;


let getRequest= (url,cb)=> {
    let xhr= new XMLHttpRequest();
    xhr.open('get',url,true);
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState !== 4){
            return;
        }
        if (xhr.status !==200){
            console.log('some err');
            return;
        }
        cb(xhr.responseText);
    }
};



class Products {
    products=[];
    container= null;
    container_sum = null;
    summa=0;
    constructor(selector){
        this.container = document.querySelector(selector);
        this._fetchData()
            .then(()=>this._render());
            //this.products._fetch_summa('.itog');

    }

    _fetchData(){
        return fetch(`${api}/catalogData.json`)
        .then(result => result.json())
        .then(data => {
            for(let product of data){
                this.products.push(new ProductItem(product));
            }
        })

    }

    _render(){
        for(let product of this.products){
            if(product.rendered){
                continue;
            }
            this.container.insertAdjacentHTML('beforeend',product.render());

        }
    }
    _fetch_summa(selector){
        this.container_sum = document.querySelector(selector);
        for(let i=0;i<this.products.length;i++) {
            this.summa += this.products[i].price;
        }
        this.container_sum.insertAdjacentHTML('afterbegin', this._render_all_summa());
    }

    _render_all_summa(){
        return `<p>Стоимость товаров в каталоге : ${this.summa}</p>`;
    }

}
console.log();
class ProductItem{
    title='';
    price= 0;
    id  =0;
    img='';
    rendered =false;
    constructor(product,img = 'pics/img.png'){
        ({product_name:this.title, id_product:this.id,price:this.price}=product);
        this.img= img;
    }
    render(){
        this.rendered= true;
        return `<div class="product-item"> 
                <h3>${this.title}</h3>
                <img src="${this.img}" class="product-img">
                <p> Цена: ${this.price} руб. </p>
                <button class="add">Добавить</button>
            </div>
        `;
    }


}
let list =new Products('.products');



//Задание 1
// создане класса для корзины
// class Cart{
//     listItem = [];  - массив  содержащий параметры товара (title, id, price,counytItem,img) -
//     container = null;
//     _calcCountItems(){}  - метов подсчета количества всех товаров в корзине
//     _calcSumItems(){}    - метов подсчета суммы всех товаров в корзине
//     сartItemAdd(){}    - метод для вывода выбранного товара. Выводиться будет последним
//     cartItemDel(){}   - метод удаления товара из корзины.
//     HideShowCart(){} - метод отображения и скрытия корзины
//     cartItemCounter(ItemId,flag){}- Метод счетчик товара в корзине, работает как калькулятор при клике на + или - для увеличения количества товара в корзине и считает сумму  товара
//
// }

//создание класса для элемента корзины
// class CartItem{
// title=''; -наименование элемента корзины
// price= 0; - цена элемента корзины
// id  =0; - уникальный номер элемента корзины
// img=''; - миниатюра изображение элемента корзины
// countItem = 0; - кол-во элементов в корзине
// constructor(product,count = 1,img = 'pics/img_mini.png'){
//     ({title:this.title, id:this.id,price:this.price}=product);
//     this.img= img;
//     this.countItem =count;
// }


// render(){}        - метод  формирования блока кода  html  для вывода товара в корзине.
// }