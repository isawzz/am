
onload=reload;

function reload(){
  document.body.html=''
  console.log('Session',Session)
  flashMessages();
  showNavbar();
  showLoaderHolder();
  showUserDependentUI();
  showFooter();
}

function flashMessages(){
  let html=`
  {% with messages = get_flashed_messages() %}
  {% if messages: %}
  <!-- <div>{{ messages[-1] }}</div> -->
  <script type="text/javascript">mPopupMessage('{{ messages[-1] }}',{fg:'red'})</script>
  {% endif %}
  {% endwith %}
  `;
}
function showLoaderHolder(){
  let html=`
    <div id="loader_holder" class="loader_off"><img style="width: 70px" src="/base/assets/icons/giphy.gif" /></div>
  `;
}
function showFooter(){
  let html=`
    <div id="dFooter" class="my">loading..</div>
  `;
}
function showNavbar(){
  let html=`
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="user">home</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="login">login</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="logout">logout</a>
          </li>
        </ul>
      </div>
    </nav>
  `;
  document.body.innerHTML+=html;
}
function showUserDependentUI(){
  let html=`
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