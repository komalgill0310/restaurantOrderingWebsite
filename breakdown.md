💡 **List out things needs to accomplish in order to submit this project:**

6. When the user has added items to their cart, a number on top of the cart should display, the total number of items.✅
   <!-- BREAKDOWN -->
   **First Part: Create an element and set its value to total number of items in the cart.**✅
1. Create a p tag inside cart item section

   - Give it an id = total number of cart items
   - Give it a class name = total number of cart items

1. Grab that p element in JS, by its id
1. Set the text content of that element = orderedItems.length

**SECOND PART: Display that p tag on top of the cart icon**

<!-- BREAKDOWN -->

1. CSS Part

2. Display the sub total price on top of the cart icon as well.✅
<!-- BREAKDOWN -->
3. Follow the same steps as did for the above step -> for the total number of cart items.
   **However,** the only difference is that now it will be the sub total(item price only without tax) for the cart items.

4. If an item is already present in the cart and user tried to add the same item, then the item in the cart should display something like that:

- Example:
  - cartItemName x total number of items price should be double

8. Bug:

- Sometimes when there are similar items in the cart, user removes few of them and some are still left, the total price gets to 0.

- if there are similar items in the cart and the user delete an item but the similar one is still present in the cart, the array's length decreased by two => Meaning all of the items related to deleted items gets deleted from the cart.

9. Alter the position of the footer and made it stick to the bottom of the page.

10. Code Refactoring

11. Change variable names to more descriptive names

12. Style the back button below the header so user can see it.

13. If there is time:

- let the user add the review for the item
- Let the user add rating to their experience.

15. When none of the items are left on the cart, price section should display to none

16. complete Order button should display to none.

<!-- BREAKDOWN THE EVENT LISTENERS INTO THEIR OWN PART -->

1. Extract the events for the menu-sections into their own function
2. store the add and remove click event into their own function
3. Store the checkout, pay, close event into their own function
