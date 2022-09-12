import { zzfx } from "./zzfx";

export default function PlaySfx(sound: (number | undefined)[]) {
  zzfx(...sound);
}
