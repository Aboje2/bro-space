import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon } from "app/components"
import { colors, spacing } from "app/theme"
const profile = require("../../../assets/images/profilePics.png")
import { useNavigation } from "@react-navigation/native"
import { AppNavigationProp } from "app/navigators"
// import { useStores } from "app/models"

interface ConnectionsScreenProps extends AppStackScreenProps<"Connections"> {}

const users = [
  { name: "Soft King", age: "25years old", img: profile },
  { name: "Soft King", age: "25years old", img: profile },
  { name: "Soft King", age: "25years old", img: profile },
  { name: "Soft King", age: "25years old", img: profile },
  { name: "Soft King", age: "25years old", img: profile },
  { name: "Soft King", age: "25years old", img: profile },
  { name: "Soft King", age: "25years old", img: profile },
  { name: "Soft King", age: "25years old", img: profile },
  { name: "Soft King", age: "25years old", img: profile },
  { name: "Soft King", age: "25years old", img: profile },
]

export const ConnectionsScreen: FC<ConnectionsScreenProps> = observer(function ConnectionsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<AppNavigationProp>()
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
        <Text weight="sansMd" size="md" style={styles.textColor} text="Connections" />
      </TouchableOpacity>

      <View>
        {users.map((user, i) => (
          <View key={user.name + i} style={styles.contentAlignment}>
            <View style={[styles.textAlignment, styles.gapItem]}>
              <View style={styles.imgWrapper}>
                <Image style={styles.imgWrapper} source={user.img} resizeMode="contain" />
              </View>
              <View style={[styles.textAlignment, styles.gapItem]}>
                <Text weight="sansMd" size="xxs" style={styles.nameText} text={user.name} />
                <Text weight="light" style={styles.yearsTxt} text={user.age} />
              </View>
            </View>

            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => navigation.navigate("ChatPage")}
            >
              <Text weight="sansNormal" style={styles.btnText} text="Message" />
            </TouchableOpacity>
          </View>
        ))}
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
    marginBottom: 40,
  },
  nameText: {
    color: colors.palette.primary50,
  },

  yearsTxt: {
    color: "#254863CC",
    fontSize: 10,
  },
  btnText: {
    fontSize: 10,
    color: colors.palette.neutral100,
  },
  textAlignment: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentAlignment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#e5eaf4",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  gapItem: {
    gap: 5,
  },
  btnStyle: {
    width: 72,
    height: 24,
    borderRadius: 4,
    backgroundColor: colors.palette.primary50,
    justifyContent: "center",
    alignItems: "center",
  },

  imgWrapper: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
})
const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
