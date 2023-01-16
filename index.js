import { menuArray } from "/data.js";

const menuItems = document.getElementById("menu-items");

function renderMenuArray() {
  return menuArray.forEach((menu) => {
    return (menuItems.innerHTML += `
      <p>${menu.emoji}</p>
      <div class="item-info">
        <h1>${menu.name}</h1>
        <p>${menu.ingredients}</p>
        <p>${menu.price}</p>
      </div>
      <div class="add-item-btn">
        <button>+</button>
      </div>`);
  });
}

console.log("hello!");
renderMenuArray();
