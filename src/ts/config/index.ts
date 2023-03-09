// export default {
//   API_URL: `https://forkify-api.herokuapp.com/api/v2/recipes/`,
//   API_KEY: "",

//   TIME_IN_SEC: 10,
//   RES_PER_PAGE: 10,
// };

const API_URL = import.meta.env.VITE_FORKIFY_API_URL;
const API_KEY = import.meta.env.VITE_FORKIFY_API_KEY;
const TIME_IN_SEC = 10;
const RES_PER_PAGE = 10;

export { API_URL, TIME_IN_SEC, RES_PER_PAGE, API_KEY };
