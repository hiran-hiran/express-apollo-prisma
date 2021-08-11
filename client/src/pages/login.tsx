import { gql, useLazyQuery } from '@apollo/client';
import { NextPage } from 'next';
import Layout from 'src/components/layout/layout';
import { useInput } from 'src/hooks/useInput';

const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

const Login: NextPage = () => {
  const email = useInput('');
  const password = useInput('');

  const [login] = useLazyQuery(LOGIN_USER, {
    onCompleted(data) {
      alert('ログインできました');
      console.log(data);
      email.value = '';
      password.value = '';
    },
    onError(error) {
      alert('ログインに失敗しました');
      console.log(error.message);
    },
  });

  const handleClick = () => {
    login({
      variables: {
        email: email.value,
        password: password.value,
      },
    });
  };

  return (
    <Layout>
      <div className="flex flex-col mx-auto w-96">
        <input
          className="mt-4 p-2"
          type="text"
          name="email"
          id="email"
          placeholder="E-mail"
          value={email.value}
          onChange={email.onChange}
        />
        <input
          className="mt-4 p-2"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <button className="block mx-auto mt-4 p-2 bg-gray-500 text-white" onClick={handleClick}>
        Login!
      </button>
    </Layout>
  );
};

export default Login;
