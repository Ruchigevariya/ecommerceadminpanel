import Layout from "./Components/Layout/Layout";
import { Switch } from "react-router-dom";
import {Route} from "react-router-dom";
import Product from "./Container/Product/Product";
import Counter from "./Container/Counter/Counter";
import { Provider } from "react-redux";
import { configureStore } from "./redux/Store";

function App() {
  const store = configureStore();
  
  return (
    <>
    <Provider store = {store}>
      <Layout>
        <Switch>
          <Route path={"/product"} exact component={Product} />
          <Route path={"/counter"} exact component={Counter} />
        </Switch>
      </Layout>
      </Provider>
    </>
  );
}

export default App;
