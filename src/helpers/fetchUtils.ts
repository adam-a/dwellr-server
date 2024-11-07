import fetch from 'node-fetch';

export const baseFetch = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};
