import { StatusBar } from 'expo-status-bar';
import React from 'react';
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
    CheckIcon, Menu, HamburgerIcon, Pressable, Heading
} from 'native-base';
import {ViewProperties} from "../App";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function List(props: ViewProperties) {

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
          <Text>'List!'</Text>
      </Box>
  );
};
