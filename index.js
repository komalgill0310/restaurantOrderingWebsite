import { menuArray } from "/data.js";

document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    handleAddItemClick(e.target.dataset.add);
  }
});

function handleAddItemClick(menuId) {
  document.querySelector(".pre-checkout-state").style.display = "block";
  document.getElementById("ordered-items").innerHTML += `
  <h1>${menuArray[menuId].name}</h1>
  <p>$${menuArray[menuId].price}</p>`;
  document.getElementById(
    "total-price"
  ).textContent = `Total Price: $${getTotalPrice(menuId)}`;
}

let orderItemsPrice = [];

function getTotalPrice(menuId) {
  orderItemsPrice.push(menuArray[menuId].price);
  return orderItemsPrice.reduce((a, c) => a + c, 0);
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
