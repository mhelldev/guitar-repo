import { StyleSheet } from 'react-native';
import CreateEntry from "./CreateEntry";
import { NativeBaseProvider} from "native-base";

export default function App() {

  return (
      <NativeBaseProvider>
        <CreateEntry/>
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
