import { TIME_IN_SEC } from "../config";

async function getJSON(url: string) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIME_IN_SEC)]);

    const { data } = await response.json();

    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }

    return data;
  } catch (error) {
    throw error; // throw error ignores this catch block
  }
}

function timeout(s: number): any {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
}

export { getJSON, timeout };
