import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import rootReducer from './store/rootReducer';

export default function App() {
  const isLoadingComplete = useCachedResources();

  const store = createStore(rootReducer)  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
