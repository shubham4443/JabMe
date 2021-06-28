import './App.less';
import { useState } from "react";
import Home from "./pages/home/Home";
import Finding from "./pages/finding/Finding";
import { useSelector } from "react-redux";
import { Spin } from "antd";

function App() {
  const pendingRequests = useSelector(state => state.pendingRequests);
  const [values, setValues] = useState();

  const loading = pendingRequests > 0 ? true : false;

  const handleSearch = (values) => {
    setValues(values);
  }

  return (
    <div style={{ height: "100%" }}>
      {loading && <Spin className='page-loading' spinning={true} size="large" />}
      {values ? <Finding values={values} /> : <Home onSearch={handleSearch} />}
    </div>
  );
}

export default App;
