(this.webpackJsonpstiny=this.webpackJsonpstiny||[]).push([[0],{10:function(e,t,a){e.exports=a.p+"static/media/3.86e83c97.jpg"},11:function(e,t,a){e.exports=a.p+"static/media/4.51c24f85.jpg"},12:function(e,t,a){e.exports=a.p+"static/media/5.7baa8c77.jpg"},13:function(e,t,a){e.exports=a.p+"static/media/default.3ab90553.png"},15:function(e,t,a){},26:function(e,t,a){e.exports=a.p+"static/media/office.f642206b.jpg"},27:function(e,t,a){e.exports=a(53)},32:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(24),i=a.n(c),s=(a(15),a(32),a(2)),r=a(3),o=a(5),m=a(4),u=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleKeyDown=function(e){"Enter"===e.key&&(console.log("do database stuff"),n.myRef.current.blur())},n.myRef=l.a.createRef(),n}return Object(r.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"row center"},l.a.createElement("div",{className:"input-field col s12"},l.a.createElement("input",{placeholder:"e.g. Album 1",ref:this.myRef,id:"search1",type:"text",onKeyDown:this.handleKeyDown}),l.a.createElement("label",{className:"active",htmlFor:"search1"},"Search")))}}]),a}(l.a.Component),d=a(6),f=a.n(d),h=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=document.querySelector(".tabs");f.a.Tabs.init(e)}},{key:"render",value:function(){return l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col s12"},l.a.createElement("ul",{className:"tabs"},l.a.createElement("li",{className:"tab col s6"},l.a.createElement("a",{className:"active",href:"#cooking"},"Photos")),l.a.createElement("li",{className:"tab col s6"},l.a.createElement("a",{href:"#cooking"},"Cooking")))))}}]),a}(l.a.Component),g=a(8),p=a.n(g),b=a(9),v=a.n(b),E=a(10),y=a.n(E),k=a(11),N=a.n(k),j=a(12),w=a.n(j),R=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).myRef=l.a.createRef(),n}return Object(r.a)(a,[{key:"componentDidUpdate",value:function(){this.myRef.current.scrollTo(0,0)}},{key:"render",value:function(){return l.a.createElement("div",{ref:this.myRef,id:"modal1",className:"modal",style:{width:"75%",maxHeight:"100%",backgroundColor:"rgba(255, 255, 255, 0.75)",position:"absolute"}},l.a.createElement("div",{className:"modal-content",style:{}},l.a.createElement("a",{href:"#!",className:"modal-close waves-effect waves-green btn"},"Exit"),l.a.createElement("h4",null,"Caption"),l.a.createElement("p",null,"*Date*"),l.a.createElement("img",{alt:"preview",style:{width:"100%",height:"100%"},src:this.props.current})))}}]),a}(l.a.Component),A={duration:300,dist:50,numVisible:5},C={opacity:0},L=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleClick=function(e){var t=e.target.attributes.alt.value;"one"===t?n.setState({picture:p.a}):"two"===t?n.setState({picture:v.a}):"three"===t?n.setState({picture:y.a}):"four"===t?n.setState({picture:N.a}):"five"===t&&n.setState({picture:w.a}),n.state.modal.open()},n.state={picture:p.a,showModal:!1,modal:null},n}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=document.querySelector(".carousel");f.a.Carousel.init(e,A);var t=document.getElementById("modal1"),a=f.a.Modal.init(t,C);this.setState({modal:a})}},{key:"render",value:function(){return l.a.createElement("div",{style:{height:"100%"}},l.a.createElement(R,{current:this.state.picture}),l.a.createElement("h2",{style:{marginBottom:"-80px"}},"Album 1"),l.a.createElement("div",{className:"carousel",style:{height:"500px"}},l.a.createElement("a",{className:"carousel-item",href:"#one!"},l.a.createElement("img",{alt:"one",src:p.a,onClick:this.handleClick})),l.a.createElement("a",{className:"carousel-item",href:"#two!"},l.a.createElement("img",{alt:"two",src:v.a,onClick:this.handleClick})),l.a.createElement("a",{className:"carousel-item",href:"#three!"},l.a.createElement("img",{alt:"three",src:y.a,onClick:this.handleClick})),l.a.createElement("a",{className:"carousel-item",href:"#four!"},l.a.createElement("img",{alt:"four",src:N.a,onClick:this.handleClick})),l.a.createElement("a",{className:"carousel-item",href:"#five!"},l.a.createElement("img",{alt:"five",src:w.a,onClick:this.handleClick}))))}}]),a}(l.a.Component),S=a(7),O=a.n(S),x=a(25),I=a.n(x),P=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleSubmit=function(){var e=n.createAlbumRef.current,t={idtoken:n.props.token,email:n.props.email,albumName:n.createAlbumRef.current.value};e.classList.contains("valid")&&e.classList.remove("valid"),e.classList.contains("invalid")&&e.classList.remove("invalid"),I.a.post("/createAlbum",t).then((function(t){e.classList.toggle("valid"),console.log(t)})).catch((function(t){e.classList.toggle("invalid"),console.log(t)}))},n.handleKeyDown=function(e){"Enter"!==e.key?(n.createAlbumRef.current.classList.remove("valid"),n.createAlbumRef.current.classList.remove("invalid")):n.handleSubmit()},n.myRef=l.a.createRef(),n.createAlbumRef=l.a.createRef(),n}return Object(r.a)(a,[{key:"componentDidUpdate",value:function(){this.myRef.current.scrollTo(0,0)}},{key:"render",value:function(){return l.a.createElement("div",{ref:this.myRef,id:"modal2",className:"modal",style:{marginTop:"22%",paddingTop:"20%",backgroundColor:"rgb(255, 255, 255, 0.9"}},l.a.createElement("div",{className:"modal-content",style:{}},l.a.createElement("a",{href:"#!",className:"modal-close waves-effect",style:{display:"inline-block"}},"Close"),l.a.createElement("h4",null,"Add Album"),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"input-field col s12"},l.a.createElement("input",{ref:this.createAlbumRef,id:"albumName",type:"text",placeholder:"e.g. Memories",onKeyDown:this.handleKeyDown}),l.a.createElement("label",{htmlFor:"albumName"},"Album Name"),l.a.createElement("span",{className:"helper-text","data-error":"Album exists / is invalid.","data-success":"Album created!"}))),l.a.createElement("a",{href:"#!",onClick:this.handleSubmit,className:"waves-effect waves-light btn"},l.a.createElement("i",{className:"material-icons left"},"cloud"),"Submit")))}}]),a}(l.a.Component),D=a(13),M=a.n(D),F=a(26),B=a.n(F),T={opacity:0},K=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleClick=function(e){n.state.addAlbumModal.open()},n.onSuccess=function(e){var t=e.getBasicProfile(),a=t.getImageUrl(),l=t.getName(),c=t.getEmail();n.setState({isLoggedIn:!n.state.isLoggedIn,profilePicture:a,name:l,email:c,token:e.getAuthResponse().id_token}),n.createAlbumRef.current.classList.remove("disabled"),n.addPhotosRef.current.classList.remove("disabled")},n.onFailure=function(e){console.log(e)},n.logout=function(){console.log("Logged out"),n.setState({isLoggedIn:!n.state.isLoggedIn,profilePicture:M.a,name:"",email:""}),n.createAlbumRef.current.classList.toggle("disabled"),n.addPhotosRef.current.classList.toggle("disabled")},n.state={isLoggedIn:!1,profilePicture:M.a,name:"",email:"",addAlbumModal:null,token:""},n.createAlbumRef=l.a.createRef(),n.addPhotosRef=l.a.createRef(),n}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=document.querySelectorAll(".sidenav");f.a.Sidenav.init(e),this.createAlbumRef.current.classList.toggle("disabled"),this.addPhotosRef.current.classList.toggle("disabled");var t=document.getElementById("modal2"),a=f.a.Modal.init(t,T);this.setState({addAlbumModal:a})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("a",{href:"#!","data-target":"slide-out",className:"sidenav-trigger left"},l.a.createElement("i",{style:{fontSize:"300%",color:"black"},className:"material-icons"},"menu")),l.a.createElement("ul",{id:"slide-out",className:"sidenav"},l.a.createElement("li",null,l.a.createElement("div",{className:"user-view"},l.a.createElement("div",{className:"background"},l.a.createElement("img",{alt:"office-background",src:B.a})),l.a.createElement("a",{href:"#user"},l.a.createElement("img",{alt:"profile",className:"circle",src:this.state.profilePicture})),l.a.createElement("a",{href:"#name"},l.a.createElement("span",{className:"white-text name"},this.state.name)),l.a.createElement("a",{href:"#email"},l.a.createElement("span",{className:"white-text email"},this.state.email)))),l.a.createElement("li",null,l.a.createElement("a",{ref:this.createAlbumRef,className:"waves-effect",href:"#!",disabled:!this.state.isLoggedIn,onClick:this.handleClick},l.a.createElement("i",{className:"material-icons"},"book"),"Create Album"),l.a.createElement(P,{token:this.state.token,email:this.state.email})),l.a.createElement("li",null,l.a.createElement("a",{ref:this.addPhotosRef,className:"waves-effect",href:"#!",disabled:!this.state.isLoggedIn},l.a.createElement("i",{className:"material-icons"},"insert_photo"),"Add Photos")),l.a.createElement("li",null,l.a.createElement(O.a,{className:"google-button",clientId:"844946981534-vkdij9ke3polifnu5qsveogtlp2etuj9.apps.googleusercontent.com",buttonText:"Login",onSuccess:this.onSuccess,onFailure:this.onFailure,cookiePolicy:"single_host_origin",disabled:this.state.isLoggedIn}),l.a.createElement(S.GoogleLogout,{className:"google-button",clientId:"844946981534-vkdij9ke3polifnu5qsveogtlp2etuj9.apps.googleusercontent.com",buttonText:"Logout",onLogoutSuccess:this.logout,disabled:!this.state.isLoggedIn})),l.a.createElement("li",null,l.a.createElement("div",{className:"divider"})),l.a.createElement("li",null,l.a.createElement("a",{href:"#!",className:"subheader"},"Built With Materialize CSS"))))}}]),a}(l.a.Component);a(51),a(52);var q=function(){return l.a.createElement("div",{className:"App",style:{background:"#FFFAFA"}},l.a.createElement(K,null),l.a.createElement("br",null),l.a.createElement("h1",null,"Stiny's Photos "),l.a.createElement(h,null),l.a.createElement(u,null),l.a.createElement(L,null),l.a.createElement("div",{className:"rect"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,a){e.exports=a.p+"static/media/1.8d68a31f.jpg"},9:function(e,t,a){e.exports=a.p+"static/media/2.6e2d9591.jpg"}},[[27,1,2]]]);
//# sourceMappingURL=main.9be9b72f.chunk.js.map