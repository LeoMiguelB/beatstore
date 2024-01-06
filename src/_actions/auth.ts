// TODO
// get the access token on every dropbox request
// doing this one the backend should be sufficient for now since access tokens coming from dropbox is short lived
export const getAccessToken = async () => {
  const url = "https://api.dropbox.com/oauth2/token";

  const res = await fetch(url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        "grant_type": "refresh_token",
        "refresh_token": process.env.DROPBOX_REFRESH_TOKEN,
        "client_id": process.env.DROPBOX_CLIENT_ID,
        "client_secret": process.env.DROPBOX_CLIENT_SECRET
      })
    }
  );

  const data = await res.json();

  console.log(data.access_token);
  
}