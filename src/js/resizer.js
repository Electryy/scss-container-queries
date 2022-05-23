export function WidthEncoder(selectorString) {
  const selector = selectorString ? selectorString : "[data-cq]";
  const elements = document.querySelectorAll(selector);

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const width = Math.round(entry.contentRect.width);

      // Convert to numbers array and reverse
      // 123 becomes [3,2,1]
      let widths = width.toString().split("").reverse();

      // Set the data attributes. Example: data-cq-one="0-1-2-3-4"
      entry.target.setAttribute("data-cq-one", convertToCssNumber(widths[0]));
      entry.target.setAttribute("data-cq-ten", convertToCssNumber(widths[1]));
      entry.target.setAttribute("data-cq-hun", convertToCssNumber(widths[2]));
      entry.target.setAttribute("data-cq-tho", convertToCssNumber(widths[3]));
    }
  });

  function convertToCssNumber(number) {
    // widths array might not have the index. This means it's 0.
    if (!number) {
      return "0";
    }
    let numberString = "";
    for (let i = 0; i <= number; i++) {
      numberString += i;
    }
    // Convert 01234 -> 0-1-2-3-4
    return numberString.toString().split("").join("-");
  }

  function start() {
    elements.forEach((element) => {
      resizeObserver.observe(element);
    });
  }
  function stop() {
    elements.forEach((element) => {
      resizeObserver.unobserve(element);
    });
  }
  return { start, stop };
}
