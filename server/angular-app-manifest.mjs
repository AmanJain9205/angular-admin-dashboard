
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/angular-admin-dashboard/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "src/app/features/dashboard/components/dashboard/dashboard.component.ts": [
    {
      "path": "chunk-IJCM7LRV.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-TK4KHLFT.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-N6Y5JQ67.js",
      "dynamicImport": false
    }
  ],
  "src/app/features/users/components/users/users.component.ts": [
    {
      "path": "chunk-IHF2MP4M.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-Q6ZYTRAU.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-TK4KHLFT.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-YCMKFLUD.js",
      "dynamicImport": false
    }
  ],
  "src/app/features/products/components/products/products.component.ts": [
    {
      "path": "chunk-BSMX6PXW.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-Q6ZYTRAU.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-N6Y5JQ67.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-YCMKFLUD.js",
      "dynamicImport": false
    }
  ],
  "src/app/features/analytics/components/analytics/analytics.component.ts": [
    {
      "path": "chunk-TQQYJNW3.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-TK4KHLFT.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-N6Y5JQ67.js",
      "dynamicImport": false
    }
  ],
  "src/app/features/settings/components/settings/settings.component.ts": [
    {
      "path": "chunk-CTOOW2MQ.js",
      "dynamicImport": false
    },
    {
      "path": "chunk-YCMKFLUD.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 6470, hash: '7c8dd47739646cacdb8bc0c9ad20d8d87e270850d4506d82acedd66d7684d3c6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1137, hash: '0d46257f1561cb792811e1fd886880b54c9da2aa14fa7132825ea3aaaf2e42a5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-6TYULNNZ.css': {size: 305756, hash: 'YjZs1YHNn1U', text: () => import('./assets-chunks/styles-6TYULNNZ_css.mjs').then(m => m.default)}
  },
};
