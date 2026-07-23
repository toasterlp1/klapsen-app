//Für Jannikgruppe man man
const AVATARE = {
  "säule": "https://cdn.discordapp.com/avatars/514145088822181908/86c56c968daead276bd60db8473249ce.webp?size=256",
  "ügelibügeli": "https://cdn.discordapp.com/avatars/758271488045350912/12300b63fc57de58b01a3a3408a21f80.webp?size=256",
  "cijäy": "https://cdn.discordapp.com/avatars/756944039160578129/b27f04ad8e3d620d1a0760ac277e6543.webp?size=256",
  "töbi": "https://cdn.discordapp.com/avatars/205076563593527297/0956f387e30864f0b795d99c8d1ff34b.webp?size=256",
  "töster": "https://cdn.discordapp.com/avatars/809064080790388788/363545deb70181b55f6ee50ddc77f6d0.webp?size=256",
  "älex": "https://cdn.discordapp.com/avatars/1123315501205045358/303743e9efe0d3a644cada7957c9fcfe.webp?size=256",
};
function avatarFor(name){
  return AVATARE[name] || null;
}
