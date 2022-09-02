export default function PlayMusic() {
  // @ts-ignore
  const audioContext = new (window.AudioContext || webkitAudioContext)();
  const gainNode = audioContext.createGain();
  const notes = [
    16,
    15,
    15,
    14,
    11,
    10,
    9,
    8,
    7,
    7,
    7,
    7,
    7,
    8,
    ,
    9,
    10,
    11,
    ,
    13,
    14,
    16,
    18,
    22,
    23,
    24,
    24,
    23,
    23,
    23,
    22,
    21,
    21,
    20,
    18,
    17,
    14,
    10,
    7,
    6,
    5,
    5,
    4,
    4,
    4,
    4,
    5,
    6,
    7,
    8,
    10,
    13,
    20,
    21,
    22,
    22,
    22,
    21,
    20,
    18,
    15,
    13,
    12,
    12,
    13,
    14,
  ];

  for (let i = 0; i <= notes.length; i++) {
    const oscillator = audioContext.createOscillator();
    if (notes[i]) {
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start(i * 0.15);
      oscillator.frequency.setValueAtTime(
        // @ts-ignore
        200 * 1.06 ** (13 - notes[i]),
        i * 0.15
      );
      oscillator.type = "sawtooth";
      gainNode.gain.setValueAtTime(1, i * 0.15);
      gainNode.gain.setTargetAtTime(0.0001, i * 0.15 + 0.13, 0.005);
      oscillator.stop(i * 0.15 + 0.14);
    }
  }
}
