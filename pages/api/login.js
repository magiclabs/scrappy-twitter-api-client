import { magic } from "../../lib/magic";
import { setLoginSession } from "../../lib/auth";

export default async function login(req, res) {
  let loggedInUserInfo = {};

  try {
    const accessToken = req.headers.authorization.substr(7);
    const metadata = await magic.users.getMetadataByToken(accessToken);
    loggedInUserInfo = { ...loggedInUserInfo, metadata, accessToken };

    /*
    Use cookie to save logged in user's info and 
    Iron to encrypt it.
    */
    await setLoginSession(res, loggedInUserInfo);

    /* 
    Below is a fetch request to the local Go server.
    This is the first step in saving the authenticated user's info.
    Second step happens at the server side; where you call your 
    application logic to save the user's info in some kind of database.
    */
    const resFromGoServer = await fetch("https://scrappy-twitter-api-client.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(req.body)
    });

    if (resFromGoServer.status === 200) {
      console.log(
        "YAY, we were able to call the login endpoint: ",
        resFromGoServer
      );
    } else {
      throw new Error(
        `Oh no, we ran into an error while calling the login endpoint: `,
        await resFromGoServer.text()
      );
    }

    res.status(200).send({ done: true });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
