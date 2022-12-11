import { defineConfig } from 'dumi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'l7-studio',
  },
  chainWebpack: (config: any) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: ['json', 'javascript'],
      },
    ]);
  },
});
