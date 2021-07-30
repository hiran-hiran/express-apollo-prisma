import { ReactNode, VFC } from 'react';
import Header from 'src/components/header/header';

type LayoutProps = {
  children: ReactNode;
};

const Layout: VFC<LayoutProps> = (props) => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
      <Header />
      <main className="bg-gray-200">{props.children}</main>
    </div>
  );
};

export default Layout;
