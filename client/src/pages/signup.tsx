import { ChangeEvent, useState, VFC } from 'react';
import Layout from 'src/components/layout/layout';
import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(data: { name: $username, email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const Signup: VFC = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted(data) {
      alert('登録できました');
      console.log(data);
      setInput({ username: '', email: '', password: '' });
    },
    onError(error) {
      alert('登録に失敗しました');
      console.log(error);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleClick = async () => {
    createUser({
      variables: {
        username: input.username,
        email: input.email,
        password: input.password,
      },
    });
  };

  return (
    <Layout>
      <div className="flex flex-col mx-auto w-96">
        <input
          className="mt-4 p-2"
          type="text"
          name="username"
          id="username"
          placeholder="Name"
          value={input.username}
          onChange={handleChange}
        />
        <input
          className="mt-4 p-2"
          type="text"
          name="email"
          id="email"
          placeholder="E-mail"
          value={input.email}
          onChange={handleChange}
        />
        <input
          className="mt-4 p-2"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={input.password}
          onChange={handleChange}
        />
      </div>

      <button className="block mx-auto mt-4 p-2 bg-gray-500 text-white" onClick={handleClick}>
        Sign up!
      </button>
    </Layout>
  );
};

export default Signup;
