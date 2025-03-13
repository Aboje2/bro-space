import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, SelectInput, Button } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HangoutsScreenProps extends AppStackScreenProps<"Hangouts"> {}

export const HangoutsScreen: FC<HangoutsScreenProps> = observer(function HangoutsScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const [paymentMethod, setPaymentMethod] = useState("")
  const { navigation } = _props
  const payment = [
    { value: "cash", label: "Cash" },
    { value: "Transfer", label: "Transfer" },
    { value: "card", label: "Debit card" },
  ]
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
          <Text weight="sansMd" size="md" style={styles.textColor} text="Dev Hangout 2.0" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <Text
          weight="light"
          style={styles.hangoutText}
          text="Please fill in the form below to attend this event."
        />

        <TextField inputWrapperStyle={styles.inputStyle} placeholder="Full name" />
        <TextField inputWrapperStyle={styles.inputStyle} placeholder="Phone number" />
        <SelectInput
          data={payment}
          title="Payment Method"
          value={paymentMethod}
          setValue={setPaymentMethod}
        />

        <Button
          preset="primary"
          style={styles.btnStyle}
          textStyle={{ color: "#fff" }}
          text="Register"
          onPress={() => navigation.navigate("Tickets")}
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
  hangoutText: {
    fontSize: 13,
    color: colors.palette.primary100,
    marginBottom: 20,
  },

  topContent: {
    backgroundColor: colors.palette.neutral100,
    paddingHorizontal: spacing.lg,
    paddingTop: 50,
    paddingBottom: 80,
  },
  mainContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: 30,
    paddingBottom: 230,
  },

  inputStyle: {
    backgroundColor: "transparent",
    marginBottom: 20,
  },
  btnStyle: {
    marginTop: 30,
  },
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.xxl,
  backgroundColor: "#0F0F0F1A",
  // paddingHorizontal: spacing.lg,
}
