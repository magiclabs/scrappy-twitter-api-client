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
          {user.didToken ? (
            <>
              <p>
                Below is your <b>DID token</b>. It has a lifespan of{" "}
                <b>8 hours </b>
                🧚🏼‍♀️🪄. You'll need it to CREATE or DELETE a tweet.
              </p>
              - - -
              <p>
                <b>Your DID token is</b>:
              </p>
              <pre>{user.didToken}</pre>- - -
              <p>
                ❗️ Make sure to save it as the <b>Bearer Token </b>
                for the Postman Scrappy Twitter API Collection!
              </p>
            </>
          ) : (
            <>
              <p>
                😰 Your DID token's gone. Hope ya saved it somewhere safe! If
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
            to create an account and get your personal <b>DID token</b>.
          </p>

          <p>
            <b>Warning:</b> Your DID token will allow you to makes queries on
            the Scrappy Twitter API. Keep it private.
          </p>
        </>
      )}
      - - -
      <p>
        ✨ This is a sample app for{" "}
        <a
          href="https://dev.to/magiclabs/securing-a-go-backed-scrappy-twitter-api-with-magic-3o01"
          target="_blank"
          rel="noopener noreferrer"
        >
          Securing a Go-Backed Scrappy Twitter API with Magic
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
