function scrapePage() {
  const paragraphs = Array.from(document.querySelectorAll("p")).map((p) =>
    p.textContent.replace(/\s+/g, " ").replace(/\n/g, " ")
  );
  const headings = Array.from(document.querySelectorAll("h1")).map(
    (h1) => h1.textContent
  );
  const images = Array.from(document.querySelectorAll("img")).map(
    (img) => img.src
  );
  const links = Array.from(document.querySelectorAll("a")).map((a) => a.href);
  // const lists = Array.from(document.querySelectorAll("ul, ol")).map((list) =>
  //   Array.from(list.children).map((item) => item.textContent)
  // );

  const scrapeData = {
    paragraphs: paragraphs,
    headings: headings,
    images: images,
    links: links,
    // lists: lists,
  };

  return scrapeData;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("listen to chrome Message", message);
  const data = scrapePage();
  console.log("data=========>", data);
  chrome.runtime.sendMessage({
    action: "scrapedData",
    data: data,
  });
});

// window.onload = () => {
//   console.log("content.js is running.....");
//   const data = scrapePage();
//   console.log("data=========>", data);
//   chrome.runtime.sendMessage({
//     action: "scrapedData",
//     data: data,
//   });
// };
