import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import {
  TextInput,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native"
import {
  Button,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
  Toggle,
  ToggleProps,
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import authLogin from "app/hooks/account/use-login"
const loginImg = require("../../assets/images/login.png")
import { BROSPACE } from "app/utils/constant"
import { saveString, loadString } from "app/utils/storage"

function ControlledToggle(props: ToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Toggle {...props} value={value} onPress={() => setValue(!value)} />
}

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: {
      authEmail,
      setAuthEmail,
      setAuthToken,
      authToken,
      setRefreshToken,
      validationError,
    },
  } = useStores()
  const { navigation } = _props
  const createLogin = authLogin()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("")
    setAuthPassword("")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)
    // const formData = new FormData()
    // formData.append("email", authEmail)
    // formData.append("password", authPassword)

    const loginData = { email: authEmail, password: authPassword }

    createLogin
      .mutateAsync(loginData)
      .then((res) => {
        // setRefreshToken("")
        const accessToken =
          res?.data?.data &&
          typeof res.data.data === "object" &&
          "access" in res.data.data &&
          typeof res.data.data.access === "string"
            ? res.data.data.access
            : undefined

        setAuthToken(accessToken)
        saveString(BROSPACE.USER, accessToken as string)
        setRefreshToken(res?.data?.data?.refresh as string)
        saveString(BROSPACE.REFRESH_TOKEN, res?.data?.data?.refresh as string)
        setIsSubmitted(false)
        setAuthPassword("")
        setAuthEmail("")
      })
      .catch((error) => {
        console.log(error?.response?.data || error?.message)
      })

    if (validationError) return
    // setAuthToken(String(Date.now()))

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.

    // We'll mock this with a fake token.
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      {/* <Text testID="login-heading" tx="loginScreen.logIn" preset="heading" style={$logIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />} */}
      <Icon icon="logo" />

      <Image style={{ height: 250 }} source={loginImg} resizeMode="contain" />

      <Text
        weight="bold"
        size="xl"
        style={styles.loginText}
        text="Welcome, Login to your account"
      />

      <View style={styles.inputContainer}>
        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={styles.textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          // inputWrapperStyle={styles.textContainer}
          // labelTx="loginScreen.emailFieldLabel"
          placeholderTx="loginScreen.emailFieldPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={styles.textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholderTx="loginScreen.passwordFieldPlaceholder"
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
        />

        <View style={styles.controlWrapper}>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <ControlledToggle
              variant="checkbox"
              label="Remind me"
              // helper="This can be used for a single on/off input."
            />
            <Text weight="sansMd" size="xs" text="Remind me" />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
            {/* style={styles.forgotpassText} */}
            <Text weight="sansMd" size="xs" text="Forgot password?" />
          </TouchableOpacity>
        </View>

        <Button
          testID="login-button"
          tx="loginScreen.tapToLogIn"
          textStyle={styles.btnText}
          preset="primary"
          onPress={login}
          isLoading={createLogin.isPending}
        />

        <View style={[styles.broTextWrapper, { gap: 5 }]}>
          <Text
            weight="sansMd"
            size="xxs"
            style={styles.accountText}
            text="Already have an account ?"
          />
          <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
            <Text weight="sansMd" size="xxs" style={styles.broColor} text="Sign Up" />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const styles = StyleSheet.create({
  loginText: {
    color: colors.palette.primary100,
    width: 269,
  },

  inputContainer: {
    backgroundColor: "#6600331A",
    borderRadius: 20,
    padding: 20,
  },

  forgotpassText: {
    color: colors.palette.secondary50,
  },

  controlWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  broColor: {
    color: colors.palette.primary50,
  },

  accountText: {
    color: colors.palette.secondary50,
  },

  broTextWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  textField: {
    marginBottom: 10,
  },

  textContainer: {
    marginBottom: 20,
  },
  btnText: {
    color: colors.palette.neutral100,
  },
})

// @demo remove-file
