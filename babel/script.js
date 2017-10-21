window.onload = function() {
  /*NAVIGATION*/

const colorLine = document.querySelector(".header__nav-line");
const links = document.querySelectorAll(".header__nav-link");
const colors = ["deepskyblue", "orange", "firebrick", "gold", "magenta", "black", "darkblue"];

  function mouseenterFunc() {
    if (!this.parentNode.classList.contains("active")) {
      for (let i = 0; i < links.length; i++) {
        if (links[i].parentNode.classList.contains("active")) {
          links[i].parentNode.classList.remove("active");
        }
        links[i].style.opacity = "0.25";
      }

      this.parentNode.classList.add("active");
      this.style.opacity = "1";

      const width = this.getBoundingClientRect().width;
      const height = this.getBoundingClientRect().height;
      const left = this.getBoundingClientRect().left;
      const top = this.getBoundingClientRect().top;
      const color = colors[Math.floor(Math.random() * colors.length)];

      colorLine.style.width = `${width}px`;
      colorLine.style.height = `${height}px`;
      colorLine.style.left = `${left}px`;
      colorLine.style.top = `${top}px`;
      colorLine.style.borderColor = color;
      colorLine.style.transform = "none";
    }
  }

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseenter", mouseenterFunc);
  }
  
/* AXIOS REQUEST TO JSON */

  const shop = document.querySelector('#shop');
        axios.get('../store.json')
      .then(function (response) {
    console.log(response);
    const data = response.data;
for (let i = 0, len = data.length; i < len; i++) {
 shop.insertAdjacentHTML('beforeEnd', `<div class='card' data-id='${data[i].id}' > 
                                               <div  class='card__img'><img class='card__img1' src='${data[i].img[0]}' alt='image'></div>
                                               <div> <h3 class='card__name'>${data[i].name}</h3>    
                                                     <h3 class='card__model'>${data[i].model}</h3> 
                                                     <span class='card__price'>${data[i].price}</span>
                                               </div> 
                                              <div class="quantity">
                                                <button class="plus-btn" type="button" name="button">+</button>
                                                <input class='inp' name="name" value="1" type="text">
                                                <button class="minus-btn" type="button" name="button">-</button>
                                                <div class="total-price" data-price='${data[i].price}' >${data[i].price}</div>
                                            </div>
                                           <button class='add'>add to basket</button>
                                          </div>`);
  }
})
  .catch(function (error) {
  console.log(error);
  });

/* INTERNET SHOP */
  let itemArr = [],
      summaButton = document.querySelector('.summa-button'),
      basket = document.querySelector('#basket');

shop.addEventListener('click', function(e){
       if (e.target.className === "minus-btn") { minusFun(e) }
  else if (e.target.className === "plus-btn") { plusFun(e) }
  else if (e.target.className === "add") { addFun(e) }
});
shop.addEventListener('input', function(e){
  if (e.target.className === "inp") { 
    var inp = e.target.closest('div').querySelector('.inp');

  var value = parseInt(inp.value);
  inp.setAttribute('value', value);
      var price = e.target.closest('div').querySelector('.total-price').getAttribute('data-price');
      var totalPrice = Math.round(price * value * 100) / 100;
      e.target.closest('div').querySelector('.total-price').innerHTML=totalPrice; }
});
function minusFun(e){
  var inp = e.target.closest('div').querySelector('.inp');
  var value = parseInt(inp.value);
  if (value >= 2) value-- ;
  inp.setAttribute('value', value);
    var price = e.target.closest('div').querySelector('.total-price').getAttribute('data-price');
    var totalPrice = Math.round(price * value * 100) / 100;
    e.target.closest('div').querySelector('.total-price').innerHTML = totalPrice;
}

function plusFun(e){
    x1(e)
  }
function x1(e) {
  var inp = e.target.closest('div').querySelector('.inp');
  var value = parseInt(inp.value);
  if (value> 0 && value < 100) value ++;
  inp.setAttribute('value', value);
      var price = e.target.closest('div').querySelector('.total-price').getAttribute('data-price');
      var totalPrice = Math.round(price * value * 100) / 100;
      e.target.closest('div').querySelector('.total-price').innerHTML=totalPrice;
}



  basket.addEventListener( 'click', function(e) {
    if (e.target.className === "elf") { 
      var z = e.target.closest('.item-new');
      var z1 = parseInt(z.getAttribute('data-id'));
      z.parentNode.removeChild(z);
      let remIndex = itemArr.indexOf(z1);
      itemArr.splice(remIndex , 1); 
    }
    else if (e.target.className === "minus-btn") { minusFun(e) }
    else if (e.target.className === "plus-btn") { plusFun(e) }
  })

  basket.addEventListener('input', function(e){
    if (e.target.className === "inp") { 
      var inp = e.target.closest('div').querySelector('.inp');
  var value = parseInt(inp.value);
  inp.setAttribute('value', value);
      var price = e.target.closest('div').querySelector('.total-price').getAttribute('data-price');
      var totalPrice = Math.round(price * value * 100) / 100;
      e.target.closest('div').querySelector('.total-price').innerHTML=totalPrice; }
  });

function addFun(e){
    var uniq = parseInt(e.target.closest('.item').getAttribute('data-id'));
    var price = e.target.closest('div').querySelector('.total-price').getAttribute('data-price')
    var inp = e.target.closest('div').querySelector('.total-price');
    var img1 = e.target.closest('div').querySelector('.image1').getAttribute('src');
    var value = parseInt(inp.textContent);    
    var inp = e.target.closest('div').querySelector('.inp');
      var value2 = parseInt(inp.value);
    if (itemArr.indexOf(uniq) == -1) {

      itemArr.push(uniq);

      basket.insertAdjacentHTML('beforeEnd', 
        `<div class="item item-new" data-id='${uniq}'>
          <div class="image">
            <img src="${img1}" alt="">
          </div>
          <div class="quantity">
            <button class="plus-btn" type="button" name="button">+</button>
            <input class='inp' name="name" value='${value2}' type="text">
            <button class="minus-btn" type="button" name="button">-</button>
            <div class="total-price"  data-price=${price}>${value}</div>
            <button class="elf">X</button>
          </div>
        </div>`
        );
    } else {
      var num = itemArr.indexOf(uniq);
      var oldItem = document.querySelectorAll('.item-new');
      var curItem = oldItem[num].querySelector('.total-price');
      var curinp = parseInt(oldItem[num].querySelector('.inp').value);
      curinp += value2;
      var curInput = oldItem[num].querySelector('.inp');
      curInput.setAttribute('value', curinp);
      console.log(curinp);
      curItem.textContent=parseInt(curItem.textContent) +value;
         }
    }





summaButton.addEventListener('click', sumFun);
 function sumFun() {
    let summa = document.querySelectorAll('.total-price');
    let summaArr = [].slice.call(summa);
    
    var res = summaArr.reduce(function(sum, current) { 
      return sum + parseFloat(current.textContent) ;       
    }, 0);
    var sum1 = document.querySelector('.summa');
    sum1.innerHTML = res;
  }
};

