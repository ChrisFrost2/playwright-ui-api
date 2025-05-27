import { test, expect } from '@playwright/test';
import { ApiClient } from './common/apiClient';
import { Post } from "./common/types";

let context: ApiClient;
test.describe('API Tests for JSONPlaceholder', () => {
    test.beforeEach(async ({ request }) => {
        context = new ApiClient(request);
    });

    test('Fetch all posts', async ({ request }) => {
        const response = await context.get(`posts`);
        expect(response.ok()).toBeTruthy();
        const posts = await response.json();
        expect(posts).toHaveLength(100);
    });

    test('Fetch a single post by id=1', async ({ request }) => {
        const response = await context.get(`posts/1`);
        expect(response.ok()).toBeTruthy()
        const post = await response.json();
        expect(post.id).toBe(1);
    });

    test('Fetch all comments', async ({ request }) => {
        const response = await context.get(`comments`);
        expect(response.ok()).toBeTruthy()
        const comments = await response.json();
        expect(comments.length).toBeGreaterThan(0);
    });

    test('Fetch comments for post id=1', async ({ request }) => {
        const response = await context.get(`comments?postId=1`);
        expect(response.ok()).toBeTruthy()
        const comments = await response.json();
        expect(comments.every(comment => comment.postId === 1)).toBe(true);
    });

    test('Fetch post id=1 all comments', async ({ request }) => {
        const response = await context.get(`posts/1/comments`);
        expect(response.ok()).toBeTruthy()
        const comments = await response.json();
        expect(comments.every(comment => comment.postId === 1)).toBe(true);
    });

    test('Create a new post', async ({ request }) => {
        const newPost: Post = {
            title: 'New post ąęółśżźć',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            userId: 1
        };

        const response = await context.post(`posts`, newPost);
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        expect(post.title).toBe(newPost.title);
        expect(post.body).toBe(newPost.body);
        expect(post.userId).toBe(1);
    });

    test('Update post id=1', async ({ request }) => {
        const updatedPost: Post = { title: 'Updated title', body: 'Modified content', userId: 1 };
        const response = await context.put(`posts/1`, updatedPost);
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        expect(post.title).toBe(updatedPost.title);
    });

    test('Delete post by id', async ({ request }) => {
        const response = await context.delete(`posts`, 1);
        expect(response.ok()).toBeTruthy();
    });
});