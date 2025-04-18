import * as React from "react"
import { View, StyleSheet, Button, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, TextField } from "app/components"

export interface TypeCommentProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const TypeComment = observer(function TypeComment(props: TypeCommentProps) {
  const [comment, setComment] = React.useState<string>("")
  const [disabled, setDisabled] = React.useState<boolean>(!!comment)

  const handleChange = (comment: string) => {
    setDisabled(!!comment)
    setComment(comment)
  }

  return (
    <View style={styles.commentWrapper}>
      <View style={styles.commentContainer}>
        <TextField
          placeholder="Say your thought"
          value={comment}
          onChangeText={(text) => handleChange(text)}
          inputWrapperStyle={styles.inputStyle}
        />
        <Pressable
          style={[
            styles.buttonStyle,
            { backgroundColor: disabled ? colors.palette.primary50 : colors.palette.neutral200 },
          ]}
        >
          <Text
            style={{ color: disabled ? "#fff" : colors.text }}
            size="xxs"
            weight="semiBold"
            text="Comment"
          />
        </Pressable>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: "transparent",
    minWidth: "100%",
    padding: 10,
    paddingHorizontal: 12,
  },
  buttonStyle: {
    borderRadius: 20,
    width: 80,
    alignSelf: "flex-end",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#ccc",
    marginTop: 10,
  },

  btnTextStyle: {
    color: "#000",
  },

  inputStyle: {
    borderWidth: 0,
    borderRadius: 15,
  },

  commentWrapper: {
    borderTopWidth: 0.5,
    borderColor: colors.palette.neutral400,
  },
})
