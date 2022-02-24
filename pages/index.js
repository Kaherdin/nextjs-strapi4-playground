import Head from "next/head";
import { useQuery } from "@apollo/client";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";

const POSTS = gql`
  query posts {
    posts(pagination: { start: 0, limit: 2 }) {
      data {
        id
        attributes {
          title
          text
        }
      }
    }
  }
`;

export default function Home() {
  const { data, fetchMore } = useQuery(POSTS, {
    variables: { start: 0, limit: 2 },
    notifyOnNetworkStatusChange: true,
  });

  console.log(data, "data");

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to this playground</h1>
        <ul>
          {data?.posts?.data?.map((post, index) => {
            return <li key={index}>{post?.attributes?.title}</li>;
          })}
        </ul>
      </main>
    </div>
  );
}
