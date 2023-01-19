import { menuArray } from "/data.js";

let orderedItems = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    handleAddItemClick(e.target.dataset.add, e);
  }
  if (e.target.dataset.remove) {
    handleRemoveItemClick(e.target.dataset.remove, e);
    console.log("event: ", orderedItems);
  }
});

function handleAddItemClick(addMenuId, e) {
  document.querySelector(".pre-checkout-state").style.display = "block";
  renderOrderedItems(addMenuId, e);
  // document.getElementById(
  //   "total-price"
  // ).textContent = `Total Price: $${getTotalPrice()}`;
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
  console.log("cartItems: ", itemsAddedToCart);
  itemsAddedToCart.forEach((item) => {
    cartItemHtml = `
    <h1>${item.name}</h1>
    <p>$${item.price}</p>
    <button data-remove="${menuId}">Remove</button>`;
  });
  return cartItemHtml;
}

function getOrderedItems(menuId, e) {
  if (menuId === e.target.dataset.add) {
    let orderItem = {
      name: menuArray[menuId].name,
      price: menuArray[menuId].price,
      id: menuId,
    };
    orderedItems.push(orderItem);
    console.log("addItem: ", orderedItems);
    return orderedItems;
  }
  if (menuId === e.target.dataset.remove) {
    console.log("removeItem: ", orderedItems);
    return orderedItems;
  }
}

// function getTotalPrice() {
//   return orderedItems.reduce(
//     (totalPrice, itemPrice) => totalPrice + itemPrice.price,
//     0
//   );
// }

function handleRemoveItemClick(removeMenuId, e) {
  removeItemFromCart(removeMenuId);
  renderOrderedItems(removeMenuId, e);
}

function removeItemFromCart(removeMenuId) {
  // const filter = orderedItems.filter((item) => item.id != removeMenuId);
  // orderedItems = filter;
  // console.log("filter: ", filter);
  // console.log("orderItems: ", orderedItems);
  // return orderedItems;
  for (let i = 0; i < orderedItems.length; i++) {
    if (orderedItems[i].id === removeMenuId) {
      orderedItems.splice(i, 1);
    }
  }
  console.log("removeSplice: ", orderedItems);
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
