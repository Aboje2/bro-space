import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
// import { useStores } from "app/models"

interface TicketsScreenProps extends AppStackScreenProps<"Tickets"> {}

export const TicketsScreen: FC<TicketsScreenProps> = observer(function TicketsScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const ticketValue = [
    { title: "Ticket ID", value: "TD23478DGYTS" },
    { title: "Event name", value: "Dev Hangout 2.0" },
    { title: "Full name", value: "Adaramewa Tomisin" },
    { title: "Amount paid", value: "₦3,000.00" },
    { title: "Phone number", value: "0803 808 7096" },
    { title: "Seat number", value: "0217" },
  ]
  const { navigation } = _props
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      <View style={styles.topContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.iconWrapper}>
            <Icon icon="backward" />
          </View>
        </TouchableOpacity>

        <Text weight="sansMd" size="sm" style={styles.thankYou} text="Thank you" />
        <Text
          weight="light"
          size="xxs"
          style={styles.thankYou}
          text="Here is a copy of your ticket to be presented at the venue."
        />
      </View>

      <View style={styles.mainContent}>
        <View>
          {ticketValue.map((item, i) => (
            <View
              key={i + 1}
              style={[
                styles.textWrapper,
                { backgroundColor: i % 2 !== 0 ? "#EEEEEE" : "#FFFFFF1A" },
              ]}
            >
              <Text weight="normal" style={styles.titleText} text={item.title} />
              <Text weight="normal" style={styles.valueText} text={item.value} />
            </View>
          ))}
        </View>
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
    marginBottom: 30,
  },

  thankYou: {
    color: colors.palette.primary50,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 11,
    color: "#254863B2",
  },

  valueText: {
    fontSize: 13,
    color: "#12030A",
  },

  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  topContent: {
    backgroundColor: "#0F0F0F1A",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  mainContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 30,
  },
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.xxl,
  // paddingHorizontal: spacing.lg,
}
