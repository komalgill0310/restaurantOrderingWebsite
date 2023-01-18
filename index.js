import { menuArray } from "/data.js";

document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    handleAddItemClick(e.target.dataset.add);
  }
  if (e.target.dataset.remove) {
    removeItemFromCart(e.target.dataset.remove);
  }
});

function handleAddItemClick(menuId) {
  document.querySelector(".pre-checkout-state").style.display = "block";
  renderOrderedItems(menuId);
  document.getElementById(
    "total-price"
  ).textContent = `Total Price: $${getTotalPrice()}`;
}

function renderOrderedItems(menuId) {
  document.getElementById("ordered-items").innerHTML +=
    getMenuItemsHtml(menuId);
}

function getMenuItemsHtml(menuId) {
  let cartItemHtml = "";

  const itemsAddedToCart = getOrderedItems(menuId);
  itemsAddedToCart.forEach((item) => {
    cartItemHtml = `
    <h1>${item.name}</h1>
    <p>$${item.price}</p>
    <button data-remove="${menuId}">Remove</button>`;
  });
  return cartItemHtml;
}

let orderedItems = [];

function getOrderedItems(menuId) {
  let orderItem = {
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

function removeItemFromCart(menuId) {
  console.log("clicked!", menuId);
}

function getMenuItems() {
  let menuHtml = "";
  menuArray.forEach((menu) => {
    menuHtml += `<p>${menu.emoji}</p>
    <div class="item-info">
      <h1>${menu.name}</h1>
      <p>${menu.ingredients}</p>
      <p>$${menu.price}</p>
    </div>
    <div classs="add-item-btn">
      <button data-add="${menu.id}">+</button>      
  </div>`;
  });
  return menuHtml;
}

function renderMenuArray() {
  document.getElementById("menu-items").innerHTML = getMenuItems();
}

renderMenuArray();
