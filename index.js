import { menuArray } from "/data.js";
import { imagesObj } from "./imageObj.js";

init();
let orderedItems = [];

function getRandomImagesLink(typeOfImg) {
  const imgMenuItems = document.querySelector(".header-img");
  const randomNum = Math.floor(Math.random() * imagesObj[typeOfImg].length);
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
    if (
      !e.target.closest(".checkout-payment-modal-state") &&
      !e.target.closest(".checkout-btn")
    ) {
      document.querySelector(".checkout-payment-modal-state").style.display =
        "none";
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
  console.log(price);
  document.getElementById("sub-total").textContent = `$${price.subTotal}`;
  document.getElementById("hst").textContent = `$${price.hst}`;
  document.getElementById("total-price").textContent = `$${price.totalPrice}`;
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

let imagesInterval;

function renderMenu(typeOfFood) {
  getRandomImagesLink(typeOfFood);
  document.getElementById("menu-items").innerHTML = getMenuItems(typeOfFood);
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
    console.log(
      `orderedItems[i].id is ${orderedItems[i].id} and deleteBtnId is ${deleteBtnId}`
    );
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
    document.querySelector(".back-btn").style.display = "block";
    document.querySelector(".active-menu-section").style.display = "block";
    document.querySelector(".initial-menu-state").style.display = "none";
  }
  if (homePage) {
    document.querySelector(".back-btn").style.display = "none";
    document.querySelector(".pre-checkout-state").style.display = "none";
    document.querySelector(".active-menu-section").style.display = "none";
    document.querySelector(".initial-menu-state").style.display = "block";
    document.querySelector(".cart-items-section").style.display = "block";
    document.querySelector(".header").style.display = "block";
    document.querySelector(".header-img").src = "images/headerImage.avif";
    clearInterval(imagesInterval);
  }
  if (!orderedItems.length) {
    document.querySelector(".cart-items-section").style.display = "none";
    document.querySelector(".total-price-div").style.display = "none";
    document.querySelector(".complete-order").style.display = "none";
  }

  if (!pay && orderedItems.length) {
    document.querySelector(".cart-items-section").style.display = "block";
    document.querySelector(".total-price-div").style.display = "block";
    document.querySelector(".complete-order").style.display = "block";
    document.getElementById("total-number-of-cart-items").textContent =
      orderedItems.length;
    document.getElementById("total-price-for-cart-items").textContent = `$${
      getTotalPrice().subTotal
    }`;
  }

  if (document.querySelector(".pre-checkout-state").style.display === "block") {
    document.querySelector(".cart-items-section").style.display = "none";
  }

  if (cartButton) {
    document.querySelector(".back-btn").style.display = "none";
    document.querySelector(".active-menu-section").style.display = "none";
    document.querySelector(".initial-menu-state").style.display = "none";
    document.querySelector(".pre-checkout-state").style.display = "block";
    document.querySelector(".header").style.display = "none";
    document.querySelector(".cart-items-section").style.display = "none";
  }
}

function displayMessage() {
  const msg = validateForm();
  if (msg) {
    alert(msg);
  } else {
    document.querySelector(".pre-checkout-state").style.display = "none";
    document.querySelector(".checkout-payment-modal-state").style.display =
      "none";
    document.querySelector(".cart-items-section").style.display = "none";
    document.querySelector(".header").style.display = "block";
    document.querySelector(".header-img").src = "images/headerImage.avif";
    clearInterval(imagesInterval);
    document.getElementById("order-on-the-way").innerHTML = `Thanks ${
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
        <button class="online-order-btn" data-add="${menuItem.id}">Online Order</button>
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
    console.log(`cartItem: ${cartItem.id}`);
    cartItemHtml = `
      <div class="cart-item display-flex">
        <p class="cart-item-name-el">${cartItem.name}</p>
        <p class="cart-item-price-el">$${cartItem.price}</p>
        <i class="fa-solid fa-trash-can" id="${cartItem.id}" data-remove="${menuId}"></i>
      </div>`;
  });
  return cartItemHtml;
}

//Pushing the items into an array
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
