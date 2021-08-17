import { useQuery } from '@apollo/client';
import type { VFC } from 'react';
import Layout from 'src/components/layout/layout';
import { CURRENT_USER } from 'src/utils/query';

const About: VFC = () => {
  const { loading, error, data } = useQuery(CURRENT_USER);

  return (
    <Layout>
      <h1 className="text-2xl font-bold">ログインユーザー</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error!!!</p>}
      {data &&
        Object.entries(data.currentUser).map(([key, value], i) => {
          return <p key={i}>{`${key}: ${value}`}</p>;
        })}
    </Layout>
  );
};

export default About;
