import { zzfxM, zzfxP } from "./zzfxm";

export default function PlayMusic(song: any) {
  // @ts-ignore
  const mySongData = zzfxM(...song);
  zzfxP(...mySongData);
}
