import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField } from "app/components"
import { colors, spacing } from "app/theme"
const senderImg = require("../../../assets/images/sender.png")
const receiverImg = require("../../../assets/images/receiver.png")
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ChatPageScreenProps extends AppStackScreenProps<"ChatPage"> {}
const messages = [
  { img: senderImg, msg: "Hi there", time: "2:21pm", from: "receiver" },
  { img: receiverImg, msg: "Where are you at the moment??", time: "2:21pm", from: "sender" },
  { img: senderImg, msg: "I’m at work", time: "2:21pm", from: "receiver" },
  { img: receiverImg, msg: "Alright boss", time: "2:21pm", from: "sender" },
]
export const ChatPageScreen: FC<ChatPageScreenProps> = observer(function ChatPageScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
        <View style={styles.iconWrapper}>
          <Icon icon="backward" />
        </View>
        <Text weight="sansMd" size="md" style={styles.textColor} text="Soft King" />
      </TouchableOpacity>

      {messages.map((message, i) => (
        <View
          key={message.time + i}
          style={{
            flexDirection: "row",
            justifyContent: message.from === "receiver" ? "flex-end" : "flex-start",
            marginBottom: 30,
          }}
        >
          <View>
            <View style={styles.messageBox}>
              {message.from === "sender" && (
                <View style={styles.imgWrapper}>
                  <Image style={styles.imgStyle} source={message.img} />
                </View>
              )}
              <View>
                <View
                  style={[
                    styles.chatWrapper,
                    {
                      borderTopLeftRadius: message.from === "receiver" ? 7 : 0,
                      borderTopRightRadius: message.from === "sender" ? 7 : 0,
                    },
                  ]}
                >
                  <View style={styles.chatContainer}>
                    <Text weight="normal" size="xs" text={message.msg} />
                  </View>
                </View>
                <Text weight="normal" style={styles.chatDate} text={message.time} />
              </View>
              {message.from === "receiver" && (
                <View style={styles.imgWrapper}>
                  <Image style={styles.imgStyle} source={message.img} />
                </View>
              )}
            </View>
          </View>
        </View>
      ))}

      <View>
        <TextField
          placeholder="Write message"
          RightAccessory={() => (
            <View style={styles.TextIconWrapper}>
              <Icon icon="sendMsg" />
            </View>
          )}
        />
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  iconWrapper: {
    width: 30,
    height: 30,
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.palette.primary100,
    justifyContent: "center",
    alignItems: "center",
  },

  textColor: {
    color: colors.palette.primary100,
  },
  iconContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 60,
  },
  chatWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: "#0E44900D",
  },
  chatContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  chatDate: {
    fontSize: 10,
    color: "#8E8E93",
  },
  imgWrapper: {
    width: 24,
    height: 24,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  imgStyle: {
    width: 24,
    height: 24,
    borderRadius: 50,
  },

  messageBox: {
    flexDirection: "row",
    gap: 4,
  },

  TextIconWrapper: {
    width: 52,
    height: 48,
    backgroundColor: colors.palette.primary50,
    justifyContent: "center",
    alignItems: "center",
  },
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
