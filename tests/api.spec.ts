import { test, expect } from '@playwright/test';
import { ApiClient } from './common/apiClient';

test.describe('API Tests for JSONPlaceholder', () => {
    test('Fetch all posts', async ({ request }) => {
        const context = new ApiClient(request);
        const response = await context.get(`posts`);
        expect(response.ok()).toBeTruthy();
        const posts = await response.json();
        expect(posts).toHaveLength(100);
    });

    test('Fetch a single post by id=1', async ({ request }) => {
        const context = new ApiClient(request);
        const response = await context.get(`posts/1`);
        expect(response.ok()).toBeTruthy()
        const post = await response.json();
        expect(post.id).toBe(1);
    });

    test('Fetch all comments', async ({ request }) => {
        const context = new ApiClient(request);
        const response = await context.get(`comments`);
        expect(response.ok()).toBeTruthy()
        const comments = await response.json();
        expect(comments.length).toBeGreaterThan(0);
    });

    test('Fetch comments for post Id=1', async ({ request }) => {
        const context = new ApiClient(request);
        const response = await context.get(`comments?postId=1`);
        expect(response.ok()).toBeTruthy()
        const comments = await response.json();
        expect(comments.every(comment => comment.postId === 1)).toBe(true);
    });
});