// @ts-nocheck
import zip from "bestzip";
import crossExecFile from "cross-exec-file";
import efficientCompressionTool from "ect-bin";
import { existsSync, unlinkSync, statSync } from "fs";
import { resolve } from "path";

async function Compress() {
  const distPath = resolve(__dirname, "..", "dist");
  const zipPath = resolve(__dirname, "..", "reapers.zip");

  if (existsSync(zipPath)) {
    unlinkSync(zipPath);
  }

  await zip({
    cwd: distPath,
    source: "index.html",
    destination: zipPath,
  });

  await crossExecFile(efficientCompressionTool, ["-9", "-zip", zipPath]);

  const size = statSync(zipPath).size;
  const zipEmoji = size > 13 * 1024 ? "😰" : "🎉";

  console.log(`\n${zipEmoji} Compressed size: ${size} bytes`);
}

Compress();
