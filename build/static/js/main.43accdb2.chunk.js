(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{183:function(e,t,a){e.exports=a.p+"static/media/rudy.75865109.jpg"},190:function(e,t,a){e.exports=a(436)},195:function(e,t,a){},196:function(e,t,a){},197:function(e,t,a){},211:function(e,t,a){},305:function(e,t,a){},321:function(e,t,a){},325:function(e,t,a){},326:function(e,t,a){},347:function(e,t,a){},348:function(e,t,a){},349:function(e,t,a){},350:function(e,t,a){},435:function(e,t,a){},436:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(42),s=a.n(o);a(195),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=a(10),l=a(13),i=a(16),u=a(14),m=a(15),d=(a(196),a(197),a(52)),p=a(57),h=a(75),b=a.n(h),f=a(34),E=a.n(f),v=a(29),g=r.a.createContext(null),O=a(177),j=a.n(O),w=(a(211),function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.props.visible&&r.a.createElement("div",{className:"loader-container"},r.a.createElement(j.a,{animation:"border",variant:"primary"})))}}]),t}(n.Component)),y=r.a.createContext(null),C=function(e){return function(t){return r.a.createElement(y.Consumer,null,function(a){return r.a.createElement(e,Object.assign({},t,{firebase:a}))})}},S=y,k=a(64),N=a.n(k),L=(a(284),a(286),a(437),{apiKey:"AIzaSyDz1CK0UmQu5Pm_ewZvwHiboJPXmaktyTc",authDomain:"one-v-one.firebaseapp.com",databaseURL:"https://one-v-one.firebaseio.com",projectId:"one-v-one",storageBucket:"one-v-one.appspot.com",messagingSenderId:"43068152268"}),x=function e(){var t=this;Object(c.a)(this,e),this.doCreateUserWithEmailAndPassword=function(e,a){return t.auth.createUserWithEmailAndPassword(e,a)},this.doSignInWithEmailAndPassword=function(e,a){return t.auth.signInWithEmailAndPassword(e,a)},this.doSignOut=function(){return t.auth.signOut()},this.doPasswordReset=function(e){return t.auth.sendPasswordResetEmail(e)},this.doPasswordUpdate=function(e){return t.auth.currentUser.updatePassword(e)},this.user=function(e){return t.db.ref("users/".concat(e))},this.users=function(){return t.db.ref("users")},this.post=function(e){return t.db.ref("posts/".concat(e))},this.posts=function(){return t.db.ref("posts")},this.song=function(e){return t.storage.ref().child("audio/".concat(e))},this.songs=function(){return t.storage.ref().child("audio")},N.a.initializeApp(L),this.auth=N.a.auth(),this.db=N.a.database(),this.storage=N.a.storage(),this.EmailAuthProvider=N.a.auth.EmailAuthProvider},P=function(e){var t=function(t){function a(e){var t;return Object(c.a)(this,a),(t=Object(i.a)(this,Object(u.a)(a).call(this,e))).state={authUser:null,showLoader:!0},t}return Object(m.a)(a,t),Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.listener=this.props.firebase.auth.onAuthStateChanged(function(t){t?e.setState({authUser:t}):e.setState({authUser:null}),e.setState({showLoader:!1})})}},{key:"componentWillUnmount",value:function(){this.listener()}},{key:"render",value:function(){return r.a.createElement(g.Provider,{value:this.state.authUser},r.a.createElement(w,{visible:this.state.showLoader}),r.a.createElement(e,this.props))}}]),a}(r.a.Component);return C(t)},U=a(63),I="/home",A="/search",R=function(e){return function(t){var a=function(a){function n(){return Object(c.a)(this,n),Object(i.a)(this,Object(u.a)(n).apply(this,arguments))}return Object(m.a)(n,a),Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.listener=this.props.firebase.auth.onAuthStateChanged(function(a){e(a)||t.props.history.push("/signin")})}},{key:"componentWillUnmount",value:function(){this.listener()}},{key:"render",value:function(){var a=this;return r.a.createElement(g.Consumer,null,function(n){return e(n)?r.a.createElement(t,a.props):null})}}]),n}(r.a.Component);return Object(U.a)(p.k,C)(a)}},T=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(g.Consumer,null,function(t){return r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"v-align"},"Hi, ",t.displayName),r.a.createElement(v.LinkContainer,{to:"/profile"},r.a.createElement(E.a.Link,null,"Profile")),r.a.createElement(v.LinkContainer,{to:I},r.a.createElement(E.a.Link,{onClick:e.props.firebase.doSignOut},"Sign out")))})}}]),t}(n.Component),D=C(T),F=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"flex"},r.a.createElement(v.LinkContainer,{to:"/signup"},r.a.createElement(E.a.Link,null,"Sign up")),r.a.createElement(v.LinkContainer,{to:"/signin"},r.a.createElement(E.a.Link,null,"Sign in")))}}]),t}(n.Component),G=a(28),W=a(22),B=a(6),H=a.n(B),M=a(23),z=a.n(M),J={search:""},K=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onSubmit=function(e){var t=a.state.search;a.setState(Object(W.a)({},J)),a.props.history.push("".concat(A,"?q=").concat(encodeURI(t))),e.preventDefault()},a.onChange=function(e){a.setState(Object(G.a)({},e.target.name,e.target.value))},a.state=Object(W.a)({},J),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state.search,t=""===e;return r.a.createElement(H.a,{inline:!0,onSubmit:this.onSubmit},r.a.createElement(H.a.Control,{name:"search",value:e,onChange:this.onChange,type:"text",placeholder:"Search",className:"mr-sm-2"}),r.a.createElement(z.a,{variant:"outline-success",type:"submit",disabled:t},"Search"))}}]),t}(n.Component),V=(Object(p.k)(K),a(305),function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(g.Consumer,null,function(e){return r.a.createElement(b.a,{bg:"light",expand:"lg",className:"app-navbar"},r.a.createElement(v.LinkContainer,{to:"/"},r.a.createElement(b.a.Brand,null,"One V. One")),r.a.createElement(b.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(b.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(E.a,{className:"mr-auto"},e&&r.a.createElement(v.LinkContainer,{to:I},r.a.createElement(E.a.Link,null,"Home")),!1),e?r.a.createElement(D,null):r.a.createElement(F,null)))})}}]),t}(n.Component)),Y=a(101),q=a.n(Y),Q=a(74),X=a.n(Q),Z=a(27),$=a.n(Z),_=a(25),ee=a.n(_),te=a(24),ae=a.n(te),ne=a(99),re=a.n(ne),oe=a(76),se=a.n(oe),ce=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(se.a,{style:{width:"18rem"}},r.a.createElement(se.a.Body,null,r.a.createElement(se.a.Title,null,"Rapper A Vs. Rapper B."),r.a.createElement(se.a.Text,null,"Throwdown of the century"),r.a.createElement(v.LinkContainer,{to:"/battle/"+this.props.battleId},r.a.createElement(z.a,{variant:"primary"},"View"))))}}]),t}(n.Component);function le(e){for(var t="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<e;n++)t+=a.charAt(Math.floor(Math.random()*a.length));return t}n.Component;var ie=a(62),ue=a(440),me=a(439),de=a(441),pe=a(188),he=function(e){function t(e,a){var n;return Object(c.a)(this,t),(n=Object(i.a)(this,Object(u.a)(t).call(this,e,a))).handleChange=n.handleChange.bind(Object(ie.a)(n)),n.audioplayer=r.a.createRef(),n.state={value:n.props.rating,listens:n.props.listens||0},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.audioplayer.current.onplaying=function(t){var a=e.state.listens+1;e.setState({listens:a}),e.props.firebase.post(e.props.id).update({listens:a})}}},{key:"handleChange",value:function(e,t){e=e.length>1?e[1]:e.length>0?e[0]:0,this.setState({value:e}),this.props.firebase.post(this.props.id).update({rating:e})}},{key:"render",value:function(){return r.a.createElement(ue.a,{style:{width:"fit-content"}},r.a.createElement(ue.a.Body,null,r.a.createElement(ue.a.Title,null,this.props.title),r.a.createElement(ue.a.Subtitle,{className:"mb-2 text-muted"},this.props.user),r.a.createElement(ue.a.Text,null,this.props.description),r.a.createElement("audio",{src:this.props.audioURL,controls:!0,ref:this.audioplayer}),r.a.createElement("br",null),r.a.createElement(me.a,null,r.a.createElement(de.a,{value:this.state.value,onChange:this.handleChange,type:"checkbox",name:"options"},r.a.createElement(pe.a,{value:1},r.a.createElement("span",{role:"img","aria-label":"like"},"\ud83d\udc4d")),r.a.createElement(pe.a,{value:2},r.a.createElement("span",{role:"img","aria-label":"dislike"},"\ud83d\udc4e"))),r.a.createElement("span",{className:"listens",role:"img","aria-label":"listens"},"\ud83c\udfb6: ",this.state.listens))))}}]),t}(n.Component),be=C(he),fe=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={posts:[],hasMoreItems:!0,nextHref:null},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"loadItems",value:function(e){var t=this;this.props.firebase.posts().on("value",function(e){if(e.val()){var a=Object.values(e.val());t.setState({posts:a,hasMoreItems:!1})}})}},{key:"render",value:function(){var e=r.a.createElement("div",{key:"loader"},"Loading...");return r.a.createElement($.a,null,r.a.createElement(ee.a,{className:"justify-content-md-center"},r.a.createElement(ae.a,{md:"auto"},r.a.createElement(re.a,{pageStart:0,loadMore:this.loadItems.bind(this),hasMore:this.state.hasMoreItems,loader:e},r.a.createElement("div",{className:"posts"},this.state.posts.map(function(e,t){return r.a.createElement(be,{key:t,listens:e.listens,rating:e.rating,id:e.id,user:e.username,title:e.title,description:e.description,audioURL:e.audioPath})}))))))}}]),t}(n.Component),Ee=C(fe),ve=(a(321),function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(q.a,{defaultActiveKey:"posts",id:"uncontrolled-tab-example"},r.a.createElement(X.a,{eventKey:"posts",title:"Posts"},r.a.createElement("div",null,r.a.createElement("p",null,"Want to upload a song?"),"  ",r.a.createElement(v.LinkContainer,{to:"/post"},r.a.createElement(z.a,{variant:"primary"},"Upload"))),r.a.createElement(Ee,null)),!1)}}]),t}(n.Component)),ge=R(function(e){return!!e})(ve),Oe=(a(325),function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return r.a.createElement($.a,{fluid:!0,className:"flex-grow-column"},r.a.createElement(ee.a,{className:"flex-grow-row"},r.a.createElement(ae.a,{md:9,className:"flex-grow-column"},r.a.createElement($.a,{className:"flex-grow-column"},r.a.createElement(ee.a,{className:"flex-grow-row bordered"},r.a.createElement("section",{className:"make-center"},r.a.createElement("input",{type:"text",id:"broadcast-id",autoCorrect:"off",autoCapitalize:"off",size:"20"}),r.a.createElement("button",{id:"open-or-join"},"Open or Join Broadcast"),r.a.createElement("div",{className:"make-center",id:"broadcast-viewers-counter"}),r.a.createElement("video",{id:"video-preview",controls:!0,loop:!0})),r.a.createElement("section",{className:"make-center"},r.a.createElement("input",{type:"text",id:"broadcast-id2",autoCorrect:"off",autoCapitalize:"off",size:"20"}),r.a.createElement("button",{id:"open-or-join2"},"Open or Join Broadcast"),r.a.createElement("div",{className:"make-center",id:"broadcast-viewers-counter2"}),r.a.createElement("video",{id:"video-preview2",controls:!0,loop:!0}))),r.a.createElement(ee.a,{className:"bordered"},r.a.createElement("p",null,"Battle ID: ",this.props.match.params.battleid," ",r.a.createElement("br",null),"Rapper A vs. Rapper B ",r.a.createElement("br",null),"Some other details")))),r.a.createElement(ae.a,{md:3,className:"bordered"},"Chat bar")))}}]),t}(n.Component)),je={passwordOne:"",passwordTwo:"",passwordOld:"",error:null,success:!1},we=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onSubmit=function(e){e.preventDefault(),a.setState({error:null,success:!1});var t=a.state,n=t.passwordOld,r=t.passwordOne,o=a.props.firebase.EmailAuthProvider.credential(a.props.email,n);a.props.firebase.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(o).then(function(){return a.props.firebase.doPasswordUpdate(r)}).then(function(){a.setState(Object(W.a)({},je,{success:!0}))}).catch(function(e){a.setState({error:e})})},a.onChange=function(e){a.setState(Object(G.a)({},e.target.name,e.target.value))},a.state=Object(W.a)({},je),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.passwordOld,a=e.passwordOne,n=e.passwordTwo,o=e.error,s=e.success,c=a!==n||""===a||""===t;return r.a.createElement(H.a,{onSubmit:this.onSubmit},r.a.createElement("h3",null,"Change Password"),r.a.createElement(H.a.Group,{controlId:"passwordCurrent"},r.a.createElement(H.a.Label,null,"Current Password"),r.a.createElement(H.a.Control,{name:"passwordOld",value:t,onChange:this.onChange,type:"password",placeholder:"Current Password"})),r.a.createElement(H.a.Group,{controlId:"password"},r.a.createElement(H.a.Label,null,"New Password"),r.a.createElement(H.a.Control,{name:"passwordOne",value:a,onChange:this.onChange,type:"password",placeholder:"New Password"})),r.a.createElement(H.a.Group,{controlId:"passwordConfirm"},r.a.createElement(H.a.Label,null,"Confirm New Password"),r.a.createElement(H.a.Control,{name:"passwordTwo",value:n,onChange:this.onChange,type:"password",placeholder:"Confirm New Password"})),r.a.createElement(z.a,{variant:"primary",type:"submit",disabled:c},"Save"),o&&r.a.createElement("p",{className:"error"},o.message),s&&r.a.createElement("p",{className:"success"},"Password changed!"))}}]),t}(n.Component),ye=C(we),Ce={error:null,success:!1},Se=function(e){function t(e){var a;Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onSubmit=function(e){e.preventDefault(),a.setState({error:null,success:!1});var t=a.state.displayName;a.props.firebase.auth.currentUser.updateProfile({displayName:t}).then(function(){a.setState(Object(W.a)({},Ce,{success:!0}))}).catch(function(e){a.setState({error:e})})},a.onChange=function(e){a.setState(Object(G.a)({},e.target.name,e.target.value))};var n=a.props.displayName;return a.state=Object(W.a)({},Ce,{displayName:n}),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.displayName,a=e.error,n=e.success,o=""===t;return r.a.createElement(H.a,{onSubmit:this.onSubmit},r.a.createElement("h3",null,"Username"),r.a.createElement(H.a.Group,{controlId:"displayName"},r.a.createElement(H.a.Control,{name:"displayName",value:t,onChange:this.onChange,type:"text"})),r.a.createElement(z.a,{variant:"primary",type:"submit",disabled:o},"Save"),a&&r.a.createElement("p",{className:"error"},a.message),n&&r.a.createElement("p",{className:"success"},"Username Updated! (Refresh for update)"))}}]),t}(n.Component),ke=C(Se),Ne=(a(326),function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(g.Consumer,null,function(e){return r.a.createElement($.a,{className:"settings-container"},r.a.createElement(ee.a,{className:"justify-content-md-center"},r.a.createElement(ae.a,{md:"auto"},r.a.createElement("h1",null,"Settings"),r.a.createElement("p",null,"Account: ",e.email),r.a.createElement(ke,{displayName:e.displayName}),r.a.createElement("br",null),r.a.createElement(ye,{email:e.email}))))})}}]),t}(n.Component)),Le=a(128),xe=(a(335),{bio:"",artists:[],genres:[],error:null,success:!1,showLoader:!0}),Pe=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onSubmit=function(e){e.preventDefault(),a.setState({error:null,success:!1});var t=a.state,n=t.bio,r=t.artists,o=t.genres;a.props.firebase.user(a.props.uid).update({bio:n,artists:r,genres:o}).then(function(){a.setState({success:!0})}).catch(function(e){a.setState({error:e})})},a.onChange=function(e){a.setState(Object(G.a)({},e.target.name,e.target.value))},a.state=Object(W.a)({},xe),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.firebase.users().on("value",function(t){var a=t.val()[e.props.uid];e.setState({bio:a.bio,artists:a.artists||[],genres:a.genres||[],showLoader:!1})})}},{key:"render",value:function(){var e=this,t=this.state,a=t.bio,n=t.artists,o=t.genres,s=t.error,c=t.success;return r.a.createElement(H.a,{onSubmit:this.onSubmit},r.a.createElement(w,{visible:this.state.showLoader}),r.a.createElement(H.a.Group,{controlId:"bio"},r.a.createElement(H.a.Label,null,"Bio"),r.a.createElement(H.a.Control,{name:"bio",value:a,onChange:this.onChange,as:"textarea",rows:"3"})),r.a.createElement(H.a.Group,{controlId:"artists"},r.a.createElement(H.a.Label,null,"Favorite Artists"),r.a.createElement(Le.a,{id:"artists",multiple:!0,name:"artists",selected:n,onChange:function(t){e.setState({artists:t})},options:["john","elton","candy","man","ooga","booga"]})),r.a.createElement(H.a.Group,{controlId:"genres"},r.a.createElement(H.a.Label,null,"Favorite Genres"),r.a.createElement(Le.a,{id:"genres",multiple:!0,name:"genres",selected:o,onChange:function(t){e.setState({genres:t})},options:["john","elton","candy","man","ooga","booga"]})),r.a.createElement(z.a,{variant:"primary",type:"submit"},"Save"),s&&r.a.createElement("p",{className:"error"},s.message),c&&r.a.createElement("p",{className:"success"},"Profile updated!"))}}]),t}(n.Component),Ue=C(Pe),Ie=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(g.Consumer,null,function(e){return r.a.createElement(q.a,{defaultActiveKey:"profile",id:"uncontrolled-tab-example"},r.a.createElement(X.a,{eventKey:"profile",title:"Profile"},r.a.createElement($.a,{className:"settings-container"},r.a.createElement(ee.a,{className:"justify-content-md-center"},r.a.createElement(ae.a,{md:"auto"},r.a.createElement("h1",null,"Profile"),r.a.createElement(Ue,{uid:e.uid}))))),r.a.createElement(X.a,{eventKey:"settings",title:"Settings"},r.a.createElement(Ne,null)),!1)})}}]),t}(n.Component),Ae=R(function(e){return!!e})(Ie),Re=a(125),Te=a.n(Re),De=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={searchTerm:null},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=Te.a.parse(this.props.history.location.search).q;this.setState({searchTerm:decodeURI(e)})}},{key:"componentWillReceiveProps",value:function(e){this.setState({searchTerm:decodeURI(Te.a.parse(this.props.history.location.search).q)})}},{key:"render",value:function(){var e=this.state.searchTerm;return r.a.createElement("div",null,r.a.createElement("h1",null,"Search"),e&&r.a.createElement("p",null,'You searched for "',e,'".'))}}]),t}(n.Component),Fe=(a(347),{username:"",email:"",passwordOne:"",passwordTwo:"",error:null,showLoader:!1}),Ge=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onSubmit=function(e){e.preventDefault(),a.setState({showLoader:!0});var t=a.state,n=t.username,r=t.email,o=t.passwordOne,s={bio:"",artists:[],genres:[]};a.props.firebase.doCreateUserWithEmailAndPassword(r,o).then(function(e){return e.user.updateProfile({displayName:n}).then(function(){return e})}).then(function(e){return a.props.firebase.user(e.user.uid).set(Object(W.a)({},s,{username:n,email:r}))}).then(function(){return a.props.firebase.doSignOut()}).then(function(){return a.props.firebase.doSignInWithEmailAndPassword(r,o)}).then(function(){a.setState(Object(W.a)({},Fe)),a.props.history.push(I)}).catch(function(e){a.setState({error:e,showLoader:!1})})},a.onChange=function(e){a.setState(Object(G.a)({},e.target.name,e.target.value))},a.state=Object(W.a)({},Fe),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.username,a=e.email,n=e.passwordOne,o=e.passwordTwo,s=e.error,c=n!==o||""===n||""===a||""===t;return r.a.createElement($.a,null,r.a.createElement(w,{visible:this.state.showLoader}),r.a.createElement(ee.a,{className:"justify-content-md-center"},r.a.createElement(ae.a,{md:"auto"},r.a.createElement(H.a,{onSubmit:this.onSubmit},r.a.createElement("h1",null,"Sign up"),r.a.createElement(H.a.Group,{controlId:"username"},r.a.createElement(H.a.Label,null,"Full Name"),r.a.createElement(H.a.Control,{name:"username",value:t,onChange:this.onChange,type:"text",placeholder:"John Doe"})),r.a.createElement(H.a.Group,{controlId:"email"},r.a.createElement(H.a.Label,null,"Email Address"),r.a.createElement(H.a.Control,{name:"email",value:a,onChange:this.onChange,type:"text",placeholder:"Email Address"}),r.a.createElement(H.a.Text,{className:"text-muted"},"We'll never share your email with anyone else.")),r.a.createElement(H.a.Group,{controlId:"password"},r.a.createElement(H.a.Label,null,"Password"),r.a.createElement(H.a.Control,{name:"passwordOne",value:n,onChange:this.onChange,type:"password",placeholder:"Password"})),r.a.createElement(H.a.Group,{controlId:"passwordConfirm"},r.a.createElement(H.a.Label,null,"Confirm Password"),r.a.createElement(H.a.Control,{name:"passwordTwo",value:o,onChange:this.onChange,type:"password",placeholder:"Confirm Password"})),r.a.createElement(z.a,{variant:"primary",type:"submit",disabled:c},"Sign up"),s&&r.a.createElement("p",{className:"error"},s.message)))))}}]),t}(n.Component),We=Object(U.a)(p.k,C)(Ge),Be=(a(348),{email:"",password:"",error:null,showLoader:!1}),He=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onSubmit=function(e){a.setState({showLoader:!0});var t=a.state,n=t.email,r=t.password;a.props.firebase.doSignInWithEmailAndPassword(n,r).then(function(){a.setState(Object(W.a)({},Be)),a.props.history.push(I)}).catch(function(e){a.setState({error:e,showLoader:!1})}),e.preventDefault()},a.onChange=function(e){a.setState(Object(G.a)({},e.target.name,e.target.value))},a.state=Object(W.a)({},Be),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.password,n=e.error,o=""===a||""===t;return r.a.createElement($.a,null,r.a.createElement(w,{visible:this.state.showLoader}),r.a.createElement(ee.a,{className:"justify-content-md-center"},r.a.createElement(ae.a,{md:"auto"},r.a.createElement(H.a,{onSubmit:this.onSubmit},r.a.createElement("h1",null,"Sign in"),r.a.createElement(H.a.Group,{controlId:"email"},r.a.createElement(H.a.Label,null,"Email Address"),r.a.createElement(H.a.Control,{name:"email",value:t,onChange:this.onChange,type:"text",placeholder:"Email Address"})),r.a.createElement(H.a.Group,{controlId:"password"},r.a.createElement(H.a.Label,null,"Password"),r.a.createElement(H.a.Control,{name:"password",value:a,onChange:this.onChange,type:"password",placeholder:"Password"}),r.a.createElement(v.LinkContainer,{to:"/forgot"},r.a.createElement(E.a.Link,{className:"link-sm"},"Forgot your password?"))),r.a.createElement(z.a,{variant:"primary",type:"submit",disabled:o},"Sign in"),n&&r.a.createElement("p",{className:"error"},n.message)))))}}]),t}(n.Component),Me=Object(U.a)(p.k,C)(He),ze=(a(349),function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"notfound-container"},r.a.createElement("h1",null,"404"),r.a.createElement("p",null,"The page you are looking for does not exist. :("),r.a.createElement(v.LinkContainer,{to:I,className:"notfound-link"},r.a.createElement(E.a.Link,null,"Go Home")))}}]),t}(n.Component)),Je={email:"",error:null,success:!1},Ke=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onSubmit=function(e){a.setState({error:null,success:!1});var t=a.state.email;a.props.firebase.doPasswordReset(t).then(function(){a.setState(Object(W.a)({},Je,{success:!0}))}).catch(function(e){a.setState({error:e})}),e.preventDefault()},a.onChange=function(e){a.setState(Object(G.a)({},e.target.name,e.target.value))},a.state=Object(W.a)({},Je),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.error,n=e.success,o=""===t;return r.a.createElement($.a,null,r.a.createElement(ee.a,{className:"justify-content-md-center"},r.a.createElement(ae.a,{md:"auto"},r.a.createElement(H.a,{onSubmit:this.onSubmit},r.a.createElement("h1",null,"Reset Password"),r.a.createElement(H.a.Group,{controlId:"email"},r.a.createElement(H.a.Label,null,"Email Address"),r.a.createElement(H.a.Control,{name:"email",value:t,onChange:this.onChange,type:"text",placeholder:"Email Address"})),r.a.createElement(z.a,{variant:"primary",type:"submit",disabled:o},"Reset Password"),a&&r.a.createElement("p",{className:"error"},a.message),n&&r.a.createElement("p",{className:"success"},"Successfully reset! You show have received an email.")))))}}]),t}(n.Component),Ve=C(Ke),Ye=a(18),qe=a(38),Qe=(a(350),a(77)),Xe=a.n(Qe),Ze=a(183),$e=a.n(Ze),_e=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(Ye.Provider,{className:"landing-wrapper"},r.a.createElement(qe.Hero,{color:"black",bg:"white",backgroundImage:"https://source.unsplash.com/jxaj-UrzQbc/1600x900"},r.a.createElement(Ye.Heading,null,"Name of your app"),r.a.createElement(Ye.Subhead,null,"a couple more words"),r.a.createElement(qe.CallToAction,{href:"/signup",mt:3},"Sign Up!"),r.a.createElement(qe.ScrollDownIndicator,null)),r.a.createElement(Ye.Heading,{className:"margin-heading",textAlign:"center"},"Features"),r.a.createElement(Ye.Flex,{flexWrap:"wrap",justifyContent:"center"},r.a.createElement(qe.Feature,{icon:"\ud83d\udc4b",description:"What your users see first"},"Hero"),r.a.createElement(qe.Feature,{icon:"\ud83d\udd25",description:"What your app can do"},"Features"),r.a.createElement(qe.Feature,{icon:"\ud83d\udce9",description:"How to keep in touch"},"Sign Up")),r.a.createElement(Ye.Heading,{className:"margin-heading",textAlign:"center"},"What people are saying"),r.a.createElement(Ye.Flex,{alignItems:"flex-end",justifyContent:"space-around"},r.a.createElement(qe.Testimony,{className:"padded-testimony grow-card",authorAvatar:Xe.a,authorName:"Herman Starikov",authorTitle:"developer"},"Use react-landing-page for your landing page needs. Or do not, I am not a beggar..."),r.a.createElement(qe.Testimony,{className:"padded-testimony grow-card",authorAvatar:Xe.a,authorName:"Herman Starikov",authorTitle:"developer"},"Use react-landing-page for your landing page needs. Or do not, I am not a beggar..."),r.a.createElement(qe.Testimony,{className:"padded-testimony grow-card",authorAvatar:Xe.a,authorName:"Herman Starikov",authorTitle:"developer"},"Use react-landing-page for your landing page needs. Or do not, I am not a beggar...")),r.a.createElement(Ye.Heading,{className:"margin-heading",textAlign:"center"},"Made by"),r.a.createElement(Ye.Flex,{justifyContent:"center"},r.a.createElement(qe.Contributor,{className:"grow-card",fullName:"Jinghu Lei",title:"developer",avatar:Xe.a},r.a.createElement(Ye.Flex,null,r.a.createElement(Ye.NavLink,{href:"https://github.com/jinghul"},"GitHub"))),r.a.createElement(qe.Contributor,{className:"grow-card",fullName:"Rudhra Raveendran",title:"developer",avatar:$e.a},r.a.createElement(Ye.Flex,null,r.a.createElement(Ye.NavLink,{href:"https://github.com/ROODAY"},"GitHub")))),r.a.createElement(Ye.Flex,{is:"footer",alignItems:"center",p:3},r.a.createElement(Ye.NavLink,{children:"Source Code",href:"#"}),r.a.createElement(Ye.NavLink,{children:"Writeup",href:"#"}),r.a.createElement(Ye.Small,{color:"grey",ml:"auto"},"\xa9 NUS Ventures, 2019")))}}]),t}(n.Component),et=a(186),tt=(a(435),{title:"",description:"",error:null,success:!1,showForm:!1,recording:!1,audioBlob:null,transcript:"",showLoader:!1,countdownDate:Date.now()+6e3});var at=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onSubmit=function(e){e.preventDefault(),a.setState({showLoader:!0});var t=a.state,n=t.title,r=t.description,o=t.transcript,s=a.props.firebase.auth.currentUser.displayName,c=([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,function(e){return(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)});a.props.firebase.song(c).put(a.state.audioBlob).then(function(e){return a.props.firebase.song(c).getDownloadURL()}).then(function(e){return a.props.firebase.post(c).set({username:s,title:n,description:r,audioPath:e,transcript:o,id:c})}).then(function(){a.setState(Object(W.a)({},tt,{success:!0,showLoader:!1}))}).catch(function(e){a.setState({error:e,showLoader:!1})})},a.onChange=function(e){a.setState(Object(G.a)({},e.target.name,e.target.value))},a.state=Object(W.a)({},tt,{audioUrl:null}),a.countdown=r.a.createRef(),a.startRecording=a.startRecording.bind(Object(ie.a)(a)),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"startRecording",value:function(){var e=this;navigator.mediaDevices.getUserMedia({audio:!0}).then(function(t){var a=new MediaRecorder(t),n=new window.webkitSpeechRecognition;a.start(),n.start(),n.onresult=function(t){var a=t.results[0][0].transcript;e.setState({transcript:a,showForm:!0})},n.onnomatch=function(t){e.setState({transcript:"Could not transcribe",showForm:!0})},e.countdown.current.date=Date.now()+3e3,e.countdown.current.getApi().start(),e.setState({recording:!0,success:null});var r=[];a.addEventListener("dataavailable",function(e){r.push(e.data)}),a.addEventListener("stop",function(){var t=new Blob(r),a=URL.createObjectURL(t);e.setState({audioUrl:a,audioBlob:t,recording:!1});var n=new FileReader;n.readAsDataURL(t),n.onloadend=function(){n.result}}),setTimeout(function(){a.stop(),n.stop()},6e3)})}},{key:"render",value:function(){var e=this.state,t=e.title,a=e.description,n=e.error,o=e.success,s=""===t||""===a;return r.a.createElement($.a,{className:"settings-container"},r.a.createElement(w,{visible:this.state.showLoader}),r.a.createElement(ee.a,{className:"justify-content-md-center"},r.a.createElement(ae.a,{md:"auto"},r.a.createElement("h1",null,"Upload a song"),r.a.createElement("p",null,"Press record and sing until the timer is over! ",r.a.createElement("br",null),"If you're satisfied, upload the clip to our servers for processing, ",r.a.createElement("br",null),"or press Start to record again!"),r.a.createElement(z.a,{onClick:this.startRecording},"Start Recording")," ",this.state.recording&&r.a.createElement("div",{id:"rec"},null),r.a.createElement("br",null),r.a.createElement(et.a,{date:this.state.countdownDate,autoStart:!1,ref:this.countdown,renderer:function(e){var t=e.seconds;return 1===t?r.a.createElement("h3",null,"Time Left: ",t," second"):r.a.createElement("h3",null,"Time Left: ",t," seconds")}}),this.state.showForm&&r.a.createElement(H.a,{onSubmit:this.onSubmit},r.a.createElement("h3",null,"Your Song"),r.a.createElement("audio",{src:this.state.audioUrl,controls:!0}),r.a.createElement("p",null,this.state.transcript),r.a.createElement(H.a.Group,{controlId:"title"},r.a.createElement(H.a.Label,null,"Title"),r.a.createElement(H.a.Control,{name:"title",value:t,onChange:this.onChange,type:"text"})),r.a.createElement(H.a.Group,{controlId:"description"},r.a.createElement(H.a.Label,null,"Description"),r.a.createElement(H.a.Control,{name:"description",value:a,onChange:this.onChange,as:"textarea",rows:"3"})),r.a.createElement(z.a,{variant:"primary",type:"submit",disabled:s},"Upload")),n&&r.a.createElement("p",{className:"error"},n.message),o&&r.a.createElement("p",{className:"success"},"Song Uploaded!"))))}}]),t}(n.Component),nt=R(function(e){return!!e})(C(at)),rt=P(function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(d.BrowserRouter,null,r.a.createElement(V,{ref:this.nav}),r.a.createElement(p.g,null,r.a.createElement(p.d,{exact:!0,path:"/",component:_e}),r.a.createElement(p.d,{path:I,component:ge}),r.a.createElement(p.d,{path:"/battle/:battleid",component:Oe}),r.a.createElement(p.d,{path:"/profile",component:Ae}),r.a.createElement(p.d,{path:A,component:De}),r.a.createElement(p.d,{path:"/signup",component:We}),r.a.createElement(p.d,{path:"/signin",component:Me}),r.a.createElement(p.d,{path:"/forgot",component:Ve}),r.a.createElement(p.d,{path:"/post",component:nt}),r.a.createElement(p.d,{component:ze})))}}]),t}(n.Component));s.a.render(r.a.createElement(S.Provider,{value:new x},r.a.createElement(rt,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},77:function(e,t,a){e.exports=a.p+"static/media/jing.72de4501.jpg"}},[[190,1,2]]]);
//# sourceMappingURL=main.43accdb2.chunk.js.map