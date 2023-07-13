async function start(){
  let sess = mDetectSessionType();
  
  dMain=mSection({fg:BLUE, fz:30, family:'opensans'},'dMain')
  dMain.innerHTML = "WIE GEHT'S?! "+sess;
}