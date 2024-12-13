import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  testDir: './test',
  webServer: {
    command: 'bun run preview',
    url: 'http://localhost:4321/',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4321/',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
