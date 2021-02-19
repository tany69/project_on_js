class Products {
    data=[];
    products=[];
    container= null;
    container_sum = null;
    summa=0;
    constructor(selector){
        this.container = document.querySelector(selector);
        this._fetchData();
        this._render();
        this._fetch_summa('.itog');
    }

    _fetchData(){
        this.data= [ { title: 'Notebook',id:1,price:2000},
            { title: 'Keyboard',id:2,price:200},
            { title: 'Mouse',id:3,price:100},
            { title: 'Gamepad',id:4, price:500},
            {id:5,price:1000},
            { title: 'Web camera', id:6, price:500}
        ];
    }

    _render(){
        for(let data of this.data){
            const product = new ProductItem(data);
            this.products.push(product);
            // подсчет суммы всех товаров
            this.summa +=product.price;
            this.container.insertAdjacentHTML('beforeend',product.render());

        }
    }
    _fetch_summa(selector){
        this.container_sum = document.querySelector(selector); // определяем новый контейнер где вставить строку
        console.log(this.container_sum); // в консоль выводиться
        console.log(this._render_all_summa()); // и это выводится
        this.container_sum.insertAdjencentHTML('afterbegin', this._render_all_summa()); // здесь выдает ошибку. я не понимаю почему!!!!
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
    constructor(product,img = 'pics/img.png'){
        ({title:this.title, id:this.id,price:this.price}=product);
        this.img= img;
    }
    render(){
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
//     _cartItemClick(){}   - метод  получения свойств элемента каталога, получение массива  с данными выбранного товара
//     _calcCountItems(){}  - метов подсчета количества всех товаров в корзине
//     _calcSumItems(){}    - метов подсчета суммы всех товаров в корзине
//     render(){}           - метов отображения корзины с элементами и кнопкой "Оформить заказ"
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

   // cartItemCounter(ItemId,flag){}- Метод счетчик товара в корзине, работает как калькулятор при клике на + или - для увеличения количества товара в корзине.
   // calcSumma(){} - метод подсчета суммы при увеличении/ уменьшении счетчика товара
   // cartItemDel(){}   - метод удаления товара из корзины.
   // render(){}        - метод  формирования блока кода  html  для вывода товара в корзине.
// }


