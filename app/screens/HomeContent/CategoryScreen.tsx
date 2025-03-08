import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, View, StyleSheet, Image } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"

const grid1 = require("../../../assets/images/slider1.png")
const grid2 = require("../../../assets/images/slider2.png")
const grid3 = require("../../../assets/images/slider3.png")
// import { useStores } from "app/models"

interface CategoryScreenProps extends AppStackScreenProps<"Category"> {}
const catImages = [
  { img: grid1, title: "Wellness" },
  { img: grid2, title: "Style" },
  { img: grid3, title: "Networking" },
  { img: grid2, title: "Finance" },
  { img: grid3, title: "Personal Development" },
  { img: grid1, title: "Adventure" },
]

export const CategoryScreen: FC<CategoryScreenProps> = observer(function CategoryScreen() {
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
        <Text weight="sansMd" size="md" style={styles.textColor} text="Categories" />
      </TouchableOpacity>

      <View style={styles.contentWrapper}>
        {catImages.map((item) => (
          <View key={item.title + 1}>
            <TouchableOpacity onPress={() => navigation.navigate("Wellness")}>
              <Image style={styles.imageStyle} source={item.img} />
              {/* <Text weight="medium" text={item.title} /> */}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Screen>
  )
})
const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
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

  contentWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
  },
  imageStyle: {
    width: 153.5,
    borderRadius: 8,
  },
})
