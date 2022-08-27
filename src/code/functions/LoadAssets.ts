import { loadImage } from "kontra";

export async function LoadAssets() {
  const player1Image = await loadImage("/src/images/players/player1.webp");
  const player2Image = await loadImage("/src/images/players/player2.webp");

  return {
    player1Image,
    player2Image,
  };
}
