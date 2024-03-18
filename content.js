function scrapePage() {
  const downloadButton = document.querySelector(
    "button[aria-label='Download'], [data-resin-target='download']"
  );

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

  // Find all <th> elements on the page
  const tableHeaders = document.querySelectorAll("th");

  let medicareCardNumberElement;
  let medicareCardNumber;

  // Loop through each <th> element to find the one containing "Medicare Card Number:"
  tableHeaders.forEach((header) => {
    if (header.textContent.includes("Medicare Card Number:")) {
      // Once found, set the corresponding <td> element as the next sibling
      medicareCardNumberElement = header.nextElementSibling;
    }
  });

  if (medicareCardNumberElement) {
    // Extract the text content of the <td> element
    medicareCardNumber = medicareCardNumberElement.textContent.trim();
    console.log(medicareCardNumber);
  } else {
    console.log("Element not found.");
  }

  // const lists = Array.from(document.querySelectorAll("ul, ol")).map((list) =>
  //   Array.from(list.children).map((item) => item.textContent)
  // );

  const scrapeData = {
    paragraphs: paragraphs,
    headings: headings,
    images: images,
    links: links,
    medicareCardNumber: medicareCardNumber,
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
