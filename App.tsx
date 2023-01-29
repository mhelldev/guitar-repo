import { StyleSheet } from 'react-native';
import CreateEntry, {SongEntry} from "./views/CreateEntry";
import { NativeBaseProvider} from "native-base";
import {useState} from "react";
import List from "./views/List";

export type Route = 'List' | 'Create'
export interface ViewProperties {
    appStateHandler: Function
    entry?: SongEntry
}

interface AppState {
  route: Route
  entry?: SongEntry
}

export default function App() {

  const [appState, setAppState] = useState<AppState | undefined>()


  return (
      <NativeBaseProvider>
          {appState?.route === 'List' ? <List appStateHandler={setAppState}/> : <CreateEntry entry={appState?.entry} appStateHandler={setAppState}/>}
      </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
