// add a checkbox to the menu item to revert the syle to default or check to start the stylizing.
function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}

browser.contextMenus.create({
    id: "stylize-tab",
    type: "checkbox",
    title: "Stylize Tab",
    contexts: ["tab"],
    checked: false,
}, onCreated,);

function updateCheckUncheck(checked) {
    if (checked) {
        browser.contextMenus.update("stylize-tab", {
            title: "Unstylize Tab"
        });
    } else {
        browser.contextMenus.update("stylize-tab", {
            title: "Stylize Tab"
        });
    }
}

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "stylize-tab":
            updateCheckUncheck(info.checked);
            launchStyleMenu();
            break;
    }
});

function launchStyleMenu() {

}