💡 **List out things needs to accomplish in order to submit this project:**

1. Finish the styling for the app✅

   - Style for the Payment Model

2. When click on anywhere on the page, except the payment model, Payment model should disappear✅

   - click will be a mouse click
     - so I need to listen for the mouse click
       - When do I need to listen
         - When the screen is on pre-checkout section and payment model is displaying

- BREAKDOWN:
  1. Check if the closest element neither payment modal nor complete order button

2. When payment model is active, the background should be disabled.

- the delete icon should be disabled
- complete order button should be disabled.

4. When user is seeing their cart items, cart should not be visible on the pre-checkout-state page.

5. When user click on Pay button,

- Payment modal should disappear
- pre-checkout-state should disappear
- Screen should display text -> Thank you USERNAME! Your order will be ready in 10Min.

6. When the user has added items to their cart, a number on top of the cart should display, the total number of items.

7. If an item is already present in the cart and user tried to add the same item, then the item in the cart should display something like that:

- Example:
  - cartItemName x total number of items price should be double

8. Bug:

- Sometimes when there are similar items in the cart, user removes few of them and some are still left, the total price gets to 0.

9. Alter the position of the footer and made it stick to the bottom of the page.

10. Code Refactoring

11. Change variable names to more descriptive names

12. Style the back button below the header so user can see it.

13. Bug:

- for the cart icon, when click anywhere except the cart, the icon won't work as expected.

14. If there is time:

- let the user add the review for the item
- Let the user add rating to their experience.

15. When none of the items are left on the cart, price sectin should display to none

16. complete Order button should display to none.

<!-- BREAKDOWN THE EVENT LISTENERS INTO THEIR OWN PART -->

1. Extract the events for the menu-sections into their own function
2. store the add and remove click event into their own function
3. Store the checkout, pay, close event into their own function
