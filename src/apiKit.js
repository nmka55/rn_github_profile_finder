import * as constants from "@app/constants";

import axios from "axios";

const { baseURL, githubPAT } = constants;

console.log(baseURL);

export default APIKit = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/vnd.github+json",
    Authorization: `Bearer ${githubPAT}`,
  },
});
