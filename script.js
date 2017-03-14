let element = arguments[0];
let selector = "";
while (element.parentNode && element.nodeName !== "HTML") { // Stop @ HTML document because it doesn't work with nth:child(). Plus, body is unique enough.
    if (element.className && element.parentNode.getElementsByClassName(element.className).length === 1) {
        const classNames = element.className.split(" ").map((className) => {
            return `.${className.trim()}`;
        }).join("");
        selector = [classNames, selector].filter((value) => { return value }).join(" > ");
    } else {
        let sameNameCount = 0;
        let index;
        [...element.parentNode.children].forEach((child) => {
            console.log(sameNameCount);
            // Count children with same nodeType as our element
            if (child.nodeName === element.nodeName) {
                sameNameCount++; // Add one on entry because nth:child uses 1-based index
                if (child === element) {
                    index = sameNameCount; 
                }
            }
        });
        selector = [`${element.nodeName}:nth-child(${index})`, selector].filter((value) => { return value}).join(" > ");
    }
    if (selector !== "" && document.querySelectorAll(selector).length === 1) {
        break; // The current selector only returns 1 value, which is all we need.
    }
    element = element.parentNode;
}
return selector;
