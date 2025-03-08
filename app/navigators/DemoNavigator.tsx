import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import {
  HomeScreen,
  // DemoShowroomScreen,
  DemoDebugScreen,
  NetworkingScreen,
  AdventureScreen,
  ProfileScreen,
} from "../screens"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type DemoTabParamList = {
  Home: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined
  Networking: undefined
  Adventure: undefined
  Profile: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: 70 }],
        tabBarActiveTintColor: colors.palette.neutral100,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon icon="home" color={focused ? undefined : colors.tint} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Networking"
        component={NetworkingScreen}
        options={{
          // tabBarLabel: translate("demoNavigator.componentsTab"),
          tabBarLabel: "Networking",
          tabBarIcon: ({ focused }) => (
            <Icon icon="network" color={focused ? undefined : colors.tint} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Adventure"
        component={AdventureScreen}
        options={{
          tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          // tabBarLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: "Adventure",
          tabBarIcon: ({ focused }) => (
            <Icon icon="adventure" color={focused ? undefined : colors.tint} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icon icon="profile" color={focused ? undefined : colors.tint} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  // backgroundColor: colors.background,
  backgroundColor: colors.palette.primary100,
  borderRadius: 20,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}

// @demo remove-file
