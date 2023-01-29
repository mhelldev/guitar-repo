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
    CheckIcon, Menu, HamburgerIcon, Pressable, Heading
} from 'native-base';
import {ViewProperties} from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from 'uuid';

export type Style = 'Jazz' | 'Fingerpicking' | 'Blues' | 'Rock/Pop'

export interface SongEntry {
    id: string
    song: string
    artist: string
    style: Style
    progress: number
    youtube?: string
    ultimateGuitar?: string
};


export default function CreateEntry(props: ViewProperties) {
    const [id, setId] = useState<string | undefined>()
    const [song, setSong] = useState<string | undefined>()
    const [artist, setArtist] = useState<string | undefined>(undefined)
    const [style, setStyle] = useState<Style | undefined>(undefined)
    const [progress, setProgress] = useState<number | undefined>(undefined)
    const [youtube, setYoutube] = useState<string | undefined>(undefined)
    const [ultimateGuitar, setUltimateGuitar] = useState<string | undefined>(undefined)

    const isSaveEnabled = () => {
        return song && artist && style && progress
    }

    useEffect(() => {
        if (props.entry) {
            setId(props.entry.id)
            setSong(props.entry.song)
            setArtist(props.entry.artist)
            setStyle(props.entry.style)
            setProgress(props.entry.progress)
            setYoutube(props.entry.youtube)
            setUltimateGuitar(props.entry.ultimateGuitar)
        }
    }, [])

  const onSubmit = async () => {
        if (song && artist && style && progress) {
            const entry: SongEntry = {
                id: uuidv4(),
                song,
                artist,
                style,
                progress,
                youtube,
                ultimateGuitar
            }
            try {
                const guitarRepoJsonString = await AsyncStorage.getItem('@guitar-repo')
                let guitarRepo: SongEntry[] = []
                if(guitarRepoJsonString) {
                    guitarRepo = JSON.parse(guitarRepoJsonString)
                }
                guitarRepo.push(entry)

                await AsyncStorage.setItem('@guitar-repo', JSON.stringify(guitarRepo))
            } catch (e) {
                console.log('error saving file')
            }
        }
  };

  return (
      <Box alignItems="center" marginTop={5}>
          <Box w="90%" marginLeft={4} marginY={5} alignItems="left">
              <Menu w="190" trigger={triggerProps => {
                  return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                      <HamburgerIcon />
                  </Pressable>;
              }}>
                  <Menu.Item onPress={() => {props.appStateHandler({route: 'List'})}}>List Songs</Menu.Item>
                  <Menu.Item isDisabled>Create Song</Menu.Item>
              </Menu>
          </Box>
          <FormControl isRequired>
              <Stack mx="6">
                  <Heading marginBottom={4}>New Song</Heading>
                  <FormControl.Label>Song</FormControl.Label>
                  <Input value={song} onChangeText={val => setSong(val)}/>
                  <FormControl.Label>Artist</FormControl.Label>
                  <Input value={artist} onChangeText={val => setArtist(val)}/>
                  <FormControl.Label>Style</FormControl.Label>
                  <Select selectedValue={style} accessibilityLabel="Choose Style" placeholder="Choose Style" _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />
                  }} mt={1} onValueChange={(value) => setStyle(value as Style)}>
                      <Select.Item label="Jazz" value="Jazz" />
                      <Select.Item label="Fingerpicking" value="Fingerpicking" />
                      <Select.Item label="Blues" value="Blues" />
                      <Select.Item label="Rock/Pop" value="Rock/Pop" />
                  </Select>
                  <FormControl.Label>Progress ({progress})</FormControl.Label>
                  <Slider value={progress}  onChange={value => setProgress(value)} minValue={0} maxValue={100} accessibilityLabel="hello world" step={10}>
                      <Slider.Track>
                          <Slider.FilledTrack />
                      </Slider.Track>
                      <Slider.Thumb />
                  </Slider>
                  <FormControl.Label isRequired={false}>Youtube</FormControl.Label>
                  <Input value={youtube} onChangeText={val => setYoutube(val)}/>
                  <FormControl.Label isRequired={false}>Ultimate Guitar</FormControl.Label>
                  <Input value={ultimateGuitar} onChangeText={val => setUltimateGuitar(val)}/>
                  <Button isDisabled={!isSaveEnabled()}  marginTop={5} onPress={() => onSubmit()} >Submit</Button>
              </Stack>
          </FormControl>
      </Box>
  );
};
