import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/Not Found/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import { AuthContextProvider, PrivateRoute } from './components/useAuth';
import Shipment from './components/Shipment/Shipment';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>

            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/inventory">
              <Inventory></Inventory>

            </Route>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <PrivateRoute path='/shipment'>
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>

            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
