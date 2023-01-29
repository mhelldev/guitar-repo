import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
    Container,
    Alert,
    Button,
    Text,
    Input,
    View,
    Box,
    FormControl,
    Stack,
    Slider,
    Select,
    CheckIcon,
    Menu,
    HamburgerIcon,
    Pressable,
    Heading,
    VStack,
    Center,
    Divider,
    Link,
    ScrollView,
    Badge,
    Flex,
    IconButton, Icon
} from 'native-base';
import {ViewProperties} from "../App";
import {SongEntry, Style} from "./CreateEntry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AntDesign} from "@expo/vector-icons";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function List(props: ViewProperties) {

    const [songs, setSongs] = useState<SongEntry[]>()
    const [style, setStyle] = useState<Style>()

    const readData = async () => {
        try {
            const guitarRepoJsonString = await AsyncStorage.getItem('@guitar-repo')
            let guitarRepo: SongEntry[] = []
            if (guitarRepoJsonString) {
                guitarRepo = JSON.parse(guitarRepoJsonString)
            }
            setSongs(guitarRepo)
        } catch (e) {
            console.log('error reading file')
        }
    }

    useEffect(() => {
        readData()
    }, [])

  return (
      <Box alignItems="center" marginTop={5}>
          <Box w="90%" marginLeft={4} marginY={5} alignItems="left">
              <Menu w="190" trigger={triggerProps => {
                  return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                      <HamburgerIcon />
                  </Pressable>;
              }}>
                  <Menu.Item isDisabled>List Songs</Menu.Item>
                  <Menu.Item onPress={() => {props.appStateHandler({route: 'Create'})}}>Create Song</Menu.Item>
              </Menu>
          </Box>
          <Container alignItems="center" >
              <Flex direction="row"><Badge marginRight={2} backgroundColor={style === 'Jazz' ? 'emerald.500' : 'gray.100'} onTouchStart={() => style === 'Jazz' ? setStyle(undefined) : setStyle('Jazz')}>Jazz</Badge><Badge marginRight={2} backgroundColor={style === 'Fingerpicking' ? 'emerald.500' : 'gray.100'} onTouchStart={() => style === 'Fingerpicking' ? setStyle(undefined) : setStyle('Fingerpicking')}>Fingerpicking</Badge>
                  <Badge marginRight={2} backgroundColor={style === 'Blues' ? 'emerald.500' : 'gray.100'} onTouchStart={() => style === 'Blues' ? setStyle(undefined) : setStyle('Blues')}>Blues</Badge><Badge marginRight={2} backgroundColor={style === 'Rock/Pop' ? 'emerald.500' : 'gray.100'} onTouchStart={() => style === 'Rock/Pop' ? setStyle(undefined) : setStyle('Rock/Pop')}>Rock/Pop</Badge></Flex>
          </Container>
          <Divider marginBottom={4}/>

          <ScrollView w={'100%'}>
              {songs?.filter(song => song.style === style || style === undefined).map(song =>
                  <>
                      <Flex direction={'row'}>
                          <Container alignItems="left" marginLeft={6} w={'100%'}>
                              <Heading>
                                  <Text color="emerald.500">{song.song}</Text>
                                  <Text> {song.artist}</Text>
                              </Heading>
                              <Text mt="1" fontWeight="medium">
                                  <Text bold>{song.style}</Text> - {song.progress}%
                              </Text>
                              <Link fontWeight="medium">{song.youtube}</Link>
                              <Link fontWeight="medium">{song.ultimateGuitar}</Link>
                          </Container>
                          <Flex direction={'column'}>
                              <IconButton icon={<Icon as={AntDesign} name="delete" />} borderRadius="full" />
                              <IconButton icon={<Icon as={AntDesign} name="edit" />} borderRadius="full" onPress={() => {

                                  props.appStateHandler({route: 'Create', entry: song})
                              }}/>
                          </Flex>
                      </Flex>
                      <Divider ml={'4%'} width={'92%'} my="2"/>
                  </>
              )}
          </ScrollView>
      </Box>
  );
};
