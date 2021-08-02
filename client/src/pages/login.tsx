import { VFC } from 'react';
import Layout from 'src/components/layout/layout';

type Props = {};

const login: VFC<Props> = (props) => {
  return (
    <Layout>
      <input type="text" name="email" id="email" placeholder="email" />
    </Layout>
  );
};

export default login;
