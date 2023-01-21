import { menuArray } from "/data.js";

document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    handleAddItemClick(e.target.dataset.add, e);
  }
  if (e.target.dataset.remove) {
    handleRemoveItemClick(e.target.id);
  }
});

function handleAddItemClick(menuId, e) {
  document.querySelector(".pre-checkout-state").style.display = "block";
  renderOrderedItems(menuId, e);
  document.getElementById(
    "total-price"
  ).textContent = `Total Price: $${getTotalPrice()}`;
}

function renderOrderedItems(menuId, e) {
  document.getElementById("ordered-items").innerHTML += getMenuItemsHtml(
    menuId,
    e
  );
}

function getMenuItemsHtml(menuId, e) {
  let cartItemHtml = "";
  const itemsAddedToCart = getOrderedItems(menuId, e);
  itemsAddedToCart.forEach((item) => {
    cartItemHtml = `
      <div class="order-item">
        <h1>${item.name}</h1>
        <p>$${item.price}</p>
        <button id="${item.id}" data-remove="${menuId}">Remove</button>
      </div>`;
  });
  return cartItemHtml;
}

let orderedItems = [];

function getOrderedItems(menuId, e) {
  if (menuId === e.target.dataset.add) {
    let orderItem = {
      name: menuArray[menuId].name,
      price: menuArray[menuId].price,
      id: menuId,
    };
    orderedItems.push(orderItem);
    return orderedItems;
  }
  if (menuId === e.target.dataset.remove) {
    return orderedItems;
  }
}

function getTotalPrice() {
  // const arr = removeDeleteItemFromOrderedItems();
  // console.log(arr);
  console.log("check where it's get called", orderedItems);
  const price = orderedItems.length
    ? orderedItems.reduce(
        (totalPrice, itemPrice) => totalPrice + itemPrice.price,
        0
      )
    : 0;
  console.log("price: ", price);
  return price;
}

function handleRemoveItemClick(removeElement) {
  document.getElementById(removeElement).parentElement.remove();
  removeDeleteItemFromOrderedItems(removeElement);
  // getTotalPrice();
  document.getElementById(
    "total-price"
  ).textContent = `Total Price: $${getTotalPrice()}`;
}

function removeDeleteItemFromOrderedItems(removeElement) {
  for (let i = 0; i < orderedItems.length; i++) {
    if (orderedItems[i].id === removeElement) {
      orderedItems.splice(i, 1);
    }
  }
  console.log(orderedItems);
  return orderedItems;
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
