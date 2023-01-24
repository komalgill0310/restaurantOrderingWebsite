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

**EXPECTED:**

1. data along with HTML elements, gets displayed on the console.

**ACTUAL:**

1. Output as expected
