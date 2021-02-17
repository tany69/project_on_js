
const data = [
    { title: 'Notebook',id:1,price:2000},
    { title: 'Keyboard',id:2,price:200},
    { title: 'Mouse',id:3,price:100},
    { title: 'Gamepad',id:4, price:500},
    {id:5,price:1000},
    { title: 'Web camera', id:6, price:500}
];

const renderProduct=({title = 'Нет в наличии', price}, img='pics/img.png') => {
   return   `<div class="product-item"> 
                <h3>${title}</h3>
                <img src="${img}" class="product-img">
                <p> Цена: ${price} руб. </p>
                <button class="add">Добавить</button>
            </div>`

};


/*код программы который был выдан
const render = (products) => {
    const productsList= products.map(item=>renderProduct(item.title,item.id,item.price));
    console.log(productsList);
    document.querySelector('.products').innerHTML= productsList;

}*/
// тоже рабочий вариант
/*const render = (products) => {
    for(let i=0;i<products.length;i++){
        const productsList= renderProduct(products[i].title,products[i].id,products[i].price);
        document.querySelector('.products').innerHTML+= productsList;
    }
}*/
// поправленная функция. Запятая выводится  потому что innerHTML  выводит массив как строку и запятая это разделитель по умолчанию.
// я добавила JOIN для объединения строк массива через пробел
const render = (products) => {

    document.querySelector('.products').innerHTML= products.map(item => renderProduct(item)).join('');
    // const list = products.map(item=>renderProduct(item));
    // const el= document.querySelector('.products');
    // for (let product of list){
    //     el.insertAdjacentHTML('beforeend',product);
    // }


}

render(data);