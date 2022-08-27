import { collides } from "kontra";
import { canvas, player1, player2 } from "../data/Instances";
import { fighterWalkSpeed } from "../data/Constants";

export default function CheckFighterCollisions() {
  if (collides(player1.hitbox, player2.hitbox)) {
    if (player1.hitbox.dx > 0 && player2.hitbox.dx === 0) {
      if (player2.hitbox.x + player2.hitbox.width < canvas.width) {
        player2.hitbox.x += fighterWalkSpeed;
      }
      if (player2.hitbox.x + player2.hitbox.width === canvas.width) {
        player1.hitbox.x = player1.hitbox.x - 1;
      }
    }
  }
}
