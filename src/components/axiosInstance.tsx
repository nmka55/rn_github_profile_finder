import axios from 'axios';
import {constantValues} from '@app/constants';

const {baseURL, githubPAT} = constantValues;

export default axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/vnd.github+json',
    Authorization: `Bearer ${githubPAT}`,
  },
});
