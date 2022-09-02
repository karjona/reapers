import { defineConfig } from "vite";
import kontra from "rollup-plugin-kontra";

import compress from "vite-plugin-compress";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [
    kontra({
      gameObject: {
        group: true,
        ttl: true,
        velocity: true,
      },
      sprite: {
        animation: true,
        image: true,
      },
    }),
    compress({ verbose: true, brotli: false }),
    ViteMinifyPlugin(),
    viteSingleFile(),
  ],
});
