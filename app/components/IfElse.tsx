import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components"

export interface IfElseProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children?: React.ReactElement | null
  elseThen?: React.ReactElement | null
  onElse?: React.ReactElement | null
  ifOn?: boolean
  ifOnElse?: boolean
}

/**
 * Describe your component here
 */
export const IfElse = observer(function IfElse({
  children = null,
  elseThen = null,
  onElse = null,
  ifOn = false,
  ifOnElse = true,
}: IfElseProps) {
  return (
    <View style={{ flex: 1 }}>
      {ifOn && <>{children}</>}
      {ifOnElse && <>{onElse}</>}

      {!ifOn && elseThen && !ifOnElse ? <>{elseThen}</> : null}
    </View>
  )
})
