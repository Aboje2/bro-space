import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, StyleSheet, Image } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button } from "app/components"
import { colors, spacing } from "app/theme"
const futbal = require("../../../assets/images/futbal.png")
const dev = require("../../../assets/images/dev.png")
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface AdventureScreenProps extends DemoTabScreenProps<"Adventure"> {}

export const AdventureScreen: FC<AdventureScreenProps> = observer(function AdventureScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const { navigation } = _props
  const [tab, setTab] = useState("Hobbies")
  const tabText = ["Hobbies", "Career paths"]
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      <View style={styles.topContent}>
        <Text weight="semiBold" size="lg" style={styles.primaryColor} text="Adventures" />
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

        <View style={styles.cardStyle}>
          <Image style={styles.imageStyle} source={futbal} resizeMode="contain" />
          <View>
            {/* <View style={styles.bigCycle}>
              <View style={styles.smallCycle} />
            </View> */}
            <Text weight="semiBold" size="sm" style={styles.primaryColor} text="Football" />
            <Text
              weight="medium"
              style={{ fontSize: 10, color: "#254863B2" }}
              text=" Let's discuss about football 😎"
            />

            <View style={styles.buttonsContainer}>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("Preview")}
                style={styles.buttonStyle}
              >
                <Text weight="medium" style={styles.butttonText} text="Tech Fest 1.0" />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Preview")}
                style={styles.buttonStyle}
              >
                <Text weight="medium" style={styles.butttonText} text="Tech Fest 1.0" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Events")}
                style={[styles.buttonStyle, { backgroundColor: "#6600331A" }]}
              >
                <Text
                  weight="medium"
                  style={[styles.butttonText, { color: "#660033" }]}
                  text="87 Events active"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.cardStyle}>
          <Image style={styles.imageStyle} source={futbal} resizeMode="contain" />
          <View>
            {/* <View style={styles.bigCycle}>
              <View style={styles.smallCycle} />
            </View> */}
            <Text weight="semiBold" size="sm" style={styles.primaryColor} text="Football" />
            <Text
              weight="medium"
              style={{ fontSize: 10, color: "#254863B2" }}
              text=" Let's discuss about football😎"
            />

            <View style={styles.buttonsContainer}>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("Preview")}
                style={styles.buttonStyle}
              >
                <Text weight="medium" style={styles.butttonText} text="Tech Fest 1.0" />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Preview")}
                style={styles.buttonStyle}
              >
                <Text weight="medium" style={styles.butttonText} text="Tech Fest 1.0" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Events")}
                style={[styles.buttonStyle, { backgroundColor: "#6600331A" }]}
              >
                <Text
                  weight="medium"
                  style={[styles.butttonText, { color: "#660033" }]}
                  text="87 Events active"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.cardStyle}>
          {/* <View style={styles.bigCycle}>
            <View style={styles.smallCycle} />
          </View> */}
          <Text weight="semiBold" size="sm" style={styles.primaryColor} text="Football" />
          <Text
            weight="medium"
            style={{ fontSize: 10, color: "#254863B2" }}
            text=" Let's discuss football and everything associated with it 😎"
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Preview")}
              style={styles.buttonStyle}
            >
              <Text weight="medium" style={styles.butttonText} text="Tech Fest 1.0" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Preview")}
              style={styles.buttonStyle}
            >
              <Text weight="medium" style={styles.butttonText} text="Tech Fest 1.0" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Events")}
              style={[styles.buttonStyle, { backgroundColor: "#6600331A" }]}
            >
              <Text
                weight="medium"
                style={[styles.butttonText, { color: "#660033" }]}
                text="87 Events active"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          preset="primary"
          style={styles.customBtn}
          onPress={() => navigation.navigate("CreateEvents")}
          textStyle={{ color: colors.palette.neutral100 }}
          text="Create a new event"
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
  topContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: colors.palette.neutral100,
  },
  primaryColor: {
    color: colors.palette.primary100,
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
  inputStyle: {
    borderWidth: 0,
  },
  buttonStyle: {
    width: 84,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#25486312",
    justifyContent: "center",
    alignItems: "center",
  },
  butttonText: {
    fontSize: 10,
    color: colors.palette.secondary50,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  cardStyle: {
    backgroundColor: colors.palette.neutral100,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
    marginBottom: 10,
    flexDirection: "row",
    gap: 20,
  },

  imageStyle: {
    width: 98,
    height: 80,
    borderRadius: 6,
  },

  // smallCycle: {
  //   width: 20,
  //   height: 20,
  //   borderRadius: 50,
  //   backgroundColor: colors.palette.primary50,
  // },

  // bigCycle: {
  //   width: 65,
  //   height: 65,
  //   borderRadius: 50,
  //   backgroundColor: "#6600331A",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   position: "absolute",
  //   top: -30,
  //   right: -30,
  // },
  iconStyle: { marginTop: 7, marginLeft: 10 },
  customBtn: {
    marginTop: 20,
  },
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.xxl,
  backgroundColor: "#0F0F0F1A",
  // paddingHorizontal: spacing.lg,
}
