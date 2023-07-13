

//#region mFetch trials
async function _mFetch(url, cmd, data = null) {
  let sess = detectSessionType();

  if (sess == 'php' && cmd == 'yaml' && isdef(data)){
    data.cmd = cmd;
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(x=>x.json())
    .then(x=>jsyaml.load(x.res))
    .catch(error => { console.error('Error:', error); });
  }else if (sess == 'live'){
    let result = await fetch(url).then(x => cmd == 'json' ? x.json() : x.text());
    if (cmd == 'yaml') result = jsyaml.load(result);
    return result;
  }
}
async function mFetchPhp(url,cmd,data){
  data.cmd = cmd;
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(x=>x.json())
  .then(x=>jsyaml.load(x.res))
  .catch(error => { console.error('Error:', error); });
  
}
//#endregion

//#region old method: phpPost, handleResult, handleYaml
function phpPost(data, cmd) {
  var o = {};
  o.data = valf(data, {});
  o.cmd = cmd;
  o = JSON.stringify(o);

  var xml = new XMLHttpRequest();
  xml.onload = () => {
    if (xml.readyState == 4 || xml.status == 200) {
      handleResult(xml.responseText, data, cmd);
    } else { console.log('WTF?????') }
  }
  xml.open("POST", "php/api.php", true);
  xml.send(o);
}
function handleResult(result, data, cmd) {
  let obj = isEmptyOrWhiteSpace(result) ? { a: 1 } : JSON.parse(result);
  DA.result = jsCopy(obj);

  switch (cmd) {
    case "yaml": window[data.key] = jsyaml.load(obj.res); break;
    //case "yaml": handleYaml(obj,data); break;
  }
}
function handleYaml(obj,data) {
  console.log('obj', obj);
  console.log('path', data.path);
  let key = data.key; //capitalize(stringBefore(stringAfterLast(path,'/'),'.'))
  window[key] = jsyaml.load(obj.res);
  return obj.res;
}
//#endregion

//#region old mFetch
async function _mFetch(url, cmd, o = null) {
  let sess = detectSessionType();
  let method = o ? 'post' : 'get';
  if (nundef(cmd) && url.endsWith('yaml') && sess != 'php') cmd = 'yaml';
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
  } else {
    switch (cmd) {
      case 'yaml':
        let f = o.filename;

        break;
      default:
        break;
    }
  }

  return result;

}
async function mFetch(url, cmd, o = null) {
  let sess = detectSessionType();
  let method = o ? 'post' : 'get';
  if (nundef(cmd) && url.endsWith('yaml') && sess != 'php') cmd = 'yaml';
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
  } else {
    switch (cmd) {
      case 'yaml':
        let f = o.filename;

        break;
      default:
        break;
    }
  }

  return result;

}
//#endregion








