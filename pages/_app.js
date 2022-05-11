import '../styles/globals.css';
import { UIContextProvider } from '../components/UIContext';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { rootReducer } from '../redux/reducers/rootReducer';
import { useEffect } from 'react';

let store = createStore(rootReducer);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }, []);

  return (
    <Provider store={store}>
      <UIContextProvider>
        <Component {...pageProps} />
      </UIContextProvider>
    </Provider>
  );
}

export default MyApp;
