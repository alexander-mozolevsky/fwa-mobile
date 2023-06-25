import {DOMAIN} from '../constants/requests';

interface RequestProps {
  path: string;
  body?: string;
  method: 'GET' | 'POST' | 'PUT';
}

export const request = async <T>({
  path,
  body,
  method,
}: RequestProps): Promise<T> => {
  const response = await fetch(`${DOMAIN}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const parsed = await response.json();

  if (response.status >= 400) {
    throw parsed;
  }

  return parsed;
};
