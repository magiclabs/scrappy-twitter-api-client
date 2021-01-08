import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import { withRouter } from "next/router";

const Home = ({ router }) => {
  const user = useUser();

  return (
    <Layout>
      <h1>Scrappy, But Secure Go Twitter API 🐣</h1>
      Hi there {user && user.metadata.email} 🙋🏻‍♀️!
      <p>
        This Scrappy, Go-backed Twitter API provides an easy way to integrate
        your very own Twitter data with any external system. The API is secured
        by the{" "}
        <a href="https://magic.link/" target="_blank" rel="noopener noreferrer">
          Magic Admin SDK for Go
        </a>
        .
      </p>
      - - -
      {user ? (
        <>
          {user.accessToken ? (
            <>
              <p>
                Below is your <b>access token</b>. It has a lifespan of{" "}
                <b>8 hours </b>
                🧚🏼‍♀️🪄. You'll need it to CREATE or DELETE a tweet.
              </p>
              - - -
              <p>
                <b>Your token is</b>:
              </p>
              <pre>{user.accessToken}</pre>- - -
              <p>
                ❗️ Make sure to save it as the <b>Bearer Token </b>
                for the Postman Scrappy Twitter API Collection! (*Whew, that was
                a mouthful 😅.)
              </p>
            </>
          ) : (
            <>
              <p>
                😰 Your access token's gone. Hope ya saved it somewhere safe! If
                not, you can regenerate it. Just log out & log in again 😄.
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <p>
            With the Scrappy Twitter API, all users could READ the tweets.
            However, if you want to CREATE or DELETE a tweet, you'll first need
            to create an account and get your personal <b>access token</b>.
          </p>

          <p>
            <b>Warning:</b> Your access token will allow you to makes queries on
            the Scrappy Twitter API. Keep it private.
          </p>
        </>
      )}
      - - -
      <p>
        ✨ This is a sample app for{" "}
        <a
          href="https://dev.to/seemcat/how-to-secure-your-go-rest-api-with-magic-4la9-temp-slug-2086740"
          target="_blank"
          rel="noopener noreferrer"
        >
          How to Secure your Go Rest API with Magic
        </a>
        . ✨
      </p>
      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  );
};

export default withRouter(Home);
