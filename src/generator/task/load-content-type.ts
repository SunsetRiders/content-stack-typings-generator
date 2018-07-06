import fetch from 'node-fetch';
import { Configuration } from '../../config';
import { ContentTypes } from '../../content-stack';

export async function loadContentTypes(config: Configuration) {
  const headers = {
    'api_key': config.apikey,
    'authtoken': config.authtoken,
    'include_count': 'true'
  };

  const response = await fetch('https://cdn.contentstack.io/v3/content_types', {
    method: 'GET',
    headers
  });

  return <ContentTypes>await response.json();
}
