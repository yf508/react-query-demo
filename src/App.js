import { ReactQueryDevtools } from 'react-query/devtools'
import Pagination from "./components/Pagination";
// import People from './components/People';

function App() {
  return (
    <>
      <div className="App">
        <Pagination/>
        {/* <People/> */}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
