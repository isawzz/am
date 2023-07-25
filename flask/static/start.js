onload=start

async function start(){
  dFooter = mBy('dFooter');
  dFooter.innerHTML += '..DONE!';

  //console.log('url',window.location)

}




//#region fleetingMessage
function clearFleetingMessage() {
  if (isdef(dFleetingMessage)) {
    dFleetingMessage.remove();
    dFleetingMessage = null;
  }
}
function showFleetingMessage(msg, dParent, styles = {}, ms = 3000, msDelay = 0, fade = true) {
  clearFleetingMessage();

  dFleetingMessage = mDiv(dParent);
  if (msDelay) {
    TOFleetingMessage = setTimeout(() => fleetingMessage(msg, dFleetingMessage, styles, ms, fade), msDelay);
  } else {
    TOFleetingMessage = setTimeout(() => fleetingMessage(msg, dFleetingMessage, styles, ms, fade), 10);
  }
}
function mFleetingMessage(msg, styles, ms, fade) {
  if (isString(msg)) {
    dFleetingMessage.innerHTML = msg;
    mStyle(dFleetingMessage, styles);
  } else {
    mAppend(dFleetingMessage, msg);
  }
  if (fade) Animation1 = mAnimate(dFleetingMessage, 'opacity', [1, .4, 0], null, ms, 'ease-in', 0, 'both');
  return dFleetingMessage;
}
//#endregion
