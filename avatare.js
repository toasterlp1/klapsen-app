
const GRUPPE = "movehaengers";

const AVATARE = {
  "emooo": "https://cdn.discordapp.com/avatars/1021789366575710260/4f346707e65c4fd4b4a3d115b8755280.webp?size=256",
  "luuu": "https://cdn.discordapp.com/avatars/769606009508855898/1b9f37690e5aa7c7ac4353904ea4d3c5.webp?size=256",
  "lone": "https://cdn.discordapp.com/avatars/1292716508337799299/8b8663401756e14adeec15c9fa95cc3e.webp?size=256",
  "pacman": "https://cdn.discordapp.com/avatars/1173295394072039455/8ce92afedaae3e4fe5ac21489b71fdb3.webp?size=256",
  "smöökinghigh": "https://cdn.discordapp.com/avatars/1176925420071956672/8baa6d927b244b833fb52e57115a2710.webp?size=256",
  "mistertöby": "https://cdn.discordapp.com/avatars/574983072542621707/2d3f4a172e64a970178ebe68e72ab3e1.webp?size=256",
  "införnäl": "https://cdn.discordapp.com/avatars/428143445836824576/e359f86e8c6ee217a286c5d2b4b147e4.webp?size=256",
  "töster": "https://cdn.discordapp.com/avatars/809064080790388788/c35e2e93adb83e54de9b308fe5a37c9a.webp?size=256"
};
function avatarFor(name){
  return AVATARE[name] || null;
}
function aktuelleGruppe(){
  return (typeof GRUPPE !== 'undefined' && GRUPPE) ? GRUPPE : 'standard';
}
