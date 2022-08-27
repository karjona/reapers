import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { viteSingleFile } from "vite-plugin-singlefile";
import compress from "vite-plugin-compress";

export default defineConfig({
  plugins: [compress({ verbose: true }), ViteMinifyPlugin(), viteSingleFile()],
});
