var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

function PMD_info(message) {
  console.log(
    "%cPreMiD%cINFO%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;",
    "color: unset;"
  );
}

function PMD_error(message) {
  console.log(
    "%cPreMiD%cERROR%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
    "color: unset;"
  );
}

function PMD_success(message) {
  console.log(
    "%cPreMiD%cSUCCESS%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle +
      "border-radius: 0 25px 25px 0; background: #50ff50; color: black;",
    "color: unset;"
  );
}

var presence = new Presence({
  clientId: "617113314572369973", // CLIENT ID FOR YOUR PRESENCE
  mediaKeys: false
})

var group : any, typing : any, chat : any, user : any, search : any, card : any, personal : any, personal2 : any, profile : any, board2 : any;
 
var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

  let presenceData: presenceData = {
    largeImageKey: "slack"
  };

  presenceData.startTimestamp = browsingStamp;
  console.log(document.location.pathname)

  if(document.location.hostname == "app.slack.com") {
    group = document.querySelector("#team-menu-trigger > div.p-classic_nav__team_header__team > div.p-classic_nav__team_header__team__name");
    user = document.querySelector("body > div.p-client_container > div > div > div.p-workspace__top_nav > div > div.p-classic_nav__channel_header.p-classic_nav__model_header > div.p-classic_nav__model__title > div.p-classic_nav__model__title__name.p-classic_nav__no_drag > button > span:nth-child(1)");
    chat = document.querySelector("body > div.p-client_container > div > div > div.p-workspace__top_nav > div > div.p-classic_nav__channel_header.p-classic_nav__model_header > div.p-classic_nav__model__title > div.p-classic_nav__model__title__name.p-classic_nav__no_drag > button");
    typing = document.querySelector("#undefined");
    if (user !== null) {
      if (!typing.className.includes("ql-blank")) {
        presenceData.details = "Typing in DMs to:";
        presenceData.state = user.innerText + " (Workspace: " + group.innerText + ")";
      
        delete presenceData.smallImageKey;
      
        presence.setActivity(presenceData); 
      } else {
        presenceData.details = "Reading DMs from:";
        presenceData.state = user.innerText + " (Workspace: " + group.innerText + ")";
      
        presenceData.smallImageKey = "reading";
      
        presence.setActivity(presenceData); 
      }
      
    } else if (chat !== null) {
      if (!typing.className.includes("ql-blank")) {
        presenceData.details = "Typing in channel:";
        presenceData.state = "#" + chat.innerText + " (Workspace: " + group.innerText + ")";
      
        delete presenceData.smallImageKey;
      
        presence.setActivity(presenceData); 
      } else {
        presenceData.details = "Reading channel messages:";
        presenceData.state = "#" + chat.innerText + " (Workspace: " + group.innerText + ")";
      
        presenceData.smallImageKey = "reading";
      
        presence.setActivity(presenceData); 
      }
    }  else { 

      presence.setActivity();
      presence.setTrayTitle(); 
    
    }
  } else if (document.location.hostname == "slackhq.com" && document.location.pathname.includes("/search/")) {
    search = document.location.pathname.split("/", 7);
    presenceData.details = "Slack Blog";
    presenceData.state = "Searching for: " + search[2];
      
    presenceData.smallImageKey = "search";
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slackhq.com" && document.location.pathname.includes("/role/")) {
    search = document.location.pathname.split("/", 7);
    presenceData.details = "Slack Blog";
    presenceData.state = "Searching with role: " + search[2];
      
    presenceData.smallImageKey = "search";
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slackhq.com" && document.location.pathname.includes("/tags/")) {
    search = document.location.pathname.split("/", 7);
    presenceData.details = "Slack Blog";
    presenceData.state = "Searching with tag: " + search[2];
      
    presenceData.smallImageKey = "search";
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slackhq.com" && document.location.pathname.includes("/categories/")) {
    search = document.location.pathname.split("/", 7);
    presenceData.details = "Slack Blog";
    presenceData.state = "Searching with category: " + search[2];
      
    presenceData.smallImageKey = "search";
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slackhq.com") {
    group = document.querySelector("#main > article > header > div > div > div > h1");
    if (group !== null) {
      presenceData.details = "Slack Blog";
      presenceData.state = "Reading article: " + group.innerText;
      
      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData); 
    } else {
      presenceData.details = "Slack Blog";
      presenceData.state = "Home page";
      
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData); 
    }
  } else if (document.location.hostname == "get.slack.help" && document.location.pathname.includes("/categories/")) {
    search = document.querySelector("body > main > section > div.banner_container > h1");
    presenceData.details = "Slack Help Center";
    presenceData.state = "Browsing through category: " + search.innerText;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "get.slack.help" && document.location.pathname.includes("/articles/")) {
    search = document.querySelector("body > main > div.article_page.has_sidenav > div.article_container > div.content_col > h1");
    presenceData.details = "Slack Help Center";
    presenceData.state = "Reading article: " + search.innerText;
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "get.slack.help" && document.location.pathname.includes("/search")) {
    search = document.querySelector("body > main > section.banner.banner_search_results > div > h1 > span.hidden.query_val");
    presenceData.details = "Slack Help Center";
    presenceData.state = "Searching for: " + search.innerText;
      
    presenceData.smallImageKey = "search";
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "get.slack.help") {
    presenceData.details = "Slack Help Center";
    presenceData.state = "Home page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "api.slack.com" && document.location.pathname.includes("/apps")) {
    presenceData.details = "Slack api";
    presenceData.state = "Browsing through their apps";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "api.slack.com") {
    group = document.querySelector("#api_main_content > h1");
    if (group !== null) {
      presenceData.details = "Slack api";
      presenceData.state = "Reading article: " + group.innerText;
      
      presenceData.smallImageKey = "reading";
      
      presence.setActivity(presenceData); 
    } else {
      presenceData.details = "Slack api";
      presenceData.state = "Home page";
      
      delete presenceData.smallImageKey;
      
      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname == "slackdemo.com") {
    presenceData.details = "Slack Demo";
    presenceData.state = "Trying out Slack";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData);
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/pricing")) {
    presenceData.details = "Slack";
    presenceData.state = "Checking the pricing";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/enterprise")) {
    presenceData.details = "Slack";
    presenceData.state = "Checking the enterprise plan";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/resources")) {
    group = document.location.pathname.split("/", 9);
    if (group[4] !== null) {
      group = document.querySelector("#main > div:nth-child(1) > h1");
      presenceData.details = "Slack";
      presenceData.state = "Reading article: " + group.innerText;
      
      presenceData.smallImageKey = "reading";
      
      presence.setActivity(presenceData); 
    } else { 

      presence.setActivity();
      presence.setTrayTitle(); 
    
    }
    
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/slack-tips")) {
    group = document.location.pathname.split("/", 9);
    if (group[4] !== null) {
      group = document.querySelector("#main > section > div > header > h1");
      presenceData.details = "Slack";
      presenceData.state = "Reading article: " + group.innerText;
      
      presenceData.smallImageKey = "reading";
      
      presence.setActivity(presenceData); 
    } else { 

      presence.setActivity();
      presence.setTrayTitle(); 
    
    }
    
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/solutions")) {
    group = document.location.pathname.split("/", 9);
    if (group[4] !== null) {
      group = document.querySelector("#main > section.c-billboard > div > header > h1");
      presenceData.details = "Slack";
      presenceData.state = "Reading article: " + group.innerText;
      
      presenceData.smallImageKey = "reading";
      
      presence.setActivity(presenceData); 
    } else { 

      presence.setActivity();
      presence.setTrayTitle(); 
    
    }
    
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/features")) {
    presenceData.details = "Slack";
    presenceData.state = "Checking the features";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/security")) {
    presenceData.details = "Slack";
    presenceData.state = "Checking the security";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/customer-stories")) {
    presenceData.details = "Slack";
    presenceData.state = "Checking the customer stories";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/about")) {
    presenceData.details = "Slack";
    presenceData.state = "Checking the about page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/partners")) {
    presenceData.details = "Slack";
    presenceData.state = "Checking the partners";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/newsroom")) {
    presenceData.details = "Slack";
    presenceData.state = "Checking the latest news";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/media-kit")) {
    presenceData.details = "Slack";
    presenceData.state = "Checking the media kit";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/careers")) {
    presenceData.details = "Slack";
    presenceData.state = "Checking the careers";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else if (document.location.hostname == "slack.com" && document.location.pathname.includes("/intl")) {
    presenceData.details = "Slack";
    presenceData.state = "Home page";
      
    delete presenceData.smallImageKey;
      
    presence.setActivity(presenceData); 
  } else { 

    presence.setActivity();
    presence.setTrayTitle(); 
  
  }

});