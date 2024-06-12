/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import circleDependency from 'vite-plugin-circular-dependency';

export default ({ mode }: { mode: string }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return defineConfig({
        root: __dirname,
        cacheDir: '../../node_modules/.vite/apps/client',

        define: {
            'process.env.CLIENT_URL': JSON.stringify(env.CLIENT_URL),
            'process.env.API_URL': JSON.stringify(env.API_URL),
        },

        server: {
            port: 4200,
            host: 'localhost',
        },

        preview: {
            port: 4300,
            host: 'localhost',
        },

        plugins: [react(), nxViteTsPaths(), circleDependency()],
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: '/src/',
                },
                {
                    find: '@it-shop/types',
                    replacement: 'lib/types/src/index.ts',
                },
                {
                    find: '@it-shop/schemas',
                    replacement: 'lib/schemas/src/index.ts',
                },
            ],
        },

        // Uncomment this if you are using workers.
        // worker: {
        //  plugins: [ nxViteTsPaths() ],
        // },

        build: {
            outDir: '../../dist/apps/client',
            reportCompressedSize: true,
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        },

        test: {
            globals: true,
            cache: {
                dir: '../../node_modules/.vitest',
            },
            environment: 'jsdom',
            include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

            reporters: ['default'],
            coverage: {
                reportsDirectory: '../../coverage/apps/client',
                provider: 'v8',
            },
        },
    });
};
