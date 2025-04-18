import React, { useState, useCallback, useMemo, useRef } from "react"
// import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native"
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Icon, TypeComment, CommentModal, TextField, DisplayImage } from "app/components"
import { Audio, AVPlaybackStatus } from "expo-av"
import { BottomSheetModal, BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet"
import Slider from "@react-native-community/slider"
import { AppNavigationProp } from "app/navigators/AppNavigator"
import { useNavigation } from "@react-navigation/native"
import useCreateConnection from "app/hooks/connections/use-creatConnection"
import useGetUser from "app/hooks/account/use-get-user"
// const icomingsound = require("../assets/sounds/my-first-sound.mp3")
const icomingsound = require("../../../assets/sounds/my-first-sound.mp3")

export interface ForumCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  images?: boolean
  username: string
  connectionStatus: boolean
  text: string
  topic?: string
  title: string
  // userId?: string
  media: any
  forumId: string
  forumPostId: string
}

/**
 * Describe your component here
 */
export const ForumCard = observer(function ForumCard(props: ForumCardProps) {
  const { username, connectionStatus, text, media, images, forumPostId, forumId, title } = props
  const [sound, setSound] = React.useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0) // Total duration
  const [position, setPosition] = useState<number>(0) // Current playback position
  const navigation = useNavigation<AppNavigationProp>()
  const createConnection = useCreateConnection()
  const getUser = useGetUser()
  // const snapPoints = useMemo(() => ["70%", "90%"], [])
  async function playSound(): Promise<void> {
    const { sound } = await Audio.Sound.createAsync(icomingsound, { shouldPlay: true })
    setSound(sound)

    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
    console.log("Playing Sound")
    await sound.playAsync()
  }

  // console.log(getUser?.value?.data.uuid, "value of getting users in ForumCard
  // component")

  const submitConnection = () => {
    createConnection
      .mutateAsync({ receiver_uuid: getUser?.value?.data?.uuid })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        error?.response?.data || error.message
      })
  }

  // const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
  //   if (status.isLoaded) {
  //     setIsPlaying(status.isPlaying)
  //     setDuration(status.durationMillis || 0)
  //     setPosition(status.positionMillis || 0)
  //   } else if (status.error) {
  //     console.error(`Playback error: ${status.error}`)
  //   }
  // }

  const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis)
      setDuration(status.durationMillis ?? 0)

      if (status.didJustFinish) {
        setIsPlaying(false)
        console.log("Playback finished")

        await sound?.unloadAsync()
        const { sound: newSound } = await Audio.Sound.createAsync(icomingsound)
        setSound(newSound)

        // Reattach the playback status listener
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
      }
    }
  }

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync()
        console.log("Audio Paused")
      } else {
        await sound.playAsync()
        console.log("Audio Playing")
      }
    } else {
      await playSound()
    }
  }

  const seekAudio = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value)
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound")
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const imageBottomSheet = useRef<BottomSheetModal>(null)
  const scaleAnim = useSharedValue(0) // Reanimated shared value

  const openModal = useCallback((file: string) => {
    setSelectedImage(file)
    imageBottomSheet.current?.present()

    // Animate the scale from 0 to 1
    scaleAnim.value = withTiming(1, { duration: 300 })
  }, [])

  const closeModal = () => {
    scaleAnim.value = withTiming(0, { duration: 200 }, () => {
      imageBottomSheet.current?.dismiss()
      setSelectedImage(null)
    })
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }))

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index)
  }, [])

  // just incase you need a button for closing the Modal, below is the function
  // const handleCloseModalPress = useCallback(() => {
  //   bottomSheetModalRef.current?.dismiss()
  // }, [])

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  )

  const renderItem = useCallback(({ item }: any) => <CommentModal text={item} />, [])

  return (
    <View style={styles.contentContainer}>
      <View style={styles.textSpacing}>
        <View style={[styles.spanWrapper, styles.textGap]}>
          <Text weight="sansMd" size="xxs" style={styles.accentColor} text={`@${username}`} />
          <Text weight="light" size="xxs" style={styles.yearsText} text="25Years old" />
        </View>
        <View style={styles.playContainer}>
          <Icon icon="pinned" />
          {connectionStatus ? (
            <TouchableOpacity onPress={submitConnection} style={styles.btnStyle}>
              {createConnection.isPending ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text weight="normal" style={styles.privateConnect} text="Connect privately" />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btnStyle}>
              <Text weight="normal" style={styles.privateConnect} text="Public View" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text weight="light" size="sm" style={styles.textColor} text={title} />
      <Text weight="light" size="xs" style={styles.contentText} text={text} />

      {images ? (
        <View style={styles.imagesWrapper}>
          {media?.image.map((item: any, i: number) => (
            <TouchableOpacity key={i} onPress={() => openModal(item)}>
              <Image source={{ uri: item }} style={styles.imageStyle} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.playContainer}>
          <Icon onPress={togglePlayPause} size={15} icon="play" />
          <Slider
            style={{ width: 170, height: 40 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#660033"
            maximumTrackTintColor="#000000"
            onValueChange={seekAudio}
          />
          {/* <Text size="lg" text={slider.toString()} /> */}
        </View>
      )}

      <View style={[styles.textSpacing]}>
        <View style={[styles.spanWrapper, { gap: 20 }]}>
          <View style={[styles.spanWrapper, styles.textGap]}>
            <Icon icon="heart" />
            <Text weight="normal" style={styles.reactions} text="15 likes" />
          </View>
          <View style={[styles.spanWrapper, styles.textGap]}>
            <Icon onPress={handlePresentModalPress} icon="message" />
            <Text weight="normal" style={styles.reactions} text="20 comments" />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ForumPostDetail", { forumPostId, forumId })}
          style={[styles.textSpacing, styles.textGap]}
        >
          <Text weight="sansNormal" size="xxs" style={styles.accentColor} text="See more" />
          <Icon icon="forward" />
        </TouchableOpacity>
      </View>

      {/* <PopUps showModal={openComment} setShowModal={setComment}> */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        // index={0} // Start at 50%
        // snapPoints={snapPoints}
        enableDismissOnClose
        enablePanDownToClose
        onChange={handleSheetChanges}
      >
        <View style={styles.modalStyle}>
          <BottomSheetFlatList
            data={data}
            keyExtractor={(i) => i}
            renderItem={renderItem}
            // contentContainerStyle={styles.contentContainers}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />

          <View>
            <TypeComment />
          </View>
        </View>
      </BottomSheetModal>

      <BottomSheetModal
        ref={imageBottomSheet}
        // index={1} // Start at 50%
        snapPoints={["100%"]}
        enableDismissOnClose
        enablePanDownToClose
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.fullScreenImageContainer}>
          {selectedImage && (
            <Animated.View style={[animatedStyle]}>
              <DisplayImage selectedImage={selectedImage} />
            </Animated.View>
          )}
          {/* <Text text="hello world" /> */}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
})

const styles = StyleSheet.create({
  spanWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: colors.palette.primary50,
    width: 110,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textColor: {
    color: colors.palette.primary100,
  },
  yearsText: {
    color: "#254863CC",
    fontSize: 10,
  },
  textSpacing: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accentColor: {
    color: colors.palette.primary50,
  },
  privateConnect: {
    color: colors.palette.neutral100,
    fontSize: 10,
    paddingVertical: 8,
  },

  reactions: {
    color: colors.palette.secondary100,
    fontSize: 9,
  },
  contentContainer: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 4,
    padding: 15,
  },

  contentText: {
    color: "#0A161ECC",
    marginBottom: 10,
  },
  textGap: {
    gap: 4,
  },

  playContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  imagesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    // gap: 5,
  },
  imageStyle: {
    width: 100,
    height: 80,
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  modalStyle: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  // below are tryial style
})
