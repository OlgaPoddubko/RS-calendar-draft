import xhr from './xhr';

export default async function serviceResponse() {
  const url = 'http://128.199.53.150/events';
  const response = await xhr(url);
  const eventsList = JSON.parse(response);

  return eventsList;
}
