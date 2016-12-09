// TODO -> Just wrote this without testing, to be as an example. Needs to be checked.
// TODO check if Headers() needs to be used for fecth API.

const defaultHeaders = {
  Accept: 'application/json',
  'X-API-Version': '1',
  'Content-Type': 'application/json',
};

/**
* Handles special behavior based on errors
*   401 -> redirect to loginUrl/another URL
*
* default to return err, passes to Promise.reject()
*/

function handleXHRError(err, res) {
  if (res !== undefined) {
    let body = {};

    try {
      body = JSON.parse(res.text);
    } catch (error) {
      body = { error };
    }

    if (res.status === 401 && body.loginUrl) {
      window.parent.location = body.loginUrl;
    }
  }
  return res;
}

export default ({ method, uri, data, headers }) => {
  // TODO add multipartFormData support,
  const options = {
    method,
    body: data,
    headers: Object.assign(defaultHeaders, headers),
  };

  return new Promise((resolve, reject) => {
    fetch(uri, options)
      .then((res) => res.json())
      .then((err, res) => (err ? reject(handleXHRError(err, res)) : resolve(res)));
  });
};
