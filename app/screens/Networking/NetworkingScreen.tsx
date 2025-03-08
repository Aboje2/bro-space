import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, ImageBackground } from "react-native"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { Screen, Text, TextField, Icon, Button } from "app/components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
const bgImage = require("../../../assets/images/bg-frame.png")

interface NetworkingScreenProps extends DemoTabScreenProps<"Networking"> {}
// DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> =
export const NetworkingScreen: FC<NetworkingScreenProps> = observer(function NetworkingScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [tab, setTab] = useState("Hobbies")
  const tabText = ["Hobbies", "Career paths"]
  const bgColor = [
    "#254863E5",
    "#0B1A25E5",
    "#596066E5",
    "#BBA770CC",
    colors.palette.secondary50,
    "#0B1A25E5",
    "#596066E5",
    "#BBA770CC",
    "#254863E5",
    "#9AC8EBB2",
    "#966132B2",
  ]
  return (
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

        <View style={{ borderRadius: 8, marginBottom: 10 }}>
          <ImageBackground resizeMode="cover" style={styles.imageStyle} source={bgImage}>
            <View style={styles.topItemSpacing}>
              <Text weight="semiBold" size="sm" style={styles.primaryColor} text="Football" />
              <View style={styles.buttonWrapper}>
                <View style={[styles.buttonStyle, { backgroundColor: "#6600331A" }]}>
                  <Text weight="medium" size="xxs" style={styles.viewTextStyle} text="View" />
                </View>
                <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: "#660033" }]}>
                  <Text weight="medium" size="xxs" style={styles.joinStyle} text="Join" />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              weight="medium"
              style={{ fontSize: 10, color: "#254863B2" }}
              text=" Let's discuss football and everything associated with it 😎"
            />

            <View style={styles.initialsWrapper}>
              {Array.from({ length: 12 }).map((_, i) => (
                <View key={i}>
                  <View style={styles.initialWrapper}>
                    <Text weight="sansMd" style={styles.intialValue} text="AN" />
                  </View>
                </View>
              ))}
              <Text weight="medium" style={styles.usersText} text="1,287 users" />
            </View>
          </ImageBackground>
        </View>

        <View style={{ borderRadius: 8, marginBottom: 10 }}>
          <ImageBackground resizeMode="cover" style={styles.imageStyle} source={bgImage}>
            <View style={styles.topItemSpacing}>
              <Text weight="semiBold" size="sm" style={styles.primaryColor} text="Football" />
              <View style={styles.buttonWrapper}>
                <View style={[styles.buttonStyle, { backgroundColor: "#6600331A" }]}>
                  <Text weight="medium" size="xxs" style={styles.viewTextStyle} text="View" />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ChatPage")}
                  style={[styles.buttonStyle, { backgroundColor: "#660033" }]}
                >
                  <Text weight="medium" size="xxs" style={styles.joinStyle} text="Join" />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              weight="medium"
              style={{ fontSize: 10, color: "#254863B2" }}
              text=" Let's discuss football and everything associated with it 😎"
            />

            <View style={styles.initialsWrapper}>
              {Array.from({ length: 12 }).map((_, i) => (
                <View key={i}>
                  <View style={[styles.initialWrapper, { backgroundColor: bgColor[i] }]}>
                    <Text weight="sansMd" style={styles.intialValue} text="AN" />
                  </View>
                </View>
              ))}
              <Text weight="medium" style={styles.usersText} text="1,287 users" />
            </View>
          </ImageBackground>
        </View>
        <View style={{ borderRadius: 8, marginBottom: 10 }}>
          <ImageBackground resizeMode="cover" style={styles.imageStyle} source={bgImage}>
            <View style={styles.topItemSpacing}>
              <Text weight="semiBold" size="sm" style={styles.primaryColor} text="Football" />
              <View style={styles.buttonWrapper}>
                <View style={[styles.buttonStyle, { backgroundColor: "#6600331A" }]}>
                  <Text weight="medium" size="xxs" style={styles.viewTextStyle} text="View" />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ChatPage")}
                  style={[styles.buttonStyle, { backgroundColor: "#660033" }]}
                >
                  <Text weight="medium" size="xxs" style={styles.joinStyle} text="Join" />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              weight="medium"
              style={{ fontSize: 10, color: "#254863B2" }}
              text=" Let's discuss football and everything associated with it 😎"
            />

            <View style={styles.initialsWrapper}>
              {Array.from({ length: 12 }).map((_, i) => (
                <View key={i}>
                  <View style={[styles.initialWrapper, { backgroundColor: bgColor[i] }]}>
                    <Text weight="sansMd" style={styles.intialValue} text="AN" />
                  </View>
                </View>
              ))}
              <Text weight="medium" style={styles.usersText} text="1,287 users" />
            </View>
          </ImageBackground>
        </View>

        <Button
          preset="primary"
          textStyle={{ color: "#fff" }}
          style={styles.customBtn}
          text="Create new forum"
        />
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: "#0F0F0F1A",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  usersText: {
    fontSize: 11,
    color: "#254863B2",
  },
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

  joinStyle: {
    fontSize: 10,
    color: colors.palette.neutral100,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  topItemSpacing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  initialWrapper: {
    width: 22,
    height: 22,
    borderRadius: 50,
    marginLeft: -5,
    justifyContent: "center",
    alignItems: "center",
  },
  initialsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  topContent: {
    paddingHorizontal: spacing.lg,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 20,
  },
  imageStyle: {
    height: 100,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  intialValue: {
    fontSize: 10,
    color: colors.palette.neutral100,
  },
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
