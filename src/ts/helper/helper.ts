import { TIME_IN_SEC } from "../config";

async function getJSON(url: string): Promise<any> {
  try {
    const response = await Promise.race([fetch(url), timeout(TIME_IN_SEC)]);

    const { data } = await response.json();

    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

function timeout(s: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
}

// prettier-ignore
function updateDOMHelper(currentElement: NodeListOf<Element>, newElement: NodeListOf<Element>): void {
  newElement.forEach((newEl: Element, i: number) => {
    const curEl = currentElement[i];
    // console.log(curEl, newEl.isEqualNode(curEl));
      
    // Update Changed Text
    if (!newEl.isEqualNode(curEl) && !newEl.firstChild?.nodeValue?.trim()) {
      curEl.textContent = newEl.firstChild!.textContent;
      // console.log(newEl.firstChild!.nodeValue!.trim());
    }

    // Update Changed Attributes (name and value)
    if (!newEl.isEqualNode(curEl)) {
      Array.from(newEl.attributes).forEach((attr: Attr) => 
        curEl.setAttribute(attr.name, attr.value)
      );
    }
  });
}

export { getJSON, timeout, updateDOMHelper };
