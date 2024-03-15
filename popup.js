const scrapeBtn = document.getElementById("scrape");
const url = document.getElementById("url");
const headings = document.getElementById("headings");
const paragraphs = document.getElementById("paragraphs");
const images = document.getElementById("images");
const links = document.getElementById("links");

document.addEventListener("DOMContentLoaded", function () {
  scrapeBtn.addEventListener("click", function () {
    chrome.runtime.sendMessage({
      action: "scrape",
    });

    chrome.runtime.onMessage.addListener(function (
      message,
      sender,
      sendResponse
    ) {
      console.log("listen to chrome Message", message);
      if (message.type === "result") {
        url.textContent = message.url;
        headings.textContent = message.headings;
        paragraphs.textContent = message.paragraphs;
        images.textContent = message.images;
        links.textContent = message.links;
      }
    });
  });
});
