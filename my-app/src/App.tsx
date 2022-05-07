import React from 'react';
import { Provider } from 'react-redux';
import { Router, Header, Footer } from './components';
import { setupStore } from './store/store';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Router />
      <Footer />
    </Provider>
  );
}

export default App;
