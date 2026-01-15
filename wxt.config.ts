import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'Recipie Finder',
    version: '0.0.1',
    description: 'Cooking up something amazing',
    permissions: ['scripting', 'activeTab'],
    host_permissions: ['https://flavortown.hackclub.com/*'],
    content_scripts: [
      {
        matches: ['https://flavortown.hackclub.com/*'],
        js: ['content.ts'],
      },
    ],
  },
});
