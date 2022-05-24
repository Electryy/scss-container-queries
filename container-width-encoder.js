/**
 * Encodes the current width of element to a data attributes that scss/css can then understand
 *
 * @param {string=} selector - Selector string to target listener. Default is [data-cq]
 * @returns {object} start and stop functions
 */

export function containerWidthEncoder(selector = "[data-cq]") {
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

/**
 * Helper function to convert a number to special string that css understands
 * Example: 4 -> 0-1-2-3-4
 *
 * @param {number} number
 * @returns {string}
 */
function convertToCssNumber(number) {
  // number can be undefined and that's ok. return "0" then.
  if (!number) {
    return "0";
  }

  // Write out all numbers. 4 -> 01234
  let numberString = "";
  for (let i = 0; i <= number; i++) {
    numberString += i;
  }

  // Convert 01234 -> 0-1-2-3-4
  return numberString.toString().split("").join("-");
}
