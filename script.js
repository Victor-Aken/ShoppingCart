


let productsContainer = document.getElementById('products-container');
let cartItemsContainer = document.getElementsByClassName('containItems')[0];


let id = 1;
let generateId = () => id++;

let productsItemData = [
     {
        id: generateId(),
        name: "Men's Bullock Leather Shoe",
        price: 39.60,
        rating: "4.5(145)",
        ref: "Reference 1204",
        img: "shopping cart img/Crocodile Pattern Mens Bullock Leather Shoes Oxford Formal Shoes Retro Black-19,500Naira.jpg"
     },
     {
        id: generateId(),
        name: "Men Sneakers Lace Up",
        price: 13.80,
        rating: "3.5(77)",
        ref: "Reference 2204",
        img: "shopping cart img/Men Sneakers Running Shoes Lace-up Sport Shoes 6,900N.jpg"
     },
     {
        id: generateId(),
        name: "Men's New Work Shoes-black",
        price: 22.99,
        rating: "4.5(1455)",
        ref: "Reference 1200",
        img: "shopping cart img/Men's New Work Shoes-black 11,390N.jpg"
     },
     {
        id: generateId(),
        name: "Mens Bullock Leather",
        price: 37.20,
        rating: "4.5(145)",
        ref: "Reference 1004",
        img: "shopping cart img/Crocodile Pattern Mens Bullock Leather Shoes Oxford Formal Shoes Retro Big Size 18,600N.jpg"
     },

     {
        id: generateId(),
        name: "Men Breathable Sneakers",
        price: 11.99,
        rating: "3.0(135)",
        ref: "Reference 1409",
        img: "shopping cart img/Men's Casual Shoes Breathable Shoes Running Sneakers 5,500N.jpg"
     },

     {
        id: generateId(),
        name: "Girls' Sneakers Black",
        price: 9.40,
        rating: "3.5(145)",
        ref: "Reference 3004",
        img: "shopping cart img/Girls Sneakers 4,700N.jpg"
     },
     {
        id: generateId(),
        name: "Men Breathable Mesh Shoes",
        price: 17.40,
        rating: "4.5(1200)",
        ref: "Reference 1054",
        img: "shopping cart img/Men Breathable Mesh Shoes Loafers Sneakers Formal Shoes 8,700N.jpg"
     },

     {
        id: generateId(),
        name: "Ladies Casual Sneakers",
        price: 8.99,
        rating: "4.5(145)",
        ref: "Reference 1704",
        img: "shopping cart img/Ladies Casual Sneakers Breathable Fitness Sport 4,200N.jpg"
     },

     {
        id: generateId(),
        name: "Men Sneakers Running Shoes",
        price: 13.99,
        rating: "4.0(184)",
        ref: "Reference 1078",
        img: "shopping cart img/Casual Shoes Sports Sneakers 10,000N.jpg"
     },
     
     {
        id: generateId(),
        name: "Men Suede Leather",
        price: 28.00,
        rating: "4.5(145)",
        ref: "Reference 1904",
        img: "shopping cart img/Men Suede Leather Formal Business Shoes Brown 14,000N.jpg"
     },

     {
        id: generateId(),
        name: "Casual Shoes Sneakers",
        price: 15.38,
        rating: "3.0(145)",
        ref: "Reference 1044",
        img: "shopping cart img/Men's Hiking Shoes Casual Shoes Sneakers + Free Socks (Green) 7,690N.jpg"
     },
     {
        id: generateId(),
        name: "Men's New Bright Leather",
        price: 21.16,
        rating: "4.5(1405)",
        ref: "Reference 1304",
        img: "shopping cart img/Men's New Bright Leather Work Business Pointed Toe Shoes 10,580N.jpg"
     }
    ]

let itemsAddedToCart = JSON.parse(localStorage.getItem("dataInCart")) || [];


    function generateProduct(){
        return productsContainer.innerHTML = productsItemData.map( function(items){
           let { id, name, img, ref, rating, price} = items;
            return `
           <div class="products" id="${ id }" >
            <img src="${ img }" alt="" class="product-img">
            <div class="display-in-cart">
                Item in Cart!
            </div>
            <div class="product-details">
                <p class="product-rating">${ rating }</p>
                <h2 class="product-name">${name}</h2>
                <p class="reference">${ ref }</p>
                <h2 class="product-price">$${ price}</h2>
                <button class="add-btn" id="add-btn">
                    Add to Cart
                </button> 
            </div>
        </div>
           `
        }).join("");
    };
    generateProduct();



    let addToCartButtons = document.querySelectorAll("#add-btn");
    let numberOfItemsInCart =document.getElementById("itemCount");
    let particularCartCount = document.getElementsByClassName("quantity")[0];



    //Adding to Cart
    for ( let i = 0; i < addToCartButtons.length; i++ ){

      addToCartButtons[i].addEventListener( "click", function(event){

         let btn = event.target;
         let btn_parent = btn.parentElement;
         let btn_grandparent =  btn.parentElement.parentElement;
         

         let search = itemsAddedToCart.find( (itemsAlreadyAdded) => itemsAlreadyAdded.id === btn_grandparent.id);

      
         // console.log(btn_parent.children[3].innerText.replace( "$", ""))

         if ( search === undefined ){
            itemsAddedToCart.push({
               id : btn_grandparent.id,
               img : btn_grandparent.children[0].src,
               name: btn_parent.children[1].innerText,
               price : btn_parent.children[3].innerText.replace( "$", ""),
               item: 1
             });
   
         } else {
            search.item += 1;
         };

         updateCartCount();
         localStorage.setItem( "dataInCart", JSON.stringify(itemsAddedToCart));

         generateCartItems();
        
         

         
      })
    };


    //updating Cart Count
    function updateCartCount(){

      numberOfItemsInCart.innerText = itemsAddedToCart.map( (itemsAddedToCart) => itemsAddedToCart.item).reduce( ( x, y) => x + y, 0);
    };
    updateCartCount();

   



    //pushing added items to Cart Page from local Storage
    let generateCartItems = () => {

      if ( itemsAddedToCart.length !== 0 ){

        return (cartItemsContainer.innerHTML = itemsAddedToCart.map( (itemsInCart) => {



            return `
                
            <tr id= ${ itemsInCart.id } >
                <td>
                    <img class="item-img" src= "${itemsInCart.img}" alt="" class="product-img">
                </td>
                <td class="item-name"> ${ itemsInCart.name }</td>
                <td>
                    <i class="bi bi-dash-lg"></i>
                    <span class="quantity"> ${ itemsInCart.item } </span>
                    <i class="bi bi-plus-lg"></i>
                </td>
                <td class="price"> $${ itemsInCart.price } </td>
                <td>
                    <button class="delete-button">
                        <img class="delete-icon" src="shopping cart img/delete-icon.png" alt="">
                    </button>
                </td>
            </tr>
            
            `

        }).join(""));
      } else{
         cartItemsContainer.innerHTML = ``;
      };

    };
    generateCartItems();
   


    //increasing items in Cart using the + button
    let increaseBtns = document.getElementsByClassName("bi-plus-lg");

    let increaseQuantity = () => {

      for ( let i = 0; i < increaseBtns.length; i++ ){
         increaseBtns[i].addEventListener( "click", function(event){
            let incrementBtn = event.target; 
            let item_Added = incrementBtn.parentElement.parentElement;
            
            let search = itemsAddedToCart.find( (itemsInCart) => itemsInCart.id === item_Added.id );
            // console.log(search.item)

            

            if ( search === undefined ){

               itemsAddedToCart.push({
                  id : item_Added.id,
                  img : incrementBtn.parentElement.parentElement.children[0].children[0].src,
                  name: incrementBtn.parentElement.parentElement.children[1].innerText,
                  price : incrementBtn.parentElement.parentElement.children[3].innerText.replace( "$", ""),
                  item: 1
               })
            } else{

               search.item += 1;
            };
           
         

            updateCartCount();
            generateCartItems();

            localStorage.setItem( "dataInCart", JSON.stringify(itemsAddedToCart));

            // window.location.reload();
            // console.log(incrementBtn.parentElement.parentElement.children[3].innerText.replace( "$", ""));
         }
      )};
   
   };
   increaseQuantity();
   
   



    





    //decreasing items in cart using the - button
    let decreaseBtns = document.getElementsByClassName("bi-dash-lg");

    for ( let i = 0; i < decreaseBtns.length; i++ ){
      decreaseBtns[i].addEventListener( 'click', function(event){
         let decrementBtn = event.target;
         let item_Added = decrementBtn.parentElement.parentElement;
         

         let search = itemsAddedToCart.find( (itemsInCart) => itemsInCart.id === item_Added.id );
            // console.log(search.item)

            

            if ( search.item === 1 ){
               return;
            } else{

               search.item -= 1;
            };

            
            updateCartCount();
            localStorage.setItem( "dataInCart", JSON.stringify(itemsAddedToCart));

            generateCartItems();

            // window.location.reload();
            
           
      });
    };

    //Removing item from Cart Page
    let deleteButtons = document.getElementsByClassName('delete-button');

    for ( let i = 0; i < deleteButtons.length; i++ ){

      deleteButtons[i].addEventListener( "click", removeItem )

    };

    function removeItem(event){

      let deleteBtn = event.target;
      let item = deleteBtn.parentElement.parentElement.parentElement;

      item.remove();
      updateCartCount();
      localStorage.setItem( "dataInCart", JSON.stringify(itemsAddedToCart));

      // generateCartItems();
      // console.log(deleteBtn.parentElement.parentElement.parentElement);
    };











    
   //  let decreaseQuantity = () => {
        
   //  };

   //  let updateQuantity = () => {
        
   //  };





























// let addToCartButtons = document.querySelectorAll("#add-btn");
// let removeItemFromCartBtn = document.querySelectorAll('#remove-btn');
// let parentItemContainer = document.getElementsByTagName("tbody")[0];
// let itemCount = document.getElementById("itemCount");
// let deleteButton = document.getElementsByClassName('delete-button');
// let itemRows = parentItemContainer.getElementsByTagName('tr');
// let cartPageButton = document.getElementById('cart-details-btn');
// let continueShoppingButton = document.getElementById('continue-shopping-button');

// let storedItems = JSON.parse(localStorage.getItem('data')) || [];
// let inputQuantityValue = JSON.parse(localStorage.getItem('quantityValue')) || [];

// let productListingPage = document.getElementById('products-container');
// let productPageFooter = document.getElementById('product-page-footer');
// let productPageHeader =  document.getElementById('header');
// let cartPageHeader = document.getElementById('cart-heading');
// let itemsAddedContainer = document.getElementById('addedItemsContainer');



// cartPageButton.addEventListener( 'click', function(event){

//     if ( productListingPage.style.display === "none" ){
//       productListingPage.style.display = "grid"
//       productPageFooter.style.display = " block"
//     } else {
//       productPageHeader.style.display = "none"
//       productListingPage.style.display = "none"
//       productPageFooter.style.display = "none"
//       cartPageHeader.style.display = "block"
//       itemsAddedContainer.style.display = "flex"
//     }
// })

// continueShoppingButton.addEventListener( 'click', function(event){

//     if ( itemsAddedContainer.style.display = "flex" ){
        
//       cartPageHeader.style.display = "none"
//       itemsAddedContainer.style.display = "none"
//       productPageHeader.style.display = "flex"
//       productListingPage.style.display = "grid"
//       productPageFooter.style.display = " block"

//     }
// })




// for (let i = 0; i < addToCartButtons.length; i++ ){
    
//     addToCartButtons[i].addEventListener( 'click', function(event){

//         let btn = event.target;
//         let btn_parent = btn.parentElement;
//         let btn_grandparent = btn.parentElement.parentElement;
//         let ProductName = btn_parent.children[1].innerText;
//         let ProductPrice = btn_parent.children[3].innerText;
//         let ProductImage = btn_grandparent.children[0].src;
//         let removeFromCartBtn = btn_parent.children[5];
//         let itemInCart = btn_grandparent.children[1];

//         // console.log(productsItemData[i].name)
 
        

//         let itemContainer = document.createElement('tr');
        
//         let itemNameParent = document.getElementsByClassName('containItems')[0];
//         let itemName = itemNameParent.getElementsByClassName('item-name');


        

//         // for ( let i = 0; i < itemName.length; i++ ){

//         //     if ( itemName[i].innerText == ProductName ){
//         //         return;
                
//         //     }
//         // }

    
        

        

//         itemContainer.innerHTML =
//             `<td>
//                 <img class="item-img" src="${ProductImage}" alt="" class="product-img">
//             </td>
//             <td class = "item-name">${ProductName}</td>
//             <td>
//                 <input type="number" name="quantity" id="quantity" value="1">
//             </td>
//             <td class="price">${ ProductPrice}</td>
//             <td>
//                 <button class="delete-button">
//                     <img class="delete-icon" src="shopping cart img/delete-icon.png" alt="">
//                 </button>
//             </td>`
        

//         parentItemContainer.append(itemContainer);
        
    


//       // Remove item from Cart using delete icon in cart page
//         for( let i = 0; i < deleteButton.length; i++ ){
//             deleteButton[i].addEventListener( 'click', function removeItem(event){
//             removeBtn = event.target;
//             removeBtn_grandparent = removeBtn.parentElement.parentElement.parentElement;

//             removeBtn_grandparent.remove();
//             updateGrandTotal();

//             let number_items_in_cart = parentItemContainer.children.length;
//             let number = parseFloat(localStorage.setItem("cart-number", number_items_in_cart ));
//             onLoadCartcount();
//             // itemCount.innerText = parentItemContainer.children.length;
        

//             if ( btn_parent.children[1].innerText == removeBtn_grandparent.children[1].innerText ){

//                 btn.style.display = "block";
//                 removeFromCartBtn.style.display = "none";
//                 itemInCart.style.display = "none";

//             }

            
//             let addedItem = productsItemData[i];
            
//             storedItems = storedItems.filter( (itemsStored) => itemsStored.id !== addedItem.id );
//             localStorage.setItem( 'data', JSON.stringify(storedItems));
            


    
//        })
//        }

        
//        // Remove item from Cart using Remove Cart Button in Product page
//        removeFromCartBtn.addEventListener( 'click', function(event){

       

//         let remove_item_btn = event.target;
//         let remove_item_btn_parent = remove_item_btn.parentElement;

//         if ( remove_item_btn_parent.children[1].innerText ==  ProductName ){
           
//             itemContainer.remove();

//         }
//         updateGrandTotal();

//         let number_items_in_cart = parentItemContainer.children.length;
//         let number = parseFloat(localStorage.setItem("cart-number", number_items_in_cart ));
//         onLoadCartcount();
//         // itemCount.innerText = parentItemContainer.children.length;

        
//         btn.style.display = "block";
//         removeFromCartBtn.style.display = "none";
//         itemInCart.style.display = "none";
      
        
//         let addedItem = productsItemData[i];
//         storedItems = storedItems.filter( (itemsStored) => itemsStored.id !== addedItem.id );
//         localStorage.setItem( 'data', JSON.stringify(storedItems));

//        });





//         updateGrandTotal();

//         let itemQuantity = document.querySelectorAll('#quantity');
//         for ( let i = 0; i < itemQuantity.length; i++ ){
//             let inputValue = itemQuantity[i];
//             inputValue.addEventListener( 'change', quantityChanged )

//         }
        
//         btn.style.display = "none";
//         removeFromCartBtn.style.display = "block";
//         itemInCart.style.display = "block";

//         // Saving No of items in cart to lacal Storage

//         let number_items_in_cart = parentItemContainer.children.length;
//         let number = parseFloat(localStorage.setItem("cart-number", number_items_in_cart ));
//         onLoadCartcount();
//         // cartCount();


//         // saving the items in cart to Local storage

//         function addingItems(){
//             let addedItem = productsItemData[i];
//             storedItems.push({
//             id: addedItem.id,
//             name: addedItem.name
//         })

//         }

//         addingItems();
//         localStorage.setItem( 'data', JSON.stringify(storedItems));








//         // itemsInCart(productsItemData[i]);

        


//     })
// }

// //saving No of items in Cart to local storage

// function onLoadCartcount(){
//     let NoitemsInCart = parseFloat(localStorage.getItem("cart-number"));
//     if ( NoitemsInCart ){
//         itemCount.innerText = NoitemsInCart; 
//     } else {
//         itemCount.innerText = 0; 
//     }
// }

// // function cartCount(){
// //     let itemsInCart = parseFloat(localStorage.getItem("cartCount"));
    
// //     if ( itemsInCart ){
// //         localStorage.setItem("cartCount", itemsInCart + 1);
// //         itemCount.innerText = itemsInCart + 1;
// //     } else {
// //         localStorage.setItem("cartCount", 1);
// //         itemCount.innerText = 1;
// //     }
// // }
// onLoadCartcount();

// //saving items in Cart to Local storage


// // function itemsInCart(productsItemData){
// //     localStorage.setItem( 'itemsInCart', JSON.stringify(productsItemData));
// // }


// function updateGrandTotal(){



//     let total = 0;

//     for ( let i = 0; i < itemRows.length; i++ ){
//         particularItemRow = itemRows[i];
//         let priceElement = particularItemRow.getElementsByClassName('price')[0];
//         let quantityElement = particularItemRow.querySelectorAll('#quantity')[0];
//         let price = priceElement.innerText.replace('$', '');
//         let quantityvalue = quantityElement.value;

//         total = total + (price * quantityvalue);

//     }
    
//     total = Math.round( total * 100 ) / 100;
//     let SubTotal = document.getElementById('Subtotal-Value').innerText = '$' + total;
//     totalAmountpayable = document.getElementById('total-amount').innerText = SubTotal;

//     let sub_total = localStorage.getItem('subtotal');


//     localStorage.setItem( 'subTotal', SubTotal );


    



// }

// function quantityChanged(event){
//    let inputValue = event.target;
//    if ( isNaN(inputValue.value) || inputValue.value <= 0 ){
//     inputValue.value = 1;
//    }
//    updateGrandTotal();


                

// }
