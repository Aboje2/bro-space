import React, { FC, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, TextInput, TouchableOpacity, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ResetPasswordCodeScreenProps extends AppStackScreenProps<"ResetPasswordCode"> {}

export const ResetPasswordCodeScreen: FC<ResetPasswordCodeScreenProps> = observer(
  function ResetPasswordCodeScreen(_props) {
    const [otp, setOtp] = useState(["", "", "", ""])
    const [resendOtp, setResendOtp] = useState(false)
    const inputRef = useRef<TextInput[]>([])
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const { navigation } = _props

    const handleChange = (value: string, index: number) => {
      console.log(value, "new index " + index)
      console.log(otp)
      let newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value.length === 1 && index < inputRef.current.length - 1) {
        inputRef.current[index + 1].focus()
      }
    }

    const handleBackspace = (index: number) => {
      // console.log("otp index: ", otp[index])
      if (index > 0 && otp[index] === "") {
        console.log("is working")
        inputRef.current[index - 1].focus()
      }
    }
    return (
      <Screen
        preset="scroll"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
          <View style={styles.iconWrapper}>
            <Icon icon="backward" />
          </View>
          <Text weight="sansMd" size="md" style={styles.textColor} text="Reset password" />
        </TouchableOpacity>

        <Text
          weight="sansMd"
          size="lg"
          style={[styles.textColor, { marginBottom: 20, textAlign: "center" }]}
          text="Enter code sent to your email"
        />

        {/* <View style={styles.resendTextWrapper}>
          <Text
            style={{ color: "#333" }}
            weight="normal"
            size="sm"
            text="Didn’t get verification code?"
          />
          <TouchableOpacity onPress={() => setResendOtp(true)}>
            <Text style={styles.resendText} weight="normal" size="sm" text="Resend" />
          </TouchableOpacity>
        </View> */}

        <View style={styles.inputWrapper}>
          {otp.map((text, index) => (
            <TextField
              key={index + "01"}
              value={text}
              onChangeText={(value) => handleChange(value, index)}
              style={styles.input}
              maxLength={1}
              keyboardType="numeric"
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index)
                }
              }}
              ref={(TextField) => {
                if (TextField) {
                  inputRef.current[index] = TextField
                }
              }}
              containerStyle={styles.inputContainer}
              inputWrapperStyle={styles.textWrap}
            />
          ))}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("CreatePassword")}>
          <View style={styles.resendWrapper}>
            <Text size="xxs" text="I didn’t receive a code (0:09)" />
          </View>
        </TouchableOpacity>
      </Screen>
    )
  },
)

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
    marginBottom: 30,
  },
  enterEmailText: {
    color: colors.palette.primary100,
    fontSize: 26,
    width: 180,
  },
  resendText: {
    color: "#333",
    textDecorationColor: "underLine",
    marginLeft: 5,
  },

  resendTextWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  firstTextStyle: {
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },

  inputWrapper: {
    flexDirection: "row",

    justifyContent: "center",
    gap: 8,
    marginBottom: 30,
  },

  input: {
    textAlign: "center",
    fontSize: 18,
    flex: 1,
  },
  textWrap: {
    width: 40,
    height: 40,
  },
  inputContainer: {
    width: 40,
    height: 40,
  },

  resendWrapper: {
    backgroundColor: "#25486326",
    paddingVertical: 10,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
