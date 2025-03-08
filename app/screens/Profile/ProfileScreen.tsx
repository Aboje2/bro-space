import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, Image } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Button, SelectInput, Icon } from "app/components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { colors, spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
const myPics = require("../../../assets/images/profile.png")

interface ProfileScreenProps extends DemoTabScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const {
    authenticationStore: { logout },
  } = useStores()
  const [userName, setUserName] = useState("")
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      <View style={styles.topContent}>
        <Text weight="semiBold" size="lg" style={styles.textColor} text="Profile" />
        <Icon icon="bell" />
      </View>

      <View style={styles.imageWrapper}>
        <Image source={myPics} style={{ marginTop: -40 }} resizeMode="contain" />
      </View>

      <View style={styles.mainContent}>
        <View>
          <SelectInput
            value={userName}
            setValue={setUserName}
            title="Username/Nickname"
            data={[{ value: "adeyemi", label: "Adeyemi Tems" }]}
          />
        </View>

        <View>
          <SelectInput
            value={userName}
            setValue={setUserName}
            title="Email"
            data={[{ value: "adeyemi", label: "adeyemiTems@gmail.com" }]}
          />
        </View>

        <View>
          <SelectInput
            value={userName}
            setValue={setUserName}
            title="Date of birth"
            data={[{ value: "adeyemi", label: "1996" }]}
          />
        </View>

        <View>
          <SelectInput
            value={userName}
            setValue={setUserName}
            title="Gender"
            data={[
              { value: "adeyemi", label: "Male" },
              { value: "adeyemi", label: "Female" },
            ]}
          />
        </View>

        <View>
          <SelectInput
            value={userName}
            setValue={setUserName}
            title="Password"
            data={[{ value: "adeyemi", label: "beatable#343" }]}
          />
        </View>

        <View>
          <SelectInput
            value={userName}
            setValue={setUserName}
            title="Marital status"
            data={[
              { value: "adeyemi", label: "Married" },
              { value: "adeyemi", label: "Single" },
              { value: "adeyemi", label: "Divorced" },
            ]}
          />
        </View>

        <View>
          <SelectInput
            value={userName}
            setValue={setUserName}
            title="Community Role"
            data={[
              { value: "adeyemi", label: "Web master" },
              { value: "adeyemi", label: "Footballbabbb" },
            ]}
          />
        </View>

        <View style={styles.logoutWrapper}>
          <Text weight="medium" size="sm" style={styles.logoutText} text="Logout" />
          <Icon onPress={() => logout()} size={40} icon="logout" />
        </View>

        <Button
          preset="primary"
          style={styles.btnStyle}
          textStyle={{ color: "#fff" }}
          text="Save changes"
        />
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  textColor: {
    color: colors.palette.primary100,
  },
  topContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 20,
  },
  imageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#0F0F0F1A",
  },
  mainContent: {
    backgroundColor: "#0F0F0F1A",
    paddingHorizontal: spacing.lg,
    paddingBottom: 50,
  },
  btnStyle: {
    marginTop: 20,
  },
  logoutWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoutText: {
    color: "#904e4e",
  },
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.xxl,

  backgroundColor: "#0F0F0F1A",
}
