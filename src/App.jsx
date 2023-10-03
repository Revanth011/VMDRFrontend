import './App.css';
// import Home from "../src/Home";
import Assets from './pages/assets/Assets';
import AddAssets from './pages/assets/AddAssets';
import { ConfigProvider, theme } from 'antd';

function App() {

  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.defaultAlgorithm],
      }}
    >
      <Assets />
      <AddAssets />
    </ConfigProvider>
  )

}

export default App;
