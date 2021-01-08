import { magic } from "../../lib/magic";
import { removeTokenCookie } from "../../lib/auth-cookies";
import { getLoginSession } from "../../lib/auth";

export default async function logout(req, res) {
  try {
    const session = await getLoginSession(req);
    if (session && session.metadata) {
      await magic.users.logoutByIssuer(session.metadata.issuer);
      removeTokenCookie(res);
    }
  } catch (error) {
    console.error(error);
  }

  res.writeHead(302, { Location: "/" });
  res.end();
}
