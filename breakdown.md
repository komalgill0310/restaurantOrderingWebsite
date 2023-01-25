**Render more food items on page**

1. Update the data.js file with the food items.✅

**Next Goal:**

1. Create three div on page✅

   - Sides
   - Burger
   - Pizza
   - Drinks

2. this section will appear page when the user open up the website.
   **How To**

   1. create a main section✅

      - create four div inside main section
      - div1 => Sides
      - div2 => Burgers
      - div3 => Pizza
      - div4 => Drinks

**Next Goal:**

1. filter out the data✅

- array one would be only for => Pizza
- array two would be for => Burger
- array three would be for => Sides
- array four would be for => Drinks
  *Is there a way to have the logic written out once, then call that function as many times as you like.*✅

2. Add a type property in data.js file, where the value of that obj key's type would be == what kind of food is that item ✅

**Next Goal: Render the menu items on page**

- _How to:_
  1.  render only One array item first
  - create a function which will create the Html element in order to render the items from an array of object.
    - this function will loop through the object of an array item
      - use forEach loop to loop through the data
        - inside forEach loop, create an html using template literal
    - create a string variable each time when function gets called
    - return the string variable which hold the html
    - LOG Out to see if the function works as expected.
      1. How to render the console on the DOM
         - Displaying Pizza item on the console.
      2. I want to display the pizza menu items under the Pizza div
         - create a function which will render the menu items on the page.
           1. get a hold of the pizza div
           2. change the innerHTML of pizza div would be = getMenuItems()
              **Output is as expected**

**EXPECTED:**

1. data along with HTML elements, gets displayed on the console.

**ACTUAL:**

1. Output as expected

**Next Goal: REnder the item on the page only when user click on the div**✅

1. Covert a Pizza div to Clickable div

   - So when user click on the Pizza div
     - display the pizza items

_Breakdown:_

1. Create a border around Pizza div
2. Give Padding and margin to it
3. Give a background color

**How to make the div clickable**

1. give a dataset to each div
2. add an eventListener to the document
3. Prevent the Default behaviour of the even
4. Use an if condition to check if the dataset of the clickable div is pizza,

- Console.log(dataset of the clicked div)

5. When user click on the Div

- Display that div's items on the console.

  1. Call getMenuItems with the dataset value✅

- How to render the div items on the DOM✅
  1. When user click on div as an example => Burgers
  2. All the other div will not be shown on the page
  3. That div content will be the HTML of the Burger Menu-items
  - Able to do that by changing the content of the Menu-section inside which is the parent of the each menu-item-section

**Next Goal: How to go back after clicking the Div meaning if user wants to go to the another section of the div**

1. can I create a BACK button, which only gets displayed when user click on any of the menu item sectino

- Functionality of BACK button
  1. When user click on this button, it will take user to the screen, which loads up when user open the website.
  2. Where to create this button✅
  - create this button in the HTML
  - By Default, its display property will be "none"
  - it's display property will change to "Block" when user click on any of the site.
  3. **Logic:**
  - Give a data attribute to back button
  - Check if the data attribute is back button
    - log on console it's data attribute's value✅
  4. **How to go back to the main-page when user click on the BACK button**
  - We need to display the menu-section of the div the way it was when user opened the website. Somehow, we need to display the menu section again
  1.
