/* initialize login links */
function initLogout(logoutUrl) {
	var url = "https://a4.ucsd.edu/tritON/resources/bugscript.jsp?target=https%3A%2F%2Fwww.ucsd.edu&jsoncallback=?";
	$.getJSON(url, function(data) {
		if (data.eduUcsdActLoggedin) {
			var layoutLogin = '.layout-login';
			var url = "<span class=\"login-content\">You are logged in | <a href=\"https://act.ucsd.edu/security/logout?url=";
			url += logoutUrl;
			url += "\">Log Out</a></div>";
			$(layoutLogin).empty();
			$(layoutLogin).append(url);
		}
	});
};