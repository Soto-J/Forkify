import { TIME_IN_SEC } from "../config";

async function AJAX(url: string, uploadData?: any) {
  try {
    const fetchProvider = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchProvider, timeout(TIME_IN_SEC)]);
    const { data } = await response?.json();

    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }

    const [recipeOrResult] = Object.values(data);
    console.log(recipeOrResult);

    return recipeOrResult;
  } catch (error) {
    throw error;
  }
}

// async function getJSON<T>(url: string): Promise<T> {
//   try {
//     const response = await Promise.race([fetch(url), timeout(TIME_IN_SEC)]);

//     const { data } = await response.json();

//     if (!response.ok) {
//       throw new Error(`${data.message} (${response.status})`);
//     }
//     console.log(data);

//     const [recipeOrResult] = Object.values<T>(data);

//     return recipeOrResult;
//   } catch (error) {
//     throw error;
//   }
// }

// async function postJSON(url: string, newRecipe: any) {
//   try {
//     const POST = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newRecipe),
//     });

//     const response = await Promise.race([POST, timeout(TIME_IN_SEC)]);
//     const { data } = await response.json();

//     if (!response.ok) {
//       throw new Error(`${data.message} (${response.status})`);
//     }

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

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
    if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue?.trim() !== "") {
      curEl.textContent = newEl.firstChild?.textContent!;
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

export {
  AJAX,
  // getJSON,
  // postJSON,
  timeout,
  updateDOMHelper,
};
