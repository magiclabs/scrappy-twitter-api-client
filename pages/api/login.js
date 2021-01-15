import { magic } from "../../lib/magic";
import { setLoginSession } from "../../lib/auth";

export default async function login(req, res) {
  let loggedInUserInfo = {};

  try {
    const didToken = req.headers.authorization.substr(7);
    const metadata = await magic.users.getMetadataByToken(didToken);
    loggedInUserInfo = { ...loggedInUserInfo, metadata, didToken };

    /*
    Use cookie to save logged in user's info and 
    Iron to encrypt it.
    */
    await setLoginSession(res, loggedInUserInfo);

    res.status(200).send({ done: true });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
