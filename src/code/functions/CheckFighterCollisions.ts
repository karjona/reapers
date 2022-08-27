import { collides } from "kontra";
import { player1, player2 } from "../data/Instances";

export default function CheckFighterCollisions() {
  if (collides(player1.hitbox, player2.hitbox)) {
    player1.hitboxColor = "red";
    player2.hitboxColor = "red";
  } else {
    player1.hitboxColor = "yellow";
    player2.hitboxColor = "yellow";
  }
}
