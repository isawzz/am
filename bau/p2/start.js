async function start(){
  let sess = mDetectSessionType();
  
  dMain=mSection({fg:GREEN, fz:30, family:'opensans'},'dMain')
  dMain.innerHTML = "WIE GEHT'S?! "+sess;

  DB = await mLoadFromBase('DB.yaml');
}

async function mPost(data){
  let sess = mDetectSessionType();
  console.log('sess',sess,'data',data)
  if (sess == 'php') {
    let url = DIR_BASE+'php/api.php';
    console.log('url',url)
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(x => x.json())
      .then(x => jsyaml.load(x.res))
      .catch(error => { console.error('Error:', error); });
  } else if (sess == 'live') {
    let result = await fetch(data.path).then(x => data.cmd == 'json' ? x.json() : x.text());
    if (data.cmd == 'yaml') result = jsyaml.load(result);
    return result;
  } else if (sess == 'nodejs'){
    let result = await fetch(data.path).then(x => data.cmd == 'json' ? x.json() : x.text());
    if (data.cmd == 'yaml') result = jsyaml.load(result);
    return result;

  }
}
