import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'The Cheffs Kiss',
    version: '0.0.1',
    description: 'Cooking up something amazing',
    permissions: ['scripting', 'activeTab'],
    host_permissions: ['https://flavortown.hackclub.com/*'],
    browser_specific_settings: {
      gecko: {
        id: 'albumanyt@gmail.com',
        strict_min_version: '109.0',
        data_collection_permissions: {
          required: ["none"],
        },
      } as any,
    },
  },
});
