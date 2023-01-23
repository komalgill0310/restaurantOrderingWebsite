import { menuArray } from "/data.js";
import { htmlElementObj } from "/htmlElementObject.js";

let orderedItems = [];

init();

function init() {
  document.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.dataset.add) {
      handleAddItemClick(e.target.dataset.add);
    }
    if (e.target.dataset.remove) {
      handleRemoveItemClick(e.target.id);
    }
    if (e.target.dataset.complete) {
      htmlElementObj.checkoutPaymentModalState.style.display = "block";
      htmlElementObj.paymentInformation.style.display = "block";
    }
    if (e.target.dataset.close) {
      htmlElementObj.paymentInformation.style.display = "none";
    }
    if (e.target.dataset.pay) {
      validateForm();
    }
  });
}

function validateForm() {
  if (
    !document.getElementById("name").value ||
    !document.getElementById("card-number").value ||
    !document.getElementById("cvv").value
  ) {
    alert("Please fill out the payment information");
  } else {
    htmlElementObj.orderCompleteState.style.display = "block";
    htmlElementObj.preCheckoutState.style.display = "none";
    htmlElementObj.checkoutPaymentModalState.style.display = "none";
    htmlElementObj.orderOnTheWay.innerHTML = `Thanks ${
      document.getElementById("name").value
    }! Your order is on the way!`;
  }
}

function handleAddItemClick(menuId) {
  renderOrderedItems(menuId);
  updateDisplayPropertyOfPreCheckoutHtmlSection();
  setHtmlContentForTotalPrice();
}

function handleRemoveItemClick(deleteBtnId) {
  deleteElementFromDom(deleteBtnId);
  deleteItemFromOrderedItemsArray(deleteBtnId);
  setHtmlContentForTotalPrice();
  updateDisplayPropertyOfPreCheckoutHtmlSection();
}

function renderOrderedItems(menuId) {
  document.getElementById("ordered-items").innerHTML +=
    getMenuItemsHtml(menuId);
}

function updateDisplayPropertyOfPreCheckoutHtmlSection() {
  if (orderedItems.length) {
    document.querySelector(".pre-checkout-state").style.display = "block";
  } else {
    document.querySelector(".pre-checkout-state").style.display = "none";
  }
}

function setHtmlContentForTotalPrice() {
  document.getElementById(
    "total-price"
  ).textContent = `Total Price: $${getTotalPrice()}`;
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

function getTotalPrice() {
  return orderedItems.reduce(
    (totalPrice, itemPrice) => totalPrice + itemPrice.price,
    0
  );
}

function deleteElementFromDom(deleteBtnId) {
  document.getElementById(deleteBtnId).parentElement.remove();
}

function deleteItemFromOrderedItemsArray(deleteBtnId) {
  for (let i = 0; i < orderedItems.length; i++) {
    if (orderedItems[i].id === deleteBtnId) {
      orderedItems.splice(i, 1);
    }
  }
  return orderedItems;
}

renderMenuItems();

function renderMenuItems() {
  document.getElementById("menu-items").innerHTML = getMenuItems();
}

function getMenuItems() {
  let menuItemHtml = "";
  menuArray.forEach((menuItem) => {
    menuItemHtml += `<p>${menuItem.emoji}</p>
    <div class="item-info">
      <h1>${menuItem.name}</h1>
      <p>${menuItem.ingredients}</p>
      <p>$${menuItem.price}</p>
    </div>
    <div classs="add-to-cart-btn">
      <button data-add="${menuItem.id}">+</button>      
  </div>`;
  });
  return menuItemHtml;
}

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
//       htmlElementObj.checkoutPaymentModalState.style.display = "block";
//       htmlElementObj.paymentInformation.style.display = "block";
// document.querySelector(".checkout-payment-modal-state").style.display =
//   "block";
// document.querySelector(".payment-information").style.display = "block";
// }
// if (e.target.dataset.close) {
//   htmlElementObj.paymentInformation.style.display = "none";
//   // document.querySelector(".payment-information").style.display = "none";
// }
// if (e.target.dataset.pay && !validateForm()) {
//   htmlElementObj.orderCompleteState.style.display = "block";
//   htmlElementObj.preCheckoutState.style.display = "none";
//   htmlElementObj.checkoutPaymentModalState.style.display = "none";
//   htmlElementObj.orderOnTheWay.innerHTML = `Thanks ${
//     document.getElementById("name").value
//   }! Your order is on the way!`;
// }
//   document.getElementById("name").value
// }! Your order is on the way!`;;
// document.querySelector(".order-complete-state").style.display = "block";
// document.querySelector(".pre-checkout-state").style.display = "none";
// document.querySelector(".checkout-payment-modal-state").style.display =
//   "none";
// document.getElementById("order-on-the-way").innerHTML = `Thanks ${
//   document.getElementById("name").value
// }! Your order is on the way!`;
//   });
// }
