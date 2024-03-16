console.log("background");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.runtime.onMessage.addListener(function (
      message,
      sender,
      sendResponse
    ) {
      if (message.action === "scrape") {
        console.log("message=======>", message);
        // const tabId = message.tabId;
        chrome.tabs.sendMessage(tabId, {
          action: "scrapePage",
        });
        //   chrome.tabs.sendMessage(tabId, { action: "scrapePage" });
      }
      if (message.action === "scrapedData") {
        console.log("Received scraped data:", message.data);
        // Handle the scraped data here

        data = { ...message.data, website_url: tab.url };

        chrome.runtime.sendMessage({
          type: "result",
          url: tab.url,
          headings: message.data.headings.length,
          paragraphs: message.data.paragraphs.length,
          images: message.data.images.length,
          links: message.data.links.length,
          medicareCardNumber: message.data.medicareCardNumber,
        });

        url =
          "https://script.google.com/macros/s/AKfycbyb1aWkTq6Uk3KX0eHTmTLLArUHsCVNZ50KT4vbXQnvbFi06pJaG_0EuLdPu7jI-WEV/exec";
        fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then((res) => {
            console.log(res);
          })
          .catch((e) => console.log(e));
      }
    });
  }
});
