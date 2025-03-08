import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import * as Progress from "react-native-progress"
// import { useStores } from "app/models"

interface EventsScreenProps extends AppStackScreenProps<"Events"> {}

const Card = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.cardContent}>
      <View style={styles.topContentContainer}>
        <Text weight="semiBold" size="xs" text="Dev Hangout 2.0" />
        <TouchableOpacity onPress={() => navigation.navigate("Preview")} style={styles.buttonStyle}>
          <Text weight="sansNormal" style={styles.btnText} text="View event" />
        </TouchableOpacity>
      </View>
      <Text weight="medium" style={styles.cardText} />
      <Progress.Bar progress={0.7} width={280} height={8} color={colors.palette.primary100} />
      <View style={styles.cardTextContainer}>
        <Text weight="medium" style={styles.availableSlot} text="150 slots available" />
        <Text weight="medium" style={styles.slotAmount} text="₦3,000.00 per slot" />
        <Text weight="medium" style={styles.availableSlot} text="40 slots left" />
      </View>
    </View>
  )
}

export const EventsScreen: FC<EventsScreenProps> = observer(function EventsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const navigation = useNavigation()

  // Pull in navigation via hook

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
      <View style={styles.mainContent}>
        <Text
          weight="light"
          size="xxs"
          style={[styles.textColor, { marginBottom: 30 }]}
          text="Below is a list of the available scheduled events"
        />

        <Card />
        <Card />
        <Card />
        <Card />
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
  btnText: {
    fontSize: 10,
    color: colors.palette.neutral100,
  },
  topContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: colors.palette.neutral100,
  },
  buttonStyle: {
    height: 24,
    width: 85,
    borderRadius: 4,
    backgroundColor: colors.palette.primary50,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 11,
    color: "#25486399",
  },
  availableSlot: {
    fontSize: 11,
    color: "#254863B2",
  },
  slotAmount: {
    fontSize: 11,
    color: colors.palette.primary50,
  },
  cardTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  topContent: {
    paddingTop: 35,
    paddingBottom: 35,
    backgroundColor: "#fff",
    paddingHorizontal: spacing.lg,
  },

  mainContent: {
    paddingTop: 30,
    paddingHorizontal: spacing.lg,
    paddingBottom: 70,
  },

  cardContent: {
    backgroundColor: colors.palette.neutral100,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.xxl,
  backgroundColor: "#0F0F0F1A",
  // paddingHorizontal: spacing.lg,
}
