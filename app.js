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
            // launchStyleMenu();
            activateStyle();
            break;
    }
});

function tabTheme(customBackgroundColor, customBorderColor) {
    let tabSelectedColor = customBackgroundColor;
    let tabLineColor = customBorderColor;
    const theme = {
        "colors": {
            // "tab_selected": `${customColor}`,
            // "tab_line": `${customBorderColor}`
            // "frame": //customColor but less opaque
            "tab_selected": "black",
            "tab_line": "red"
        },
        "properties": {
            "color_scheme": "system",
            "content_color_scheme": "system"
        }
    }
    return theme;
}

// Add listeners that listen for changes to the tab's active property after stylization to keep the stylized browser tab to the ID value weather avtive or not
// browser.tabs.onActivated.addListener(event => update(event.tabId));
// browser.tabs.onUpdated.addListener(tabId => update(tabId));



// function launchStyleMenu() {
    
// }

function activateStyle() {
    browser.tabs.query({}).then((tabs) => {
        console.log(tabs);
    })

    // browser.theme.update(tabTheme());
    browser.querySelector(".tab-background").sytle = "background-color: white !important";

    let tab = browser.tabs.get();
    console.log(tab);
}



// Fine a way to read the current theme that is installed in the browser, copy its image, colors, and properties- find the selection for tab_selected and change it to the color that is chosen by the user.
// This would essentually allow the user to keep their current theme and still use the extention to modify the color of a specfic tab as intented without reverting the system's theme to defaults.

/*
suggested customization from reddit - eddit to userChrome.css to achieve distinction.
.tab-background[selected="true"], .tab-background[multiselected="true"] {
    background-image: none !important; background-color: Silver !important;
}
*/


// Look into shadow DOM connections