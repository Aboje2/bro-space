import * as React from "react"
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Text, SelectInput, TextField, Button } from "app/components"

import { AppNavigationProp } from "../navigators/AppNavigator"
const halfLogo = require("../../assets/images/half-icon.png")

export interface LoginProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Login = observer(function Login(props: LoginProps) {
  const { style } = props
  const $styles = [$container, style]

  const [genderState, setGender] = React.useState("")
  const [communityState, setCommunity] = React.useState("")
  const [locationState, setLocation] = React.useState("")
  // Pull in navigation via hook
  const navigation = useNavigation<AppNavigationProp>()
  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ]

  const community = [
    { value: "football", label: "Football" },
    { value: "business", label: "Business" },
    { value: "relationship", label: "Relationship" },
    { value: "politics", label: "Politics" },
  ]

  const location = [
    { value: "abuja", label: "Abuja" },
    { value: "lagos", label: "Lagos" },
    { value: "benue", label: "Benue" },
    { value: "kano", label: "Kano" },
  ]

  return (
    <View style={$styles}>
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

        <TextField inputWrapperStyle={styles.inputStyle} placeholder="Full name" />
        <TextField inputWrapperStyle={styles.inputStyle} placeholder="Nick name" />
        <TextField inputWrapperStyle={styles.inputStyle} placeholder="Email" />
        <View style={styles.inputStyle}>
          <SelectInput title="Gender" data={gender} value={genderState} setValue={setGender} />
        </View>
        <View style={styles.inputStyle}>
          <SelectInput
            title="Community Role"
            data={community}
            value={communityState}
            setValue={setCommunity}
          />
        </View>
        <View style={styles.inputStyle}>
          <SelectInput
            title="Location"
            data={location}
            value={locationState}
            setValue={setLocation}
          />
        </View>

        <TextField placeholder="Password" />
      </View>

      <View style={styles.endContent}>
        <Button
          // onPress={() => navigation.navigate("")}
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
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

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
