import React, { useState, useEffect } from "react"
import { StyleProp, StyleSheet, View, ViewStyle, TouchableOpacity, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Icon } from "app/components"
import { Audio, AVPlaybackStatus } from "expo-av"
import Slider from "@react-native-community/slider"
import { AppNavigationProp } from "app/navigators/AppNavigator"
import { useNavigation } from "@react-navigation/native"
const icomingsound = require("../../assets/sounds/my-first-sound.mp3")
const firstVac = require("../../assets/images/vac1.png")
const secondVac = require("../../assets/images/vac2.png")
const thirdVac = require("../../assets/images/vac3.png")

export interface InterestProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  images?: boolean
}

/**
 * Describe your component here
 */
export const Interest = observer(function Interest(props: InterestProps) {
  const {} = props
  const [sound, setSound] = React.useState<Audio.Sound | null>(null)
  const [slider, setSlider] = React.useState(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0) // Total duration
  const [position, setPosition] = useState<number>(0) // Current playback position

  const navigation = useNavigation<AppNavigationProp>()

  async function playSound(): Promise<void> {
    console.log("Loading Sound")
    const { sound } = await Audio.Sound.createAsync(icomingsound, { shouldPlay: true })
    setSound(sound)

    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
    console.log("Playing Sound")
    await sound.playAsync()
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

        // 🔄 Unload and reload the sound to reset it
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

  return (
    <View style={styles.contentContainer}>
      <View style={styles.textSpacing}>
        <View style={[styles.spanWrapper, styles.textGap]}>
          <Text weight="sansMd" size="xxs" style={styles.accentColor} text="@Soft king" />
          <Text weight="light" size="xxs" style={styles.yearsText} text="25Years old" />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Ananymous")} style={styles.btnStyle}>
          <Text weight="normal" style={styles.privateConnect} text="Connect privately" />
        </TouchableOpacity>
      </View>
      <Text weight="light" size="sm" style={styles.textColor} text="Best meditation techniques" />
      <Text
        weight="light"
        size="xs"
        style={styles.contentText}
        text="Contrary to popular belief, Lorem Ipsum is not simply just a random text. It has roots in a piece of classical Latin 45 BC."
      />

      {props.images ? (
        <View style={[styles.textSpacing, { marginBottom: 10 }]}>
          <Image source={firstVac} resizeMode="contain" style={styles.imageStyle} />
          <Image source={secondVac} resizeMode="contain" style={styles.imageStyle} />
          <Image source={thirdVac} resizeMode="contain" style={styles.imageStyle} />
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
            <Icon icon="message" />
            <Text weight="normal" style={styles.reactions} text="20 comments" />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("PostDetail")}
          style={[styles.textSpacing, styles.textGap]}
        >
          <Text weight="sansNormal" size="xxs" style={styles.accentColor} text="See more" />
          <Icon icon="forward" />
        </TouchableOpacity>
      </View>
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
    width: 124,
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
  imageStyle: {
    width: 88,
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
})
