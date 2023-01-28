import { StyleSheet } from 'react-native';
import CreateEntry from "./views/CreateEntry";
import { NativeBaseProvider} from "native-base";
import {useState} from "react";
import List from "./views/List";

export type Route = 'List' | 'Create'
export interface ViewProperties {
    routeHandler: Function
}

export default function App() {

  const [route, setRoute] = useState<Route>('List')

  return (
      <NativeBaseProvider>
          {route === 'List' ? <List routeHandler={setRoute}/> : <CreateEntry routeHandler={setRoute}/>}
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
