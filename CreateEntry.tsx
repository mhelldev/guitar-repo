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
    CheckIcon, Menu, HamburgerIcon, Pressable
} from 'native-base';

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function CreateEntry() {

  const onSubmit = (data: FormData) => {
    //Alert.alert('data', JSON.stringify(data));
  };

  return (
      <Box alignItems="center" marginTop={5}>
          <Box w="90%" marginLeft={4} marginY={5} alignItems="left">
              <Menu w="190" trigger={triggerProps => {
                  return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                      <HamburgerIcon />
                  </Pressable>;
              }}>
                  <Menu.Item>List Songs</Menu.Item>
                  <Menu.Item isDisabled>Create Song</Menu.Item>
              </Menu>
          </Box>
          <FormControl isRequired>
              <Stack mx="6">
                  <FormControl.Label>Song</FormControl.Label>
                  <Input/>
                  <FormControl.Label>Artist</FormControl.Label>
                  <Input/>
                  <FormControl.Label>Style</FormControl.Label>
                  <Select selectedValue={'Jazz'} accessibilityLabel="Choose Style" placeholder="Choose Style" _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />
                  }} mt={1} onValueChange={() => {}}>
                      <Select.Item label="Jazz" value="ux" />
                      <Select.Item label="Fingerpicking" value="web" />
                      <Select.Item label="Blues" value="cross" />
                      <Select.Item label="Rock/Pop" value="ui" />
                  </Select>
                  <FormControl.Label>Progress</FormControl.Label>
                  <Slider defaultValue={70} minValue={0} maxValue={100} accessibilityLabel="hello world" step={10}>
                      <Slider.Track>
                          <Slider.FilledTrack />
                      </Slider.Track>
                      <Slider.Thumb />
                  </Slider>
                  <FormControl.Label>Youtube</FormControl.Label>
                  <Input defaultValue={"https://youtube.de/"}/>
                  <FormControl.Label>Ultimate Guitar</FormControl.Label>
                  <Input/>
                  <Button marginTop={5} onPress={() => onSubmit} >Submit</Button>
              </Stack>
          </FormControl>
      </Box>
  );
};
