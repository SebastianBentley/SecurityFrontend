import SERVER_URL from "../utils/settings";



const getToken = () => {
  return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
}



function getPosts() {
  return fetch(SERVER_URL + "/api/post/all")
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}


function addPost(content, username) {
  const options = makeOptions("POST", true, {
    username,
    content
  });
  return fetch(SERVER_URL + "/api/post/add-post", options)
    .then(handleHttpErrors)
    .catch((err) => {
      console.log(err)
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

const postFacade = {
  getPosts,
  addPost,
};

const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      'Accept': 'application/json'
    }
  }
  if (addToken && loggedIn()) {
    opts.headers["x-access-token"] = getToken();
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

export default postFacade;