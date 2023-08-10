
//#region latest multi session type start.js
onload = start;

async function start() {
  Session.type = detectSessionType(); // console.log('session type:',Session.type);
  document.title = capitalize(Session.type);
  if (Session.type == 'live') { reload(); return; }
  else if (Session.type == 'nodejs') { //40xx
    console.log('YEAH!!!!');
    reload(); // da bleibt er einfach am client
  } else if (Session.type == 'flask') { //60xx

  } else { //php or telecave

  }
}

function reload() {
  document.body.innerHTML = ''
  console.log('Session', Session)
  flashMessages();
  showNavbar(); // bleibt am client!
  showLoaderHolder();
  showUserDependentUI();
  showFooter();
}

function flashMessages() { if (!isEmpty(Session.message)) { mPopupMessage(Session.message, { fg: 'red', paleft: 10 }); delete Session.message; } }
function flashMessages() {
  if (!isEmpty(Session.message)) {
    let d = mDiv(document.body, {}, 'dFlash', Session.message, 'flash-message fade-in');
    delete Session.message;
    setTimeout(() => {
      let d=mDiv('dFlash');
      d.classList.remove('fade-in');
      d.classList.add('fade-out');
      setTimeout(() => {
        let d=mDiv('dFlash');
        d.remove();
      }, 500); // Match the animation duration
    }, 3000); // Delay in milliseconds
  }
}

function onclickHome() { Session.message = 'clicked home'; reload(); }
function onclickLogin() { Session.message = 'clicked login'; reload(); }
function onclickLogout() { Session.message = 'clicked logout'; reload(); }

function showLoaderHolder() {
  let html = `
    <div id="loader_holder" class="loader_off"><img style="width: 70px" src="/base/assets/icons/giphy.gif" /></div>
  `;
}
function showFooter() {
  let html = `
    <div id="dFooter" class="my">loading..</div>
  `;
}
function showNavbar() {
  let html = `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link hoverHue" href="#" onclick="onclickHome()">home</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link hoverHue" href="#" onclick="onclickLogin()">login</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link hoverHue" href="#" onclick="onclickLogout()">logout</a>
          </li>
        </ul>
      </div>
    </nav>
  `;
  document.body.innerHTML += html;
}
function showUserDependentUI() {
  let html = `
    {% if username == '': %}
    <form action="#" method="post">
      <div>Enter username:</div>
      <p><input type="text" name="username" /></p>
      <p><input type="submit" value="submit"></p>
    </form>
    {% elif username == 'peter' %}
    <div>HALLO!!!! {{ username }}</div>
    <script>document.write('hallohallohallo!!!!!!!!!!!!! {{ username }}')</script>
    {% else %}
    <script>document.write('<h2 style="padding:10px">Hello, {{ username }}!</h2>')</script>
    <form onsubmit="loader_on()" action="ask" method="post"  style="padding-left:10px">
      <div>Enter query:</div>
      <p><input type="text" name="query" id="iQuery" style="width:100%" value="{{ query }}"/></p>
      <input type="submit" value="submit">
    </form>
    
    <div id="dMain">
      <!-- <p id="dResponse">answer: {{ answer }}</p> -->
      <textarea style="width:96%;height:50%;padding:10px" >{{ answer }}</textarea>
    </div>
    {% endif %}
  `;
}
//#endregion

function animationChain() {

  // Get the element to animate
  const element = document.querySelector('.animated-element');
  // Define animation properties
  const fadeInKeyframes = [
    { opacity: 0 },
    { opacity: 1 }
  ];

  const fadeOutKeyframes = [
    { opacity: 1 },
    { opacity: 0 }
  ];

  const animationOptions = {
    duration: 1000, // Animation duration in milliseconds
    fill: 'forwards' // Retain the final animation state
  };

  // Chain animations using .then()
  element.animate(fadeInKeyframes, animationOptions)
    .finished
    .then(() => {
      // Animation 1 (fadeIn) finished, start Animation 2 (fadeOut)
      return element.animate(fadeOutKeyframes, animationOptions).finished;
    })
    .then(() => {
      // Animation 2 (fadeOut) finished, perform another action
      console.log('All animations completed!');
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });

}

//#region mFetch trials
async function _mFetch(url, cmd, data = null) {
  let sess = detectSessionType();

  if (sess == 'php' && cmd == 'yaml' && isdef(data)) {
    data.cmd = cmd;
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(x => x.json())
      .then(x => jsyaml.load(x.res))
      .catch(error => { console.error('Error:', error); });
  } else if (sess == 'live') {
    let result = await fetch(url).then(x => cmd == 'json' ? x.json() : x.text());
    if (cmd == 'yaml') result = jsyaml.load(result);
    return result;
  }
}
async function mFetchPhp(url, cmd, data) {
  data.cmd = cmd;
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(x => x.json())
    .then(x => jsyaml.load(x.res))
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
function handleYaml(obj, data) {
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








