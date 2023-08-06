async function start() {
  console.log('HALLO ENDE'); return;
  dMain = mSection({ fg: BLUE, fz: 30, family: 'opensans' }, 'dMain',"WIE GEHT'S?!");
  //test2_php(); //test1_php();//test1_php0(); //test0_live();

  Syms = await mLoadAsset('allSyms');
  console.log('Syms', Syms)
}
async function mFetch(data){
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
    
  }
}
async function test2_php(){
  let data = {path: DIR_BASE+'assets/allSyms.yaml'};
  //console.log('path',data.path)
  Syms = await mFetchPhp("php/api.php",'yaml',data);
  console.log('Syms',Syms, typeof Syms);

}
async function test1_php(){
  let data = {path: '../../base/assets/allSyms.yaml'};
  Syms = await mFetchPhp("php/api.php",'yaml',data);
  console.log('Syms',Syms);

}
async function test1_php0(){
  let data = {path: '../../base/assets/allSyms.yaml',
  key:'Syms',cmd:'yaml'};  
  Syms=await fetch("php/api.php",
  {
    method:'POST',
    body: JSON.stringify(data)
  })
  .then(x=>x.json())
  .then(x=>jsyaml.load(x.res))


}

async function test0_live(){
  DB=await mFetch('../../base/DB.yaml');
  console.log('DB',DB);  
}

function isNumberOrTimeString(w) { return misNumber(w) || isTimeString(w); }
function misNumeric(x) { return !isNaN(+x); }

















