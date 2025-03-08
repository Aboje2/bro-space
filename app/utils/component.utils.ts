export const formatErrors = (error: Record<string, string[]>, message: string) => {
  if (!error) return message ?? "Request error"
  const keys = Object.keys(error)
  if (keys.length === 0) return message
  const errorText = keys?.map((err) => error[err])
  return errorText.join(". ")
}
