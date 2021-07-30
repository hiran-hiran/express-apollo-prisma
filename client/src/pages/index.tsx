import { GetStaticProps } from 'next';
import type { VFC } from 'react';
import Layout from 'src/components/layout/layout';

import { gql } from '@apollo/client';
import { client } from 'src/utils/apollo-client';

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        allUsers {
          id
          name
          email
        }
      }
    `,
  });

  return {
    props: {
      data: data,
    },
  };
};

type Props = {
  data: {
    allUsers: {
      id: number;
      name: string;
      email: string;
    };
  };
};

const Home: VFC<Props> = (props) => {

  const handleClick = () => {
    window.alert('Hello, World!');
  };

  return (
    <Layout>
      {props.data.allUsers.map((el, i) => {
        return <p key={el.id}>{el.name}: { el.email}</p>;
      })}
      <button className="p-2 bg-gray-500 text-white" onClick={handleClick}>
        Click me!
      </button>
    </Layout>
  );
};

export default Home;
