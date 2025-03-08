import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, Image, ViewStyle, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button, FailedModal, SuccessModal } from "app/components"
import { colors, spacing } from "app/theme"
const newPass = require("../../../assets/images/new-pass.png")
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CreatePasswordScreenProps extends AppStackScreenProps<"CreatePassword"> {}

export const CreatePasswordScreen: FC<CreatePasswordScreenProps> = observer(
  function CreatePasswordScreen() {
    const [openFailed, setOpenFailed] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
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

        <Image source={newPass} resizeMode="contain" />

        <Text
          weight="sansMd"
          size="lg"
          style={[styles.textColor, { marginBottom: 20 }]}
          text="Create new password"
        />

        <View style={styles.inputContainer}>
          <TextField inputWrapperStyle={styles.inputStyle} placeholder="New Password" />
          <TextField placeholder="Confirm Passowrd" />
        </View>

        <Button
          onPress={() => setOpenFailed(true)}
          preset="primary"
          text="Done"
          textStyle={{ color: colors.palette.neutral100 }}
        />

        <SuccessModal
          openSuccessModal={openSuccessModal}
          setOpenSuccessModal={setOpenSuccessModal}
        />

        <FailedModal openFailed={openFailed} setOpenFailed={setOpenFailed} />
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
  iconContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  textColor: {
    color: colors.palette.primary100,
  },

  inputContainer: {
    backgroundColor: "#6600331A",
    padding: 15,
    borderRadius: 20,
    marginBottom: 30,
  },
  inputStyle: {
    marginBottom: 10,
  },
})
