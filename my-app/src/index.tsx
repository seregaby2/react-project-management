import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import './i18n';

const store = setupStore();

ReactDOM.render(
  <Suspense fallback={null}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);
