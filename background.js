var tabURL;

// A function to use as callback
function doStuffWithDom(issueId) {
    tabURL = tabURL + issueId;
    // Create a dummy input to copy the string array inside it
    var dummy = document.createElement("input");
    // Add it to the document
    document.body.appendChild(dummy);
    // Set its ID
    dummy.setAttribute("id", "dummy_id");
    // Output the array into it
    document.getElementById("dummy_id").value = tabURL;
    // Select it
    dummy.select();
    // Copy its contents
    document.execCommand("copy");
    // Remove it as its not needed anymore
    document.body.removeChild(dummy);
}

function genericOnClick(info, tab) {
    tabURL = tab.url + "/#";
    console.log(tabURL);
    chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
}

var context = "page";
var title = "Copy issue id URL to clipboard";
var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
