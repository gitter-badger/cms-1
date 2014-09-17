"use strict";angular.module("cmsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","mgcrea.ngStrap.datepicker","mgcrea.ngStrap.tooltip","mgcrea.ngStrap.helpers.dateParser","mgcrea.ngStrap.timepicker"]).config(["$routeProvider",function(a){a.when("/auth",{templateUrl:"views/auth.html",controller:"AuthCtrl"}).when("/post/search",{templateUrl:"views/post/search.html",controller:"PostSearchCtrl"}).when("/post",{templateUrl:"views/post/create.html",controller:"PostCreateCtrl"}).otherwise({redirectTo:"/auth"})}]).filter("startFrom",function(){return function(a,b){return a.slice(b)}}),angular.module("cmsApp").controller("AuthCtrl",["$rootScope","$scope","$timeout","$location","oauth","User","Repository",function(a,b,c,d,e,f,g){b.finish=function(c){c&&(b.user.repository=c,b.user.skelleton=g.skelleton.get(c),a.user=b.user,d.path("/post/search"))},b.getRepositories=function(a){a?(b.user.repositories=g.organization.get(a).repositories(),b.user.organization=angular.fromJson(a)):(b.user.organization=void 0,b.user.repositories=[])},b.authenticate=function(){c(function(){b.user=f.info()},0)}}]),angular.module("cmsApp").factory("oauth",function(){var a=window.OAuth;return a.initialize("gRrK6us96AdRhG6vAGfQtbdUnY4"),a}),angular.module("cmsApp").factory("User",["_","Github",function(a,b){return{info:function(){var c=a.map(b.organization.list(),function(a){return b.organization.get().org(a.id)}),d={name:"Rodrigo",organizations:c,repositories:[]};return d}}}]),angular.module("cmsApp").factory("GithubOrganization",["_",function(a){var b=[{login:"brasil-de-fato",id:8516140,avatar_url:"https://avatars.githubusercontent.com/u/8516140?v=2"},{login:"movimento-sem-terra",id:7000646,avatar_url:"https://avatars.githubusercontent.com/u/7000646?v=2"}],c=[{id:17912445,name:"site-novo",full_name:"movimento-sem-terra/site-novo"},{id:17912445,name:"tabloides",full_name:"movimento-sem-terra/site-novo"}],d=[{id:7000646,login:"movimento-sem-terra",name:"Movimento dos Trabalhadores Rurais Sem Terra",avatar_url:"https://avatars.githubusercontent.com/u/7000646?v=2"},{id:8516140,login:"brasil-de-fato",name:"Brasil de Fato",avatar_url:"https://avatars.githubusercontent.com/u/8516140?v=2"}];return{list:function(){return b},get:function(){return{repositories:function(){return c},org:function(b){return a.find(d,function(a){return a.id===b})}}}}}]),angular.module("cmsApp").factory("_",function(){return window._}),angular.module("cmsApp").controller("PostSearchCtrl",["$scope","DateUtil","Repository",function(a,b,c){a.posts=c.post.list(),a.maxSize=5,a.currentPage=1,a.filter={month:b.now.getMonth(),year:b.now.getYear()}}]),angular.module("cmsApp").service("DateUtil",function(){this.now={getMonth:function(){return(new Date).getMonth()},getYear:function(){return(new Date).getFullYear()}}}),angular.module("cmsApp").factory("YoutubeLinkUtil",function(){function a(a){return a?c.exec(a)[1]:""}function b(b){return b?'<p style="text-align: center;"><iframe allowfullscreen="" name="coverVideo" frameborder="0" height="360" src="//www.youtube.com/embed/'+a(b)+'" width="640"></iframe></p>':""}var c=/(?:youtube\.(?:com|com\.br)\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,d={pattern:function(){return c},link:function(c){return{getId:function(){return a(c)},getEmbed:function(){return b(c)}}}};return d}),angular.module("cmsApp").factory("Repository",["Github",function(a){var b={list:function(){return a.content.posts()}},c={get:function(b){return a.content.skelleton(b)}};return{post:b,organization:a.organization,skelleton:c}}]),angular.module("cmsApp").factory("GithubContent",function(){return{skelleton:function(a){return console.log("Pegando o esqueleto do: ",a),[{name:"date",pattern:"",icon:"fa-calendar",title:"Data e hora da noticia",required:!0,type:{view:"date"}},{name:"hat",title:"Chapéu",required:!1,placeholder:"Informe o chapéu",type:{view:"textarea"}},{name:"title",title:"Título da noticia",required:!0,placeholder:"Informe o titulo",type:{view:"textarea"}},{name:"support_line",title:"Linha fina",required:!0,placeholder:"Informe o titulo",type:{view:"textarea"}},{name:"menu",title:"Editorias",required:!0,type:{view:"select",options:[{id:"agricultura camponesa",name:"agricultura camponesa"},{id:"agronegócio",name:"agronegócio"},{id:"direitos humanos",name:"direitos humanos"},{id:"educação, cultura e comunicação",name:"educação, cultura e comunicação"},{id:"lutas e mobilizações",name:"lutas e mobilizações"},{id:"solidariedade",name:"solidariedade internacional"},{id:"meio ambiente",name:"meio ambiente"},{id:"projeto popular",name:"projeto popular"},{id:"reforma agrária",name:"reforma agrária"},{id:"transgênicos",name:"transgênicos"},{id:"nossa-producao",name:"nossa produção"},{id:"poemas-e-poesias",name:"poemas e poesias"},{id:"lutadores-do-povo",name:"lutadores do povo"}]}},{name:"section",title:"Sessão",required:!1,type:{view:"select",options:[{name:"Capa",id:"cover"},{name:"Destaque",id:"featured-news"},{name:"Vídeo",id:"tv"}]}},{name:"label",title:"Gênero",required:!1,type:{view:"select",options:[{name:"Artigo",id:"articles"},{name:"Entrevista",id:"interviews"},{name:"Reportagens Especiais",id:"special-stories"}]}},{name:"video",pattern:"",icon:"fa-youtube",title:"Video de capa",placeholder:"Coloque o link para o video no Youtube",required:!0,type:{view:"video"},need:{field:"section",equal:!0,value:"tv"}},{name:"cover",pattern:"",icon:"fa-picture-o",title:"Imagem de Capa",required:!0,type:{view:"cover"},need:{field:"section",equal:!1,value:"tv"}}]},posts:function(){return[{sha:"#1",name:"Na Amazônia, Sem Terra enfrentam o grupo de Dantas",year:2014,month:10},{sha:"#2",name:"Ocupação em Goiás é batizada com o nome de Dom Tomás Balduíno",year:2014,month:10},{sha:"#3",name:"Onde está a Reforma Agrária no debate eleitoral?",year:2014,month:10},{sha:"#4",name:"JBS expõe trabalhadores ao frio e sofre a quarta condenação este ano",year:2014,month:10},{sha:"#5",name:"Três mil famílias do MST ocupam a fazenda Santa Mônica, do senador Eunício Oliveira",year:2014,month:10},{sha:"#6",name:"As grandes questões ausentes no debate eleitoral",year:2014,month:10},{sha:"#7",name:"Organizações fazem ajustes finais para plebiscito da reforma política",year:2014,month:10},{sha:"#8",name:"Dez empresas são donas de 73% das sementes de todo o mundo",year:2014,month:10}]}}}),angular.module("cmsApp").factory("Github",["GithubOrganization","GithubContent",function(a,b){return{organization:a,content:b}}]),angular.module("cmsApp").controller("PostCreateCtrl",["$rootScope","$scope",function(a,b){b.save=function(a){a.$submitted=!0},b.entity={video:"http://www.youtube.com/watch?v=UViv0FQJrgo",cover:"http://farm6.staticflickr.com/5552/14934144587_2c2b186d58_n.jpg",date:"2014-09-10T11:52:11-03:00",body:"<p><strong>Hello World</strong></p>"},b.fields=a.user.skelleton}]),angular.module("cmsApp").directive("youtube",["$window","YoutubeLinkUtil",function(a,b){return{restrict:"E",scope:{url:"@"},template:"<div></div>",link:function(c,d){function e(){return new YT.Player(d.children()[0],{playerVars:{autoplay:0,html5:1,theme:"light",modesbranding:0,color:"white",iv_load_policy:3,showinfo:1,controls:1},height:"350px",width:"100%",videoId:b.link(c.url).getId()})}function f(){i||a.onYouTubeIframeAPIReady()}var g=document.createElement("script");g.src="https://www.youtube.com/iframe_api";var h=document.getElementsByTagName("script")[0];h.parentNode.insertBefore(g,h);var i;a.onYouTubeIframeAPIReady=function(){i=e()},c.$watch("url",function(a,c){a&&a!==c&&(f(),i.cueVideoById&&i.cueVideoById(b.link(a).getId()))})}}}]),angular.module("cmsApp").directive("expand",function(){return{restrict:"A",link:function(a,b){var c=function(){for(var a=b[0];a.rows>1&&a.scrollHeight<a.offsetHeight;)a.rows--;for(var c=0;a.scrollHeight>a.offsetHeight&&c!==a.offsetHeight;)c=a.offsetHeight,a.rows++};b.bind("keyup",function(){c()}),a.$watch(function(){return b[0].value},function(){c()})}}}),angular.module("cmsApp").directive("ckEditor",function(){return{require:"?ngModel",link:function(a,b,c,d){var e=window.CKEDITOR.replace(b[0]);CKEDITOR.plugins.addExternal("youtube","/ckeditor-plugins/youtube/","plugin.js"),e.config.extraPlugins="youtube,justify,image2",e.config.language="pt-BR",e.config.height="100%",d&&(e.on("maximize",function(){window.scrollTo(0,0)}),e.on("pasteState",function(){a.$apply(function(){d.$setViewValue(e.getData())})}),d.$render=function(){e.setData(d.$viewValue)})}}}),angular.module("cmsApp").directive("showErrors",function(){return{restrict:"A",require:"^form",link:function(a,b,c,d){var e=b[0].querySelector("input, select, textarea"),f=angular.element(e),g=f.attr("name"),h=function(){var a=d[g].$invalid;window.$(b.parent().get(0)).toggleClass("has-error",a),b.toggleClass("has-error",a)};f.bind("blur",function(){h()})}}}),angular.module("cmsApp").directive("dynamicName",["$compile",function(a){return{restrict:"A",terminal:!0,priority:2e3,link:function(b,c,d){c.attr("name",b.$eval(d.dynamicName)),c.removeAttr("dynamic-name"),a(c)(b)}}}]),angular.module("cmsApp").directive("dynamicRequired",["$compile",function(a){return{restrict:"A",terminal:!0,priority:1e3,link:function(b,c,d){var e=b.$eval(d.dynamicRequired),f=e.need;if(f){var g=f.field,h=f.value,i=f.equal?"===":"!==",j=["entity.",g,i,"'",h,"'"].join("");c.attr("ng-required",j)}else c.attr("ng-required","field.required");c.removeAttr("dynamic-required"),a(c)(b)}}}]);