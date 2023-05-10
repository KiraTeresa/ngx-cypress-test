import {defineConfig} from 'cypress';
import {initPlugin} from 'cypress-plugin-snapshots/plugin';

export default defineConfig({
  projectId: 'w343s1',
  viewportHeight: 1080,
  viewportWidth: 1920,
  experimentalWebKitSupport: true,
  e2e: {
    setupNodeEvents(on, config) {
      initPlugin(on, config);
      return config;
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: [
      '**/1-getting-started/*',
      '**/2-advanced-examples/*',
      '**/examples/*',
      '**/__snapshots__/*',
      '**/__image_snapshots__/*'],
  },
  env: {
    'cypress-plugin-snapshots':
      {
        imageConfig: {
          threshold: 0.01,
        },
      },
  },
})
;
