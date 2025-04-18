import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper = (WrapperProps?.onPress ? TouchableOpacity : View) as ComponentType<
    TouchableOpacityProps | ViewProps
  >

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    color !== undefined && { tintColor: color },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </Wrapper>
  )
}

export const iconRegistry = {
  back: require("../../assets/icons/back.png"),
  bell: require("../../assets/icons/bell.png"),
  caretLeft: require("../../assets/icons/caretLeft.png"),
  caretRight: require("../../assets/icons/caretRight.png"),
  check: require("../../assets/icons/check.png"),
  clap: require("../../assets/icons/demo/clap.png"), // @demo remove-current-line
  community: require("../../assets/icons/demo/community.png"), // @demo remove-current-line
  components: require("../../assets/icons/demo/components.png"), // @demo remove-current-line
  debug: require("../../assets/icons/demo/debug.png"), // @demo remove-current-line
  github: require("../../assets/icons/demo/github.png"), // @demo remove-current-line
  // heart: require("../../assets/icons/demo/heart.png"), // @demo remove-current-line
  hidden: require("../../assets/icons/hidden.png"),
  ladybug: require("../../assets/icons/ladybug.png"),
  lock: require("../../assets/icons/lock.png"),
  menu: require("../../assets/icons/menu.png"),
  more: require("../../assets/icons/more.png"),
  pin: require("../../assets/icons/demo/pin.png"), // @demo remove-current-line
  podcast: require("../../assets/icons/demo/podcast.png"), // @demo remove-current-line
  settings: require("../../assets/icons/settings.png"),
  slack: require("../../assets/icons/demo/slack.png"), // @demo remove-current-line
  view: require("../../assets/icons/view.png"),
  x: require("../../assets/icons/x.png"),
  forward: require("../../assets/icons/forward.png"),
  backward: require("../../assets/icons/backward.png"),
  downward: require("../../assets/icons/downward.png"),
  notification: require("../../assets/icons/notification.png"),
  message: require("../../assets/icons/message.png"),
  mail: require("../../assets/icons/mail.png"),
  heart: require("../../assets/icons/heart.png"),
  redHeart: require("../../assets/icons/red-hrt.png"),
  success: require("../../assets/icons/success-icon.png"),
  info: require("../../assets/icons/info-icon.png"),
  logo: require("../../assets/icons/logo.png"),
  sad: require("../../assets/icons/sad-face.png"),
  add: require("../../assets/icons/add.png"),
  microphone: require("../../assets/icons/microphone.png"),
  sendMsg: require("../../assets/icons/chat-icon.png"),
  share: require("../../assets/icons/share-icon.png"),
  home: require("../../assets/icons/home.png"),
  search: require("../../assets/icons/search.png"),
  profile: require("../../assets/icons/profile.png"),
  adventure: require("../../assets/icons/adventure.png"),
  network: require("../../assets/icons/network.png"),
  logout: require("../../assets/icons/logout.png"),
  recorder: require("../../assets/icons/recorder.png"),
  play: require("../../assets/icons/play.png"),
  calendar: require("../../assets/icons/calendar.png"),
  clock: require("../../assets/icons/clock.png"),
  addNew: require("../../assets/icons/add-icon.png"),
  not_menu: require("../../assets/icons/more-menu.png"),
  mouse: require("../../assets/icons/mouse.png"),
  dislike: require("../../assets/icons/dislike.png"),
  empty: require("../../assets/icons/empty.png"),
  pinned: require("../../assets/icons/pin.png"),
}

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
}
