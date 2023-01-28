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
    CheckIcon, Menu, HamburgerIcon, Pressable, Heading, VStack, Center, Divider, Link, ScrollView, Badge, Flex
} from 'native-base';
import {ViewProperties} from "../App";
import {SongEntry, Style} from "./CreateEntry";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function List(props: ViewProperties) {

    const [songs, setSongs] = useState<SongEntry[]>()

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
                  <Menu.Item onPress={() => {props.routeHandler('Create')}}>Create Song</Menu.Item>
              </Menu>
          </Box>
          <Container alignItems="center" marginBottom={4}>
              <Flex direction="row"><Badge marginRight={2}>Jazz</Badge><Badge marginRight={2}>Fingerpicking</Badge></Flex>
          </Container>
          <ScrollView w={'100%'}>
              {songs?.map(song =>
                  <>
                      <Container alignItems="left" marginLeft={4}>
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
                      <Divider my="2"/>
                  </>
              )}
          </ScrollView>
      </Box>
  );
};
