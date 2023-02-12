💡 **List out things needs to accomplish in order to submit this project:**

4. If an item is already present in the cart and user tried to add the same item, then the item in the cart should display something like that:

- Example:
  - cartItemName x total number of items price should be double

9. Alter the position of the footer and made it stick to the bottom of the page.

10. Code Refactoring

11. Change variable names to more descriptive names

12. Style the back button below the header so user can see it.

13. If there is time:

- let the user add the review for the item
- Let the user add rating to their experience.

15. When none of the items are left in the cart, price section should display to none AND complete Order button should display to none.

- QUESTION: Which section displays the price and which class holds the "COMPLETE ORDER" BUTTON
  1. div with a class name of "total-price-div" holds the price section
  2. div with a class name of "complete-order" holds the complete order button.

<!-- BREAKDOWN -->

1. When orderedItems.length === 0

- div with a class name of "total-price-div" and "complete-order" will have their display property set to "none"

<!-- BREAKDOWN THE EVENT LISTENERS INTO THEIR OWN PART -->

1. Extract the events for the menu-sections into their own function
2. store the add and remove click event into their own function
3. Store the checkout, pay, close event into their own function
