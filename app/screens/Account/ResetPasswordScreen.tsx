import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button } from "app/components"
import { colors, spacing } from "app/theme"
const resetPassImg = require("../../../assets/images/reset-pass.png")

import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ResetPasswordScreenProps extends AppStackScreenProps<"ResetPassword"> {}

export const ResetPasswordScreen: FC<ResetPasswordScreenProps> = observer(
  function ResetPasswordScreen() {
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
          <Text weight="sansMd" size="md" style={styles.textColor} text="Reset password" />
        </TouchableOpacity>

        <Image source={resetPassImg} resizeMode="contain" />
        <Text weight="sansMd" style={styles.enterEmailText} text="Enter your email address below" />

        <View style={[styles.broTextWrapper, { gap: 5, marginBottom: 30 }]}>
          <Text weight="sansMd" size="xxs" style={styles.textColor} text="Remember password ?" />
          <TouchableOpacity onPress={() => {}}>
            <Text weight="sansMd" size="xxs" style={styles.broColor} text="Back to Login" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <TextField placeholder="Enter Email" />
        </View>

        <Button
          onPress={() => navigation.navigate("ResetPasswordCode")}
          textStyle={{ color: colors.palette.neutral100 }}
          preset="primary"
          text="Continue"
        />
      </Screen>
    )
  },
)

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

  broColor: {
    color: colors.palette.primary50,
  },

  iconContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  enterEmailText: {
    color: colors.palette.primary100,
    fontSize: 24,
    width: 200,
    marginVertical: 20,
    lineHeight: 34,
  },

  broTextWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  inputWrapper: {
    backgroundColor: "#6600331A",
    borderRadius: 20,
    padding: 15,
    marginBottom: 30,
  },
})
