import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Weather from './componets/weather';

const App: React.FC = () => (
  <Provider store={store}>
    <Weather />
  </Provider>
);

export default App;
