import axios from 'axios';
// use api openweathermap.org
const APPID = '0b4c5302ab394d18b96881a21ac63221';

const FetchAPI = url => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(i => i.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

const callAPIeverything = async info => {
  const result = info
    .split(/$W|_/)
    .filter(i => i !== '')
    .join('-');
  return await FetchAPI(
    `https://newsapi.org/v2/everything?q=${result}&apiKey=${APPID}`,
  );
};

const callAPItop = async info => {
  const result = info
    .split(/$W|_/)
    .filter(i => i !== '')
    .join('-');
  return await FetchAPI(
    `https://newsapi.org/v2/top-headlines?q=${result}&apiKey=${APPID}`,
  );
};

export {callAPIeverything, callAPItop};
