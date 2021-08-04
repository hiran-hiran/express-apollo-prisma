import { ChangeEvent, useState, VFC } from 'react';
import Layout from 'src/components/layout/layout';

type Props = {};

const Signup: VFC<Props> = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleClick = () => {
    window.alert('Hello, World!');
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
          value={input.name}
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

      <button className="block mx-auto mt-4 p-2 bg-gray-500 text-white " onClick={handleClick}>
        Sign up!
      </button>
    </Layout>
  );
};

export default Signup;
