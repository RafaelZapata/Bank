async function methods(method, url, params) {
  let myRequest = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
  };

  if (method.toUpperCase() == "GET" && Object.keys({ ...params }) > 0) {
    url += new URLSearchParams(params).toString();
  }

  if (method.toUpperCase() == "POST" || method.toUpperCase() == "PATCH") {
    myRequest.body = JSON.stringify(params);
  }

  if (localStorage.getItem("Authorization") > 15) {
    myRequest.headers.Authorization = localStorage.getItem("Authorization");
  }

  const res = await fetch(process.env.REACT_APP_BASE_URL + url, myRequest);
  
  console.log(res);
  return await res.json();
}

export function get(...args) {
  return methods("GET", ...args);
}

export function post(...args) {
  return methods("POST", ...args);
}

export function patch(...args) {
  return methods("PATCH", ...args);
}
