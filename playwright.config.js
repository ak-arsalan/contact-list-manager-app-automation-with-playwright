import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    baseURL: 'https://thinking-tester-contact-list.herokuapp.com/',
  },
  reporter: [['list'], ['json', { outputFile: 'test-results.json' }]],
});
