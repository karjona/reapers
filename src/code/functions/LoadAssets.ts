import { loadImage } from "kontra";
import player1webp from "/src/images/players/player1.webp";
import player2webp from "/src/images/players/player2.webp";

export async function LoadAssets() {
  const player1Image = await loadImage(player1webp);
  const player2Image = await loadImage(player2webp);

  return {
    player1Image,
    player2Image,
  };
}
