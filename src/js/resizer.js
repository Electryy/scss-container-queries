let elements = document.querySelectorAll("[data-cq]");
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const width = Math.round(entry.contentRect.width);
    let widthArray = width.toString().split("").reverse();
    let dataAttributes = [{ one: "0" }, { ten: "0" }, { hun: "0" }, { tho: "0" }];

    widthArray = widthArray.map((item) => convertToCssNumber(item));

    widthArray.forEach((width, index) => {
      dataAttributes[index] = width;
    });
    console.log(widthArray);
    //entry.target.setAttribute("data-cq-tho", width);

    console.log(dataAttributes);
  }
});

function convertToCssNumber(number) {
  let numberString = "";
  for (let i = 0; i <= number; i++) {
    numberString += i;
  }
  // Convert 012345 -> 0-1-2-3-4-5
  numberString = numberString.split("").join("-");
  return numberString;
}

elements.forEach((element) => {
  resizeObserver.observe(element);
});
