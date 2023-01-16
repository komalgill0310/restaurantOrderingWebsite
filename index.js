import { menuArray } from "/data.js";

document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    handleAddItemClick(e.target.dataset.add);
  }
});

function handleAddItemClick(menuId) {
  console.log(menuId);
  document.querySelector(".your-order-text").style.display = "block";
  const orderedItems = document.getElementById("ordered-items");
  orderedItems.innerHTML += `
  <h1>${menuArray[menuId].name}</h1>
  <p>$${menuArray[menuId].price}</p>`;
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
