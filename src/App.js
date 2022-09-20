import Layout from "./Components/Layout/Layout";
import { Switch } from "react-router-dom";
import {Route} from "react-router-dom";
import Product from "./Container/Product/Product";
import Counter from "./Container/Counter/Counter";
import { configureStore } from "./redux/Store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import Promise_Example from "./Examples/Promise_Example";
import Category from "./Container/Category/Category";

function App() {
  const {store,persistor} = configureStore();
  
  return (
    <>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <Layout>
        <Switch>
          <Route path={"/product"} exact component={Product} />
          <Route path={"/counter"} exact component={Counter} />
          <Route path={"/promise"} exact component={Promise_Example} />
          <Route path={"/category"} exact component={Category} />
        </Switch>
      </Layout>
      </PersistGate>
      </Provider>
    </>
  );
}

export default App;
