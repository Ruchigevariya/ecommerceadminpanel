import Layout from "./Components/Layout/Layout";
import { Switch } from "react-router-dom";
import {Route} from "react-router-dom";
import Product from "./Container/Product/Product";

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path={"/product"} exact component={Product} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
