import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
// import { useStores } from "app/models"

interface PreviewScreenProps extends AppStackScreenProps<"Preview"> {}
const previewItems = [
  { title: "Forum", value: "Web developers" },
  { title: "Event title", value: "Dev Hangout 2.0" },
  { title: "Event venue", value: "Onsite event" },
  { title: "Event date", value: "10-11-2024" },
  { title: "Event time", value: "From 8:00am to 10:00pm" },
  { title: "Event type", value: "Conference" },
  { title: "Event category", value: "Business and professional" },
  { title: "Tickets", value: "Paid" },
  { title: "Price per ticket", value: "₦3,000.00" },
  { title: "Event description", value: "Connecting devs" },
]

export const PreviewScreen: FC<PreviewScreenProps> = observer(function PreviewScreen() {
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
      <View style={styles.topContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
          <View style={styles.iconWrapper}>
            <Icon icon="backward" />
          </View>
          <Text weight="sansMd" size="md" style={styles.textColor} text="Web Developers" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {previewItems.map((preview, i) => (
          <View key={i + 1} style={styles.contentWrapper}>
            <Text weight="light" style={styles.titleText} text={preview.title} />
            <Text weight="light" size="xxs" style={styles.valueText} text={preview.value} />
          </View>
        ))}
        <View style={styles.itemWrapper}>
          <Text weight="light" style={styles.titleText} text="Event description" />
          <Text
            weight="light"
            size="xxs"
            style={styles.valueText}
            text="This event will help developers connect better"
          />
        </View>
        <View style={styles.itemWrapper}>
          <Text weight="light" style={styles.titleText} text="Event address" />
          <Text
            weight="light"
            size="xxs"
            style={styles.valueText}
            text="8, Alara street, Onike, Yaba, Lagos, Nigeria"
          />
        </View>
        <View style={styles.itemWrapper}>
          <Text weight="light" style={styles.titleText} text="Event contact details" />
          <Text
            weight="light"
            size="xxs"
            style={styles.valueText}
            text="0803 808 7096 ,  0902 934 4567"
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          onPress={() => navigation.navigate("Hangouts")}
          style={styles.button}
          preset="primary"
          text="Attend event"
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
    marginBottom: 40,
  },
  topContent: {
    paddingTop: 35,
    paddingBottom: 35,
    backgroundColor: "#fff",
    paddingHorizontal: spacing.lg,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: spacing.lg,
    paddingTop: 30,
  },

  contentWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "#6600330D",
    marginBottom: 10,
  },
  itemWrapper: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "#6600330D",
    marginBottom: 10,
  },

  titleText: {
    fontSize: 11,
    color: "#25486380",
  },
  valueText: {
    color: colors.palette.secondary50,
  },
  button: {
    flex: 1,
    marginTop: 20,
  },
  buttonWrapper: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 30,
  },
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.xxl,
  backgroundColor: "#0F0F0F1A",
  // paddingHorizontal: spacing.lg,
}
