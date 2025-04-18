/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"

import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  // Welcome: undefined
  Login: undefined // @demo remove-current-line
  Welcome: NavigatorScreenParams<DemoTabParamList> // @demo remove-current-line
  Splash: undefined
  CreateAccount: undefined
  CreatePassword: undefined
  ResetPasswordCode: undefined
  ResetPassword: undefined
  Ananymous: { catId?: string }
  Category: undefined
  ChatPage: undefined
  Connections: undefined
  Wellness: { catId: string }
  PostDetail: { postId: string }
  Networking: undefined
  CreateEvents: undefined
  Events: undefined
  Hangouts: undefined
  Tickets: undefined
  Preview: undefined
  CreateForum: { forumId?: string }
  Notification: undefined
  ForumPost: { forumId: string }
  ForumPostDetail: { forumId: string; forumPostId: string }
  CategoryPostDetail: { catId: string; catPostId: string }
  CreateForumPost: { forumId: string | undefined }

  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  // @demo remove-block-start
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  const {
    BroItems: { hasOnBoarded },
  } = useStores()

  // @demo remove-block-end
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      // initialRouteName={isAuthenticated ? "Welcome" : "Login"} // @demo remove-current-line
      initialRouteName={hasOnBoarded ? "Welcome" : "Login"} // @demo remove-current-line
    >
      {/* @demo remove-block-start */}
      {isAuthenticated ? (
        <>
          {/* @demo remove-block-end */}
          {/* <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} /> */}
          {/* @demo remove-block-start */}
          <Stack.Screen name="Welcome" component={DemoNavigator} />
          <Stack.Screen name="Ananymous" component={Screens.AnanymousScreen} />
          <Stack.Screen name="ChatPage" component={Screens.ChatPageScreen} />
          <Stack.Screen name="Connections" component={Screens.ConnectionsScreen} />
          <Stack.Screen name="Wellness" component={Screens.WellnessScreen} />
          <Stack.Screen name="PostDetail" component={Screens.PostDetailScreen} />
          <Stack.Screen name="Category" component={Screens.CategoryScreen} />
          <Stack.Screen name="Networking" component={Screens.NetworkingScreen} />
          <Stack.Screen name="CreateForum" component={Screens.CreateForumScreen} />
          <Stack.Screen name="CreateEvents" component={Screens.CreateEventsScreen} />
          <Stack.Screen name="Events" component={Screens.EventsScreen} />
          <Stack.Screen name="Hangouts" component={Screens.HangoutsScreen} />
          <Stack.Screen name="Tickets" component={Screens.TicketsScreen} />
          <Stack.Screen name="Preview" component={Screens.PreviewScreen} />
          <Stack.Screen name="ForumPost" component={Screens.ForumPostScreen} />
          <Stack.Screen name="ForumPostDetail" component={Screens.ForumPostDetailScreen} />
          <Stack.Screen name="CategoryPostDetail" component={Screens.CategoryPostDetailScreen} />
          <Stack.Screen name="CreateForumPost" component={Screens.CreateForumPostScreen} />

          <Stack.Screen name="Notification" component={Screens.NotificationScreen} />
        </>
      ) : (
        <>
          <>
            <Stack.Screen name="CreateAccount" component={Screens.CreateAccountScreen} />
            <Stack.Screen name="Splash" component={Screens.SplashScreen} />
            <Stack.Screen name="CreatePassword" component={Screens.CreatePasswordScreen} />
            <Stack.Screen name="ResetPasswordCode" component={Screens.ResetPasswordCodeScreen} />
            <Stack.Screen name="ResetPassword" component={Screens.ResetPasswordScreen} />
            <Stack.Screen name="Login" component={Screens.LoginScreen} />
          </>
        </>
      )}
      {/* @demo remove-block-end */}
      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
