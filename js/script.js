"use strict";

window.onload = function () {

  var colorLine = document.querySelector(".header__nav-line");
  var links = document.querySelectorAll(".header__nav-link");
  var colors = ["deepskyblue", "orange", "firebrick", "gold", "magenta", "black", "darkblue"];

  function mouseenterFunc() {
    if (!this.parentNode.classList.contains("active")) {
      for (var i = 0; i < links.length; i++) {
        if (links[i].parentNode.classList.contains("active")) {
          links[i].parentNode.classList.remove("active");
        }
        links[i].style.opacity = "0.25";
      }

      this.parentNode.classList.add("active");
      this.style.opacity = "1";

      var width = this.getBoundingClientRect().width;
      var height = this.getBoundingClientRect().height;
      var left = this.getBoundingClientRect().left;
      var top = this.getBoundingClientRect().top;
      var color = colors[Math.floor(Math.random() * colors.length)];

      colorLine.style.width = width + "px";
      colorLine.style.height = height + "px";
      colorLine.style.left = left + "px";
      colorLine.style.top = top + "px";
      colorLine.style.borderColor = color;
      colorLine.style.transform = "none";
    }
  }

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseenter", mouseenterFunc);
  }

  var shop1 = document.querySelector('.shop');
  console.log(shop1);

  axios.get('../store.json').then(function (response) {
    console.log(response);
    var data = response.data;

    var btn = document.querySelectorAll('.btn');
    for (var _i = 0, len = btn.length; _i < len; _i++) {
      btn[_i].addEventListener('click', function () {
        // var attr = this.getAttribute('attr');

      });
    }
    for (var _i2 = 0, _len = data.length; _i2 < _len; _i2++) {
      console.log(data[_i2].model);

      shop1.insertAdjacentHTML('beforeEnd', "<p>" + data[_i2].model + "</p>");
    }
  }).catch(function (error) {
    console.log(error);
  });

  /* let itemArr = [],
       summaButton = document.querySelector('.summa-button'),
       basket = document.querySelector('#basket'),
       shop = document.querySelector('#shop');
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
   }*/
};