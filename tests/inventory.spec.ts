import { test } from './fixtures/allFixtures'
import { expect } from '@playwright/test';

test.describe('Inventory tests', () => {
  test('Add product to cart, checkout and ', async ({ page, loginPage, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.isOpened();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.moreThanOneProductInCart();
    await inventoryPage.shopping_cart_icon.click();
    await cartPage.checkout_button.click();
    await checkoutStepOnePage.fillInformationForm('Bob', 'Smith', '41-902');
    checkoutStepOnePage.continueButton.click();
    checkoutStepTwoPage.finishButton.click();
    await expect(checkoutCompletePage.header).toBeVisible();
  });

  test('Add product to cart and remove from inventory page', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.isOpened();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.moreThanOneProductInCart();
    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');    
    await inventoryPage.noProductsInCart();
  });

  test('Add product to cart and remove from cart page', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.isOpened();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.moreThanOneProductInCart();
    await inventoryPage.shopping_cart_icon.click();
    await cartPage.removeProductFromCart('Sauce Labs Backpack');    
    await inventoryPage.noProductsInCart();
  });
});
