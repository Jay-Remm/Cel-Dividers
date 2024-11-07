async function getSelectedTabs() {
    return browser.tabs.query({
        highlighted: true,
        currentWindow: true,
    });
}

browser.browserAction.onClicked.addListener(copyTitleAndUrl);

const copyTitleAndUrlsMenuId = "copy-selected-tab-info";
browser.contextMenus.create({
    id: copyTitleAndUrlsMenuId,
    title: "Stylize Tab",
    contexts: ["tab"],
});

const copyAsMarkdownMenuId = "copy-markdown";
browser.contextMenus.create({
    id: copyAsMarkdownMenuId,
    title: "Send to markdown",
    contexts: ["tab"],
});

function tabsToMarkdown(tabs, returnAsList = false, seperator = " ") {
    return tabs
        .map((tab) => `${returnAsList ? "* " : ""}[${tab.title}](${tab.url})`)
        .join(seperator);
}

async function copyMarkdown() {
    const markdown = tabsToMarkdown(await getSelectedTabs());
    navigator.clipboard.writeText(markdown);
}


browser.contextMenus.onClicked,addListener((info, tab) => {
    switch (info.menuItemId) {
        case copyTitleAndUrlsMenuId:
            copyTitleAndUrl();
            break;
        case copyAsMarkdownMenuId:
            copyMarkdown();
            break;
    }
});