import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  readonly checkout_button: Locator;

  constructor(page: Page) {
    super(page, 'cart.html');
    this.checkout_button = this.page.locator('[data-test="checkout"]');    
  }
}