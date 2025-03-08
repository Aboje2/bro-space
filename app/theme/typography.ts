// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
// import {
//   // SpaceGrotesk_300Light as spaceGroteskLight,
//   SpaceGrotesk_400Regular as spaceGroteskRegular,
//   SpaceGrotesk_500Medium as spaceGroteskMedium,
//   SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
//   SpaceGrotesk_700Bold as spaceGroteskBold,
// } from "@expo-google-fonts/space-grotesk"
import { Sora_700Bold } from "@expo-google-fonts/sora"
import { DMSans_700Bold, DMSans_500Medium, DMSans_400Regular } from "@expo-google-fonts/dm-sans"
import { Mulish_400Regular, Mulish_500Medium, Mulish_300Light } from "@expo-google-fonts/mulish"

export const customFontsToLoad = {
  Mulish_300Light,
  Mulish_400Regular,
  Mulish_500Medium,
  DMSans_700Bold,
  Sora_700Bold,
  DMSans_500Medium,
  DMSans_400Regular,
}

const fonts = {
  family: {
    // Cross-platform Google font.
    light: "Mulish_300Light",
    normal: "Mulish_400Regular",
    sansNormal: "DMSans_400Regular",
    medium: "Mulish_500Medium",
    sansMd: "DMSans_500Medium",
    semiBold: "DMSans_700Bold",
    bold: "Sora_700Bold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.family,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
