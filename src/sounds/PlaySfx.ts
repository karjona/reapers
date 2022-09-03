import { zzfx } from "./zzfxm";

export default function PlaySfx(sound: (number | undefined)[]) {
  zzfx(...sound);
}
