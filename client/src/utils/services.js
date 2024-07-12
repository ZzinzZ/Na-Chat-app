export const baseUrl = "http://localhost:8000/api/v1";

export const postRequest = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  const data = await res.json();

  if(!res.ok) {
    let message ;
    if(data?.message) {
        message = data.message
    } else message = data;

    return {error: true, message}
  }

  return data;
};

export const getRequest = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if(!res.ok) {
    let message ;
    if(data?.message) {
        message = data.message
    } else message = data;

    return {error: true, message}
  }
  return data;
};

