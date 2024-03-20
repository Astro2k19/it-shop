// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import * as process from "process";

export function App() {
  console.log(process.env)
  return (
    <div>
      <NxWelcome title="client" />
    </div>
  );
}

export default App;
