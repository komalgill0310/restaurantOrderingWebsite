import { menuArray } from "/data.js";
import { imagesObj } from "./imageObj.js";

let imagesInterval;
let orderedItems = [];

const header = document.querySelector(".header");
const headerImg = document.querySelector(".header-img");
const backBtn = document.querySelector(".back-btn");
const initialMenuState = document.querySelector(".initial-menu-state");
const activeMenuSection = document.querySelector(".active-menu-section");
const menuItems = document.getElementById("menu-items");
const preCheckoutState = document.querySelector(".pre-checkout-state");
const cartPriceDiv = document.querySelector(".cart-price-div");
const subTotal = document.getElementById("sub-total");
const hst = document.getElementById("hst");
const totalPrice = document.getElementById("total-price");
const completeOrder = document.querySelector(".complete-order");
const cartIconSection = document.querySelector(".cart-icon-section");
const cartItemsSubTotal = document.getElementById("cart-items-sub-total");
const cartTotalObjects = document.getElementById("cart-total-objects");
const checkoutPaymentModalState = document.querySelector(
  ".checkout-payment-modal-state"
);
const orderOnTheWayText = document.getElementById("order-on-the-way-text");

init();

function init() {
  document.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.dataset.burgers) {
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
    if (e.target.dataset.completeOrder) {
      checkoutPaymentModalState.style.display = "block";
    }
    if (
      !e.target.closest(".checkout-payment-modal-state") &&
      !e.target.closest(".complete-order-btn")
    ) {
      checkoutPaymentModalState.style.display = "none";
    }
    if (e.target.dataset.pay) {
      displayMessage();
    }
    changeDisplayPropertyOfHtmlElements(
      e.target.dataset.burgers,
      e.target.dataset.sides,
      e.target.dataset.drinks,
      e.target.dataset.pizza,
      e.target.dataset.homePage,
      e.target.dataset.cartIcon,
      e.target.dataset.pay
    );
  });
}

function setHtmlContentForTotalPrice() {
  const price = getTotalPrice();
  subTotal.textContent = `$${price.subTotal}`;
  hst.textContent = `$${price.hst}`;
  totalPrice.textContent = `$${price.totalPrice}`;
}

function getTotalPrice() {
  const subTotal = orderedItems.reduce(
    (totalPrice, itemPrice) => totalPrice + itemPrice.price,
    0
  );
  const subTotalFixDecimalValue = +subTotal.toFixed(2);
  const hst = +(subTotalFixDecimalValue * 0.13).toFixed(2);
  const totalPrice = (subTotalFixDecimalValue + hst).toFixed(2);
  return {
    subTotal: subTotalFixDecimalValue,
    hst: hst,
    totalPrice: totalPrice,
  };
}

function renderMenu(typeOfFood) {
  getRandomImagesLink(typeOfFood);
  menuItems.innerHTML = getMenuItems(typeOfFood);
  imagesInterval = setInterval(getRandomImagesLink, 3000, typeOfFood);
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

//UPDATES THE ORDEREDITEMS ARRAY WHEN AN ELEMENT GETS DELETED FROM THE DOM
function deleteItemFromOrderedItemsArray(deleteBtnId) {
  for (let i = 0; i < orderedItems.length; i++) {
    if (orderedItems[i].id === deleteBtnId) {
      orderedItems.splice(i, 1);
      break;
    }
  }
  return orderedItems;
}

function changeDisplayPropertyOfHtmlElements(
  burgerMenu,
  sidesMenu,
  drinksMenu,
  pizzaMenu,
  homePage,
  cartButton,
  pay
) {
  if (burgerMenu || sidesMenu || drinksMenu || pizzaMenu) {
    backBtn.style.display = "block";
    activeMenuSection.style.display = "block";
    initialMenuState.style.display = "none";
  }
  if (homePage) {
    backBtn.style.display = "none";
    preCheckoutState.style.display = "none";
    activeMenuSection.style.display = "none";
    initialMenuState.style.display = "block";
    cartIconSection.style.display = "block";
    header.style.display = "block";
    headerImg.src = "images/headerImage.avif";
    clearInterval(imagesInterval);
  }
  if (!orderedItems.length) {
    cartIconSection.style.display = "none";
    cartPriceDiv.style.display = "none";
    completeOrder.style.display = "none";
  }

  if (!pay && orderedItems.length) {
    cartIconSection.style.display = "block";
    cartPriceDiv.style.display = "block";
    completeOrder.style.display = "block";
    cartTotalObjects.textContent = orderedItems.length;
    cartItemsSubTotal.textContent = `$${getTotalPrice().subTotal}`;
  }

  if (preCheckoutState.style.display === "block") {
    cartIconSection.style.display = "none";
  }

  if (cartButton) {
    backBtn.style.display = "none";
    activeMenuSection.style.display = "none";
    initialMenuState.style.display = "none";
    preCheckoutState.style.display = "block";
    header.style.display = "none";
    cartIconSection.style.display = "none";
  }
}

function displayMessage() {
  const msg = validateForm();
  if (msg) {
    alert(msg);
  } else {
    preCheckoutState.style.display = "none";
    checkoutPaymentModalState.style.display = "none";
    cartIconSection.style.display = "none";
    header.style.display = "block";
    headerImg.src = "images/headerImage.avif";
    clearInterval(imagesInterval);
    orderOnTheWayText.textContent = `Thanks ${
      document.getElementById("name").value.split(" ")[0]
    }! Your order is on the way!`;
  }
}

function validateForm() {
  const name = document.getElementById("name").value;
  const cardNumber = document.getElementById("card-number").value;
  const cvv = document.getElementById("cvv").value;
  let errorMessage = "";
  if (!name) {
    errorMessage += "Name is required.\n";
  }
  if (!cardNumber) {
    errorMessage += "Card Number is required.\n";
  }
  if (!cvv) {
    errorMessage += "CVV is required.\n";
  }
  return errorMessage;
}

function getMenuItems(type) {
  let menuItemHtml = "";
  filterMenuItems(type).forEach((menuItem) => {
    menuItemHtml += `
      <div class="menu-item-info"> 
        <h1 class="menu-item-name">${menuItem.name}</h1>
        <p class="menu-item-ingredients">${menuItem.ingredients}</p>
        <p class="menu-item-price">$${menuItem.price}</p>
        <div class="add-to-cart-btn">
        <button class="online-order-btn cursor-pointer" data-add="${menuItem.id}">Online Order</button>
      </div>
      </div>
`;
  });
  return menuItemHtml;
}

function renderOrderedItems(menuId) {
  document.getElementById("cart-items").innerHTML += getMenuItemsHtml(menuId);
}

function deleteElementFromDom(deleteBtnId) {
  document.getElementById(deleteBtnId).parentElement.remove();
}

function getMenuItemsHtml(menuId) {
  let cartItemHtml = "";
  const cartItemsArray = getOrderedItems(menuId);
  cartItemsArray.forEach((cartItem) => {
    console.log(`cartItem: ${cartItem.id}`);
    cartItemHtml = `
      <div class="cart-item display-flex">
        <p class="cart-item-name">${cartItem.name}</p>
        <p class="cart-item-price">$${cartItem.price}</p>
        <i class="fa-solid fa-trash-can cursor-pointer" id="${cartItem.id}" data-remove="${menuId}"></i>
      </div>`;
  });
  return cartItemHtml;
}

function getOrderedItems(menuId) {
  const menu = menuArray.filter((menu) => menu.id === menuId);
  let orderItem = {
    id: menu[0].id,
    name: menu[0].name,
    price: menu[0].price,
  };
  orderedItems.push(orderItem);
  return orderedItems;
}

function filterMenuItems(typeOfFood) {
  return menuArray.filter((item) => item.type === typeOfFood);
}

function getRandomImagesLink(typeOfImg) {
  const imgMenuItems = document.querySelector(".header-img");
  const randomNum = Math.floor(Math.random() * imagesObj[typeOfImg].length);
  imgMenuItems.src = imagesObj[typeOfImg][randomNum];
}
