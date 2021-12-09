import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Buyer from "./buyerpannel";
import { Route, HashRouter, Switch } from 'react-router-dom';
// import { Switch  } from "react-router"
ReactDOM.render(
  <HashRouter>
    <React.Suspense>
      <Switch>
        <Route exact path="/seller/:id" name="Login Page" component={App} />
        <Route exact path="/buyer/:id" name="Forgot Password Page" component={Buyer} />
      </Switch>
    </React.Suspense>
  </HashRouter>,
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="livestream/seller/:id" element={<App />} />
  //     <Route path="livestream/buyer/:id" element={<Buyer />} />

  //   </Routes>
  //   {/* <App /> */}
  // </BrowserRouter>,
  document.getElementById("root")
);
