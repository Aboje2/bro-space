import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import {
  Screen,
  Text,
  TextField,
  Icon,
  Button,
  IfElse,
  ForumModal,
  HomeLoader,
  ForumPost,
} from "app/components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"

import useGetForumList from "app/hooks/forum/use-list-forum"

// import { useStores } from "app/models"
const bgImage = require("../../../assets/images/bg-frame.png")
const futbal = require("../../../assets/images/futbal.png")
const dev = require("../../../assets/images/dev.png")

interface NetworkingScreenProps extends DemoTabScreenProps<"Networking"> {}
// DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> =
export const NetworkingScreen: FC<NetworkingScreenProps> = observer(function NetworkingScreen(
  _props,
) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const getForumList = useGetForumList()

  // console.log(getForumList?.value?.data, "checking the right image in networking")

  // Pull in navigation via hook
  const { navigation } = _props

  const [tab, setTab] = useState("Hobbies")
  const tabText = ["Hobbies", "Career paths"]

  return (
    <IfElse
      ifOn={!getForumList.isPending && !!getForumList?.value}
      ifOnElse={getForumList.isPending && !getForumList?.value}
      onElse={<HomeLoader />}
    >
      <Screen
        preset="scroll"
        safeAreaEdges={["top", "bottom"]}
        contentContainerStyle={$screenContentContainer}
      >
        <View style={styles.topContent}>
          <Text weight="semiBold" size="lg" style={styles.primaryColor} text="Networking" />
        </View>

        <View style={styles.mainContent}>
          <TextField
            inputWrapperStyle={styles.inputStyle}
            placeholder="Search forums"
            LeftAccessory={() => <Icon style={styles.iconStyle} icon="search" />}
          />

          <View style={styles.tabWrapper}>
            {tabText.map((item) => (
              <TouchableOpacity
                style={[
                  styles.btnStyles,
                  { backgroundColor: item === tab ? "#66003326" : "#25486312" },
                ]}
                onPress={() => setTab(item)}
                key={item}
              >
                <Text
                  weight="medium"
                  size="xxs"
                  style={{ color: item === tab ? "#660033" : "#25486380" }}
                  text={item}
                />
              </TouchableOpacity>
            ))}
          </View>

          {getForumList?.value?.data.map((forum, i) => (
            <View key={i + forum.title}>
              <ForumPost
                forumId={forum.uuid}
                display_picture={forum.display_picture}
                title={forum.title}
                narration={forum.narration}
              />
            </View>
          ))}

          {/* <View style={{ borderRadius: 8, marginBottom: 10 }}>
            <ImageBackground resizeMode="cover" style={styles.imageStyle} source={bgImage}>
              <Image style={styles.imageBanner} source={dev} resizeMode="contain" />
              <View>
                <View style={styles.topItemSpacing}>
                  <Text weight="semiBold" size="sm" style={styles.primaryColor} text="Football" />

                  <TouchableOpacity
                    onPress={() => setOpenForum(true)}
                    style={[styles.buttonStyle, { backgroundColor: "#660033" }]}
                  >
                    {joinForum.isPending ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text weight="medium" size="xxs" style={styles.joinStyle} text="Join" />
                    )}
                  </TouchableOpacity>
                </View>

                <Text
                  weight="medium"
                  style={{ fontSize: 10, color: "#254863B2" }}
                  text=" Let's discuss about football 😎"
                />

                <View style={styles.initialsWrapper}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <View key={i}>
                      <View style={[styles.initialWrapper, { backgroundColor: bgColor[i] }]}>
                        <Text weight="sansMd" style={styles.intialValue} text="AN" />
                      </View>
                    </View>
                  ))}
                  <Text weight="medium" style={styles.usersText} text="1,287 users" />
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={{ borderRadius: 8, marginBottom: 10 }}>
            <ImageBackground resizeMode="cover" style={styles.imageStyle} source={bgImage}>
              <Image style={styles.imageBanner} source={futbal} resizeMode="contain" />
              <View>
                <View style={styles.topItemSpacing}>
                  <Text weight="semiBold" size="sm" style={styles.primaryColor} text="Football" />

                  <TouchableOpacity
                    onPress={() => navigation.navigate("ChatPage")}
                    style={[styles.buttonStyle, { backgroundColor: "#660033" }]}
                  >
                    <Text weight="medium" size="xxs" style={styles.joinStyle} text="Join" />
                  </TouchableOpacity>
                </View>

                <Text
                  weight="medium"
                  style={{ fontSize: 10, color: "#254863B2" }}
                  text=" Let's discuss about football 😎"
                />

                <View style={styles.initialsWrapper}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <View key={i}>
                      <View style={[{ backgroundColor: bgColor[i] }, styles.initialWrapper]}>
                        <Text weight="sansMd" style={styles.intialValue} text="AN" />
                      </View>
                    </View>
                  ))}
                  <Text weight="medium" style={styles.usersText} text="1,287 users" />
                </View>
              </View>
            </ImageBackground>
          </View> */}

          <Button
            preset="primary"
            textStyle={{ color: "#fff" }}
            style={styles.customBtn}
            text="Create new forum"
            onPress={() => navigation.navigate("CreateForum", { forumId: undefined })}
          />
        </View>
      </Screen>
    </IfElse>
  )
})

const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: "#0F0F0F1A",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  // usersText: {
  //   fontSize: 11,
  //   color: "#254863B2",
  // },
  btnStyles: {
    width: 145,
    height: 32,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  tabWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  buttonStyle: {
    width: 64,
    height: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  viewTextStyle: {
    fontSize: 10,
    color: colors.palette.primary50,
  },

  // joinStyle: {
  //   fontSize: 10,
  //   color: colors.palette.neutral100,
  // },
  // buttonWrapper: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 5,
  // },

  // topItemSpacing: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },

  // initialWrapper: {
  //   width: 22,
  //   height: 22,
  //   borderRadius: 50,
  //   marginLeft: -5,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // initialsWrapper: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },

  topContent: {
    paddingHorizontal: spacing.lg,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 20,
  },
  // imageStyle: {
  //   height: 100,
  //   borderRadius: 8,
  //   paddingHorizontal: 10,
  //   paddingVertical: 10,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 20,
  // },
  // intialValue: {
  //   fontSize: 10,
  //   color: colors.palette.neutral100,
  // },
  inputStyle: {
    borderWidth: 0,
  },
  primaryColor: {
    color: colors.palette.primary100,
  },
  customBtn: {
    marginTop: 30,
  },
  iconStyle: { marginTop: 7, marginLeft: 10 },
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.xxl,
  // paddingHorizontal: spacing.lg,
  backgroundColor: "#0F0F0F1A",
}
