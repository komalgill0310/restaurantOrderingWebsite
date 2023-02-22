import { foodMenu } from "/foodMenu.js";
import { foodMenuSectionHeaderImages } from "./foodMenuSectionHeaderImages.js";

let imagesInterval;
let orderedItems = [];

const header = document.querySelector(".header");
const headerImg = document.querySelector(".header-img");
const backBtn = document.querySelector(".back-btn");
const initialMenuState = document.querySelector(".initial-menu-state");
const activeMenuSection = document.querySelector(".active-menu-section");
const preCheckoutState = document.querySelector(".pre-checkout-state");
const cartPriceDiv = document.querySelector(".cart-price-div");
const completeOrder = document.querySelector(".complete-order");
const cartIconSection = document.querySelector(".cart-icon-section");
const checkoutPaymentModalState = document.querySelector(
  ".checkout-payment-modal-state"
);

const menuItems = document.getElementById("menu-items");
const subTotal = document.getElementById("sub-total");
const hst = document.getElementById("hst");
const totalPrice = document.getElementById("total-price");
const cartItemsSubTotal = document.getElementById("cart-items-sub-total");
const totalNumberOfItemsInCart = document.getElementById(
  "total-number-of-items-in-cart"
);
const orderOnTheWayText = document.getElementById("order-on-the-way-text");

init();

function init() {
  handleClick();
}

function handleClick() {
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
      handleCompleteOrderBtnclick();
    }
    if (
      !e.target.closest(".checkout-payment-modal-state") &&
      !e.target.closest(".complete-order-btn")
    ) {
      hidePaymentModalOnPreCheckoutPageClick();
    }
    if (e.target.dataset.pay) {
      processPaymentFormSubmission();
    }
    updateHtmlElementsDisplayProperty(e);
  });
}

function renderMenu(typeOfFood) {
  getRandomImagesLink(typeOfFood);
  menuItems.innerHTML = getMenuItems(typeOfFood);
  imagesInterval = setInterval(getRandomImagesLink, 3000, typeOfFood);
}

function handleAddItemClick(menuId) {
  renderOrderedItems(menuId);
  updatePriceTextContent();
}

function handleRemoveItemClick(deleteBtnId) {
  removeChildFromParentElement(deleteBtnId);
  removeItemAndUpdateOrderedItemsArray(deleteBtnId);
  updatePriceTextContent();
}

function handleCompleteOrderBtnclick() {
  checkoutPaymentModalState.style.display = "block";
}

function hidePaymentModalOnPreCheckoutPageClick() {
  checkoutPaymentModalState.style.display = "none";
}

function processPaymentFormSubmission() {
  const msg = validatePaymentForm();
  if (msg) {
    alert(msg);
  } else {
    updateHeaderImageSrc();
    clearImagesInterval(imagesInterval);
    hideCartAndPaymentElements();
    setOrderConfirmationText();
  }

  function hideCartAndPaymentElements() {
    cartIconSection.style.display = "none";
    preCheckoutState.style.display = "none";
    checkoutPaymentModalState.style.display = "none";
    header.style.display = "block";
  }

  function setOrderConfirmationText() {
    orderOnTheWayText.textContent = `Thanks ${
      document.getElementById("name").value.split(" ")[0]
    }! Your order is on the way!`;
  }
}

function updateHtmlElementsDisplayProperty(e) {
  if (
    e.target.dataset.burgers ||
    e.target.dataset.sides ||
    e.target.dataset.drinks ||
    e.target.dataset.pizza
  ) {
    handleMenuSectionClick();
  }

  if (e.target.dataset.homePage) {
    updateHeaderImageSrc();
    handleAddMoreBtnBackBtnClick();
    clearImagesInterval(imagesInterval);
  }

  if (!orderedItems.length) {
    handleEmptyCart();
  }

  if (e.target.dataset.cartIcon) {
    handleCartIconClick();
  }

  setDisplayForCartIconSection();
}

function getRandomImagesLink(typeOfImg) {
  const imgMenuItems = document.querySelector(".header-img");
  const randomNum = Math.floor(
    Math.random() * foodMenuSectionHeaderImages[typeOfImg].length
  );
  imgMenuItems.src = foodMenuSectionHeaderImages[typeOfImg][randomNum];
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

function updatePriceTextContent() {
  const price = getPrice();
  subTotal.textContent = `$${price.subTotal}`;
  hst.textContent = `$${price.hst}`;
  totalPrice.textContent = `$${price.totalPrice}`;
}

function removeChildFromParentElement(deleteBtnId) {
  document.getElementById(deleteBtnId).parentElement.remove();
}

function removeItemAndUpdateOrderedItemsArray(deleteBtnId) {
  for (let i = 0; i < orderedItems.length; i++) {
    if (orderedItems[i].id === deleteBtnId) {
      orderedItems.splice(i, 1);
      break;
    }
  }
  return orderedItems;
}

function validatePaymentForm() {
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

function updateHeaderImageSrc() {
  headerImg.src = "images/headerImage.avif";
}

function clearImagesInterval(imagesInterval) {
  clearInterval(imagesInterval);
}

function handleMenuSectionClick() {
  initialMenuState.style.display = "none";
  backBtn.style.display = "block";
  activeMenuSection.style.display = "block";
}

function handleAddMoreBtnBackBtnClick() {
  backBtn.style.display = "none";
  preCheckoutState.style.display = "none";
  activeMenuSection.style.display = "none";
  initialMenuState.style.display = "block";
  cartIconSection.style.display = "block";
  header.style.display = "block";
}

function handleEmptyCart() {
  cartIconSection.style.display = "none";
  cartPriceDiv.style.display = "none";
  completeOrder.style.display = "none";
}

function handleFilledCart() {
  cartIconSection.style.display = "block";
  cartPriceDiv.style.display = "block";
  completeOrder.style.display = "block";
  totalNumberOfItemsInCart.textContent = orderedItems.length;
  cartItemsSubTotal.textContent = `$${getPrice().subTotal}`;
}

function handleCartIconClick() {
  header.style.display = "none";
  backBtn.style.display = "none";
  cartIconSection.style.display = "none";
  activeMenuSection.style.display = "none";
  initialMenuState.style.display = "none";
  preCheckoutState.style.display = "block";
}

function setDisplayForCartIconSection() {
  if (
    (initialMenuState.style.display === "block" ||
      activeMenuSection.style.display === "block") &&
    orderedItems.length
  ) {
    handleFilledCart();
  } else {
    cartIconSection.style.display = "none";
  }
}

function getMenuItemsHtml(menuId) {
  let cartItemHtml = "";
  const cartItemsArray = getOrderedItems(menuId);
  cartItemsArray.forEach((cartItem) => {
    cartItemHtml = `
      <div class="cart-item display-flex">
        <p class="cart-item-name">${cartItem.name}</p>
        <p class="cart-item-price">$${cartItem.price}</p>
        <i class="fa-solid fa-trash-can cursor-pointer" id="${cartItem.id}" data-remove="${menuId}"></i>
      </div>`;
  });
  return cartItemHtml;
}

function getPrice() {
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

function getOrderedItems(menuId) {
  const menu = foodMenu.filter((menu) => menu.id === menuId);
  let orderItem = {
    id: menu[0].id,
    name: menu[0].name,
    price: menu[0].price,
  };
  orderedItems.push(orderItem);
  return orderedItems;
}

function filterMenuItems(typeOfFood) {
  return foodMenu.filter((item) => item.type === typeOfFood);
}
