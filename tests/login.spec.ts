import { test } from './fixtures/allFixtures'
import { expect } from '@playwright/test';

test.describe('Login tests', () => {
    test.beforeEach(async ({ page, loginPage }) => {        
        await loginPage.open();
      });

    test.skip('Successful login for standard_user', async ({ page, loginPage, inventoryPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.isOpened();
    });
});
