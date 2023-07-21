async function start(){
  dMain=mSection({fg:BLUE, fz:30, family:'opensans'},'dMain')
  dMain.innerHTML = "WIE GEHT'S?!"

  DB=await mFetch('../../base/DB.yaml');
  console.log('DB',DB);

}

async function mFetch(url, cmd, o = null) {
  let sess = detectSessionType();
  let method = o ? 'post' : 'get';
  if (nundef(cmd) && url.endsWith('yaml') && sess!='php') cmd = 'yaml';
  console.log('mFetch', sess, cmd, method);

  let result;
  if (method == 'get') {
    if (sess == 'live') {
      result = await fetch(url).then(x => cmd == 'json' ? x.json() : x.text());
      if (cmd == 'yaml') result = jsyaml.load(result);
    } else if (sess == 'php') {
      result = await fetch(url).then(x => cmd == 'json' ? x.json() : x.text());
      if (cmd == 'yaml') result = jsyaml.load(result);
    }
  }

  return result;

}



















