import { useState } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import Form from "../components/form";

import { Magic } from "magic-sdk";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: e.currentTarget.email.value,
    };

    const lifespan = 60 * 60 * 8; // Lifespan of the access token is 8 hours

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      await magic.auth.loginWithMagicLink({
        email: body.email,
      });

      /* 
      Generate a Decentralized Id Token which acts as a proof 
      of authentication to resource servers.

      💁🏻‍♀️ Instead of the name `idToken`, we'll be calling this 
      the `accessToken`. ❗️
      */
      const accessToken = await magic.user.getIdToken({ lifespan });

      // Pass accessToken into Authorization request header.
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        /* 
    Below is a fetch request to the local Go server.
    This is the first step in saving the authenticated user's info.
    Second step happens at the server side; where you call your 
    application logic to save the user's info in some kind of database.
    */
        const resFromGoServer = await fetch(
          "https://scrappy-twitter-api-client.vercel.app/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(body),
          }
        );

        console.log('resFromGoServer: ', resFromGoServer)
        console.log('resFromGoServer.status: ', resFromGoServer.status)

        if (resFromGoServer.status === 200) {
          console.log(
            "YAY, we were able to call the login endpoint: ",
            resFromGoServer
          );

                  /*
        User was able to log in or sign up successfully,
        so we move them to the home page along with their
        accessToken.
        */
        Router.push("/");

        } else {
          throw new Error(
            `Oh no, we ran into an error while calling the login endpoint: `,
            await resFromGoServer.text()
          );
        }


      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

export default Login;
