function initCopyright(){var a=new Date,b=".footer-copyright-year";$(b).empty(),$(b).append(a.getFullYear())}function initFooter(a){a+=location.pathname;var b=".footer-feedback",c='<a href="';c+=a,c+='" onclick="window.open(\'',c+=a,c+="', 'DYGWYW', 'menubar=0,resizable=1,scrollbars=1,width=450,height=650');\" target=\"DYGWYW\">Feedback</a>",$(b).empty(),$(b).append(c)}function initLogout(a){var b="https://a4.ucsd.edu/tritON/resources/bugscript.jsp?target=https%3A%2F%2Fwww.ucsd.edu&jsoncallback=?";$.getJSON(b,function(b){var c=$(".layout-header"),d="isLoggedIn";if(b.eduUcsdActLoggedin){var e=".layout-login .layout-container",f='<span class="login-content">You are logged in | <a href="https://act.ucsd.edu/security/logout?url=';f+=a,f+='">Log Out</a></span>',$(e).empty(),$(e).append(f),c.addClass(d)}else c.removeClass(d)})}!function(a){var b=function(){var a=$(".btn-nav")[0],b=$(".navdrawer-container")[0],c=$(".layout-header")[0],d=$(".layout-main")[0],h=$(".layout-footer")[0],i="navbar-is-opened",j="open",k=!1,l=function(){e(),k?(g(b,i),g(c,j),g(d,j),g(h,j),k=!1):(f(b,i),f(c,j),f(d,j),f(h,j),k=!0)};a.addEventListener?a.addEventListener("click",function(a){a.preventDefault(),l()}):a.attachEvent("onclick",function(){l()})},c=function(){var a=$(".navbar-subnav")[0],b=$(".navbar-sublist")[0],c="subnav-is-opened",d="subnav-hover",h=!1,i=function(){h?(g(b,c),h=!h):(f(b,c),h=!h)};a.addEventListener?(a.addEventListener("click",function(a){e()&&a.preventDefault(),a.stopPropagation(),i()}),b.addEventListener("click",function(a){a.stopPropagation()}),a.addEventListener("mouseover",function(b){b.preventDefault(),e()||(f(a,d),h=!h)}),a.addEventListener("mouseout",function(b){b.preventDefault(),e()||(g(a,d),h=!h)})):(a.attachEvent("onclick",function(){i()}),a.attachEvent("onmouseover",function(){e()||(f(a,d),h=!0)}),a.attachEvent("onmouseout",function(){e()||(g(a,d),h=!1)}))},d=function(){var a=$(".search-toggle")[0],b=$(".search-content")[0],c="search-is-open",d=!1,e=function(){d?(g(b,c),g(a,c),d=!1):(f(b,c),f(a,c),d=!0)};a.addEventListener?a.addEventListener("click",function(a){a.preventDefault(),e()}):a.attachEvent("onclick",function(){e()})},e=function(){var a=window.innerWidth,b=960;return b+1>a},f=function(a,b){a&&(a.className=a.className.replace(/\s+$/gi,"")+" "+b)},g=function(a,b){a&&(a.className=a.className.replace(b,""))};b(),c(),d()}(document);