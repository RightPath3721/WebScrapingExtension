console.log("background");

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === "complete") {
//   }
// });

let tab;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "scrape") {
    tab = message.tab;
    chrome.tabs.sendMessage(tab.id, {
      action: "scrapePage",
    });
    //   chrome.tabs.sendMessage(tabId, { action: "scrapePage" });
  }
  if (message.action === "scrapedData") {
    console.log("Received scraped data:", message.data);
    // Handle the scraped data here
    chrome.runtime.sendMessage({
      type: "result",
      url: tab.url,
      headings: message.data.headings.length,
      paragraphs: message.data.paragraphs.length,
      images: message.data.images.length,
      links: message.data.links.length,
      medicareCardNumber: message.data.medicareCardNumber,
    });

    data = {
      headings: message.data.headings ? String(message.data.headings) : " ",
      paragraphs: message.data.paragraphs
        ? String(message.data.paragraphs)
        : " ",
      images: message.data.images ? String(message.data.images) : " ",
      links: message.data.links ? String(message.data.links) : " ",
      medicareCardNumber: message.data.medicareCardNumber
        ? String(message.data.medicareCardNumber)
        : " ",
      website_url: tab.url ? String(tab.url) : " ",
    };
    url =
      "https://script.google.com/macros/s/AKfycbyx0eoorNjIan9eEd8aYukrbFwac3MKYAv16vDFfPsiM1rlKO7YGNwYP6RNHYL9c_SK/exec";
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
