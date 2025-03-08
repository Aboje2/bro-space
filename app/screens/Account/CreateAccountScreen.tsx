import React, { FC, useState, ComponentType, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, StyleSheet, Image, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import useCreateAccount from "app/hooks/account/use-create-account"

import {
  Screen,
  Text,
  TextField,
  SelectInput,
  Button,
  Icon,
  TextFieldAccessoryProps,
} from "app/components"
import { colors, spacing } from "app/theme"
const halfLogo = require("../../../assets/images/half-icon.png")
import { useStores } from "app/models"
import { BROSPACE } from "app/utils/constant"
import { saveString } from "app/utils/storage"

interface CreateAccountScreenProps extends AppStackScreenProps<"CreateAccount"> {}

export const CreateAccountScreen: FC<CreateAccountScreenProps> = observer(
  function CreateAccountScreen(_props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const [genderState, setGender] = useState("")
    // const [communityState, setCommunity] = useState("")
    const [locationState, setLocation] = useState("")
    const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
    const { navigation } = _props
    const [loginData, setLoginData] = useState({
      full_name: "",
      password: "",
      username: "",
      phone_number: "",
    })
    const {
      authenticationStore: {
        authEmail,
        setAuthEmail,
        setAuthToken,
        setRefreshToken,
        validationError,
      },
    } = useStores()

    const accountCreated = useCreateAccount()
    // Pull in navigation via hook

    const gender = [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
    ]

    // const community = [
    //   { value: "football", label: "Football" },
    //   { value: "business", label: "Business" },
    //   { value: "relationship", label: "Relationship" },
    //   { value: "politics", label: "Politics" },
    // ]

    const location = [
      { value: "abuja", label: "Abuja" },
      { value: "lagos", label: "Lagos" },
      { value: "benue", label: "Benue" },
      { value: "kano", label: "Kano" },
    ]

    function handleChange(field: string, value: string) {
      setLoginData({ ...loginData, [field]: value })
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

    const createAccount = () => {
      const data = { ...loginData, email: authEmail, gender: genderState, location: locationState }
      console.log(data)

      accountCreated
        .mutateAsync(data)
        .then((result) => {
          // setAuthToken(result?.data?.data?.refresh.access as string)
          // setRefreshToken(result?.data?.data?.tokens.access as string)
          setAuthToken(Date().toString())
        })
        .catch((err) => {
          console.log(err.response?.data || err.message, "axios error") // Show full error message
        })
    }

    return (
      <Screen
        safeAreaEdges={["top", "bottom"]}
        preset="scroll"
        contentContainerStyle={$screenContentContainer}
      >
        <View style={styles.topContentContainer}>
          <View style={[styles.broTextWrapper, { marginLeft: 24 }]}>
            <Text weight="bold" style={styles.broTextStyle} text="Bro" />
            <Text weight="bold" style={styles.spaceTextStyle} text="Space" />
          </View>

          <View style={styles.imgStyleWrapper}>
            <Image source={halfLogo} resizeMode="contain" style={styles.imageStyle} />
          </View>

          <Text
            weight="sansMd"
            size="xl"
            style={{ color: colors.palette.primary100, marginLeft: 24 }}
            text="Lets get started..."
          />

          <View style={styles.broTextWrapper}>
            <Text
              weight="sansNormal"
              size="xs"
              style={styles.accountText}
              text="Create an account now to explore the limitless benefits of"
            />
            <Text weight="sansNormal" size="xs" style={styles.broColor} text="BroSpace" />
          </View>
        </View>

        <View style={styles.bottomContentContainer}>
          <Text
            weight="sansNormal"
            style={styles.fillTextStyle}
            text="Please fill in the following details appropriately to create your unique account."
          />

          <TextField
            inputWrapperStyle={styles.inputStyle}
            placeholder="Name"
            value={loginData.full_name}
            onChangeText={(text) => handleChange("full_name", text)}
          />
          <TextField
            inputWrapperStyle={styles.inputStyle}
            placeholder="Username"
            value={loginData.username}
            onChangeText={(text) => handleChange("username", text)}
          />
          <TextField
            inputWrapperStyle={styles.inputStyle}
            placeholder="Email"
            value={authEmail}
            onChangeText={setAuthEmail}
            autoCapitalize="none"
            autoComplete="email"
          />

          <TextField
            inputWrapperStyle={styles.inputStyle}
            placeholder="Phone number"
            value={loginData.phone_number}
            onChangeText={(text) => handleChange("phone_number", text)}
            autoCapitalize="none"
          />
          <View style={styles.inputStyle}>
            <SelectInput title="Gender" data={gender} value={genderState} setValue={setGender} />
          </View>
          {/* <View style={styles.inputStyle}>
            <SelectInput
              title="Community Role"
              data={community}
              value={communityState}
              setValue={setCommunity}
            />
          </View> */}
          <View style={styles.inputStyle}>
            <SelectInput
              title="Location"
              data={location}
              value={locationState}
              setValue={setLocation}
            />
          </View>

          <TextField
            placeholder="Password"
            value={loginData.password}
            onChangeText={(text) => handleChange("password", text)}
            RightAccessory={PasswordRightAccessory}
            secureTextEntry={isAuthPasswordHidden}
            autoCapitalize="none"
            autoComplete="password"
          />
        </View>

        <View style={styles.endContent}>
          <Button
            onPress={createAccount}
            preset="primary"
            textStyle={{ color: colors.palette.neutral100 }}
            text="Create account"
          />

          <View style={[styles.broTextWrapper, { gap: 5, marginTop: 10 }]}>
            <Text
              weight="sansMd"
              size="xxs"
              style={styles.accountText}
              text="Already have an account ?"
            />
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text weight="sansMd" size="xxs" style={styles.loginText} text="Log in" />
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    )
  },
)

const styles = StyleSheet.create({
  broTextStyle: {
    fontSize: 22,
    color: colors.palette.primary50,
  },

  spaceTextStyle: {
    fontSize: 22,
    color: colors.palette.secondary50,
  },

  broColor: {
    color: colors.palette.primary50,
    marginLeft: -68,
  },
  loginText: {
    color: colors.palette.primary50,
  },

  accountText: {
    color: colors.palette.secondary50,
  },

  broTextWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    width: 280,
    paddingHorizontal: spacing.lg,
  },
  imgStyleWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  topContentContainer: {
    marginBottom: 20,
  },

  bottomContentContainer: {
    backgroundColor: "#9F9F9F1C",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  fillTextStyle: {
    color: "#254863B2",
    fontSize: 13,
    marginBottom: 10,
  },

  inputStyle: {
    marginBottom: 10,
  },

  imageStyle: {
    height: 200,
  },
  endContent: {
    paddingHorizontal: 24,
  },
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  // paddingHorizontal: spacing.lg,
}
