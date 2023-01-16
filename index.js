import { menuArray } from "/data.js";

document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    console.log(e.target.dataset.add);
  }
});

function getMenuItems() {
  let menuHtml = "";
  menuArray.forEach((menu) => {
    menuHtml += `<p>${menu.emoji}</p>
    <div class="item-info">
      <h1>${menu.name}</h1>
      <p>${menu.ingredients}</p>
      <p>${menu.price}</p>
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
