import { GetStaticProps, NextPage } from 'next';
import Layout from 'src/components/layout/layout';

import { gql } from '@apollo/client';
import { client } from 'src/utils/apollo-client';

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        getAllUsers {
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
    getAllUsers: {
      id: number;
      name: string;
      email: string;
    }[];
  };
};

const Home: NextPage<Props> = (props) => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold">すべてのユーザー</h1>
      {props.data.getAllUsers.map((el) => {
        return (
          <p key={el.id}>
            {el.name}: {el.email}
          </p>
        );
      })}
    </Layout>
  );
};

export default Home;
