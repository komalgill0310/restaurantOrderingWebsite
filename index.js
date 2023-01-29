import { menuArray } from "/data.js";
import { imagesObj } from "./imageObj.js";

init();
let orderedItems = [];

function getRandomImagesLink(typeOfImg) {
  const imgMenuItems = document.getElementById("img-menu-items");
  const randomNum = Math.floor(Math.random() * imagesObj[typeOfImg].length);
  console.log(imagesObj[typeOfImg][randomNum]);
  imgMenuItems.src = imagesObj[typeOfImg][randomNum];
}

function init() {
  document.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.dataset.burgers) {
      console.log("clicked Burgers");
      renderMenu(e.target.dataset.burgers);
    }
    if (e.target.dataset.sides) {
      renderMenu(e.target.dataset.sides);
    }
    if (e.target.dataset.drinks) {
      renderMenu(e.target.dataset.drinks);
    }
    if (e.target.dataset.pizza) {
      renderMenu(e.target.dataset.pizza);
    }
    if (e.target.dataset.add) {
      handleAddItemClick(e.target.dataset.add);
    }
    if (e.target.dataset.remove) {
      handleRemoveItemClick(e.target.id);
    }
    if (e.target.dataset.checkout) {
      document.querySelector(".checkout-payment-modal-state").style.display =
        "block";
    }
    if (e.target.dataset.close) {
      document.querySelector(".checkout-payment-modal-state").style.display =
        "none";
    }
    if (e.target.dataset.pay) {
      validateForm();
    }
    changeDisplayPropertyOfHtmlElements(
      e.target.dataset.burgers,
      e.target.dataset.sides,
      e.target.dataset.drinks,
      e.target.dataset.pizza,
      e.target.dataset.menuSections,
      e.target.dataset.cart,
      e.target.dataset.pay
    );
  });
}

function setHtmlContentForTotalPrice() {
  document.getElementById(
    "total-price"
  ).textContent = `Total Price: $${getTotalPrice()}`;
}

function getTotalPrice() {
  const totalPrice = orderedItems.reduce(
    (totalPrice, itemPrice) => totalPrice + itemPrice.price,
    0
  );
  return +totalPrice.toFixed(2);
}

function renderMenu(typeOfFood) {
  setInterval(getRandomImagesLink, 1000, typeOfFood);
  document.getElementById("menu-items").innerHTML = getMenuItems(typeOfFood);
}

function handleAddItemClick(menuId) {
  renderOrderedItems(menuId);
  setHtmlContentForTotalPrice();
}

function handleRemoveItemClick(deleteBtnId) {
  deleteElementFromDom(deleteBtnId);
  deleteItemFromOrderedItemsArray(deleteBtnId);
  setHtmlContentForTotalPrice();
}

function deleteItemFromOrderedItemsArray(deleteBtnId) {
  for (let i = 0; i < orderedItems.length; i++) {
    if (orderedItems[i].id === deleteBtnId) {
      orderedItems.splice(i, 1);
    }
  }
  return orderedItems;
}

function changeDisplayPropertyOfHtmlElements(
  burgerMenu,
  sidesMenu,
  drinksMenu,
  pizzaMenu,
  menuSections,
  cartButton,
  pay
) {
  if (burgerMenu || sidesMenu || drinksMenu || pizzaMenu) {
    document.querySelector(".back-btn").style.display = "block";
    document.querySelector(".menu-section-after-clicking").style.display =
      "block";
    document.querySelector(".menu-section-before-clicking").style.display =
      "none";
  }
  if (menuSections) {
    console.log(menuSections);
    document.querySelector(".back-btn").style.display = "none";
    document.querySelector(".pre-checkout-state").style.display = "none";
    document.querySelector(".menu-section-after-clicking").style.display =
      "none";
    document.querySelector(".menu-section-before-clicking").style.display =
      "block";
  }

  if (!orderedItems.length && cartButton) {
    alert("Your cart is empty🛒");
  }

  if (orderedItems.length) {
    document.querySelector(".cart-items-section").style.display = "block";
  }

  if (cartButton) {
    document.querySelector(".back-btn").style.display = "none";
    document.querySelector(".menu-section-after-clicking").style.display =
      "none";
    document.querySelector(".menu-section-before-clicking").style.display =
      "none";
    document.querySelector(".pre-checkout-state").style.display = "block";
  }
  if (pay) {
    document.querySelector(".cart-items-section").style.display = "none";
  }
}

function validateForm() {
  if (
    !document.getElementById("name").value ||
    !document.getElementById("card-number").value ||
    !document.getElementById("cvv").value
  ) {
    alert("Please fill out the payment information");
  } else {
    document.querySelector(".order-complete-state").style.display = "block";
    document.querySelector(".pre-checkout-state").style.display = "none";
    document.querySelector(".checkout-payment-modal-state").style.display =
      "none";
    document.getElementById("order-on-the-way").innerHTML = `Thanks ${
      document.getElementById("name").value
    }! Your order is on the way!`;
  }
}

function getMenuItems(type) {
  let menuItemHtml = "";
  filterMenuItems(type).forEach((menuItem) => {
    menuItemHtml += `
      <div class="item-info">
        <p>${menuItem.emoji}</p>
        <h1>${menuItem.name}</h1>
        <p>${menuItem.ingredients}</p>
        <p>$${menuItem.price}</p>
        <div classs="add-to-cart-btn">
        <button data-add="${menuItem.id}">Add to Order</button>
      </div>
      </div>
`;
  });
  return menuItemHtml;
}

function renderOrderedItems(menuId) {
  document.getElementById("ordered-items").innerHTML +=
    getMenuItemsHtml(menuId);
}

function deleteElementFromDom(deleteBtnId) {
  document.getElementById(deleteBtnId).parentElement.remove();
}

function getMenuItemsHtml(menuId) {
  let cartItemHtml = "";
  const cartItemsArray = getOrderedItems(menuId);
  cartItemsArray.forEach((cartItem) => {
    cartItemHtml = `
      <div class="order-cartItem">
        <h1>${cartItem.name}</h1>
        <p>$${cartItem.price}</p>
        <button id="${cartItem.id}" data-remove="${menuId}">Remove</button>
      </div>`;
  });
  return cartItemHtml;
}

function getOrderedItems(menuId) {
  let orderItem = {
    id: menuId,
    name: menuArray[menuId].name,
    price: menuArray[menuId].price,
  };
  orderedItems.push(orderItem);
  return orderedItems;
}

function filterMenuItems(typeOfFood) {
  return menuArray.filter((item) => item.type === typeOfFood);
}

// Working code for the Basic Requirement of the Restaurant Ordering App

// let orderedItems = [];

// init();

// function init() {
//   document.addEventListener("click", (e) => {
//     e.preventDefault();
//     if (e.target.dataset.add) {
//       handleAddItemClick(e.target.dataset.add);
//     }
//     if (e.target.dataset.remove) {
//       handleRemoveItemClick(e.target.id);
//     }
//     if (e.target.dataset.complete) {
//       document.querySelector(".checkout-payment-modal-state").style.display =
//         "block";
//     }
//     if (e.target.dataset.close) {
//       document.querySelector(".checkout-payment-modal-state").style.display =
//         "block";
//     }
//     if (e.target.dataset.pay) {
//       validateForm();
//     }
//   });
// }

// function handleAddItemClick(menuId) {
//   renderOrderedItems(menuId);
//   updateDisplayPropertyOfPreCheckoutHtmlSection();
//   setHtmlContentForTotalPrice();
// }

// function handleRemoveItemClick(deleteBtnId) {
//   deleteElementFromDom(deleteBtnId);
//   deleteItemFromOrderedItemsArray(deleteBtnId);
//   setHtmlContentForTotalPrice();
//   updateDisplayPropertyOfPreCheckoutHtmlSection();
// }

// function validateForm() {
//   if (
//     !document.getElementById("name").value ||
//     !document.getElementById("card-number").value ||
//     !document.getElementById("cvv").value
//   ) {
//     alert("Please fill out the payment information");
//   } else {
//     document.querySelector(".order-complete-state").style.display = "block";
//     document.querySelector(".pre-checkout-state").style.display = "none";
//     document.querySelector(".checkout-payment-modal-state").style.display =
//       "none";
//     document.getElementById("order-on-the-way").innerHTML = `Thanks ${
//       document.getElementById("name").value
//     }! Your order is on the way!`;
//   }
// }

// function renderOrderedItems(menuId) {
//   document.getElementById("ordered-items").innerHTML +=
//     getMenuItemsHtml(menuId);
// }

// function updateDisplayPropertyOfPreCheckoutHtmlSection() {
//   if (orderedItems.length) {
//     document.querySelector(".pre-checkout-state").style.display = "block";
//   } else {
//     document.querySelector(".pre-checkout-state").style.display = "none";
//   }
// }

// function setHtmlContentForTotalPrice() {
//   document.getElementById(
//     "total-price"
//   ).textContent = `Total Price: $${getTotalPrice()}`;
// }

// function deleteElementFromDom(deleteBtnId) {
//   document.getElementById(deleteBtnId).parentElement.remove();
// }

// function deleteItemFromOrderedItemsArray(deleteBtnId) {
//   for (let i = 0; i < orderedItems.length; i++) {
//     if (orderedItems[i].id === deleteBtnId) {
//       orderedItems.splice(i, 1);
//     }
//   }
//   return orderedItems;
// }
// function getMenuItemsHtml(menuId) {
//   let cartItemHtml = "";
//   const cartItemsArray = getOrderedItems(menuId);
//   cartItemsArray.forEach((cartItem) => {
//     cartItemHtml = `
//       <div class="order-cartItem">
//         <h1>${cartItem.name}</h1>
//         <p>$${cartItem.price}</p>
//         <button id="${cartItem.id}" data-remove="${menuId}">Remove</button>
//       </div>`;
//   });
//   return cartItemHtml;
// }

// function getOrderedItems(menuId) {
//   let orderItem = {
//     id: menuId,
//     name: menuArray[menuId].name,
//     price: menuArray[menuId].price,
//   };
//   orderedItems.push(orderItem);
//   return orderedItems;
// }

// function getTotalPrice() {
//   return orderedItems.reduce(
//     (totalPrice, itemPrice) => totalPrice + itemPrice.price,
//     0
//   );
// }

// function renderMenuItems() {
//   document.getElementById("menu-items").innerHTML = getMenuItems();
// }

// function getMenuItems() {
//   let menuItemHtml = "";
//   menuArray.forEach((menuItem) => {
//     menuItemHtml += `<p>${menuItem.emoji}</p>
//     <div class="item-info">
//       <h1>${menuItem.name}</h1>
//       <p>${menuItem.ingredients}</p>
//       <p>$${menuItem.price}</p>
//     </div>
//     <div classs="add-to-cart-btn">
//       <button data-add="${menuItem.id}">+</button>
//   </div>`;
//   });
//   return menuItemHtml;
// }

// renderMenuItems();
