import React, { useEffect, useState } from "react"
import { Audio } from "expo-av"

export default function useRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>()
  const [recordingDuration, setRecordingDuration] = useState<number>(0)
  const [permissionResponse, requestPermission] = Audio.usePermissions()
  const [recordingUri, setRecordingUri] = useState<string>()

  // Function to start recording
  async function startRecording(): Promise<void> {
    try {
      if (!permissionResponse || permissionResponse.status !== "granted") {
        console.log("Requesting permission...")
        await requestPermission()
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      // Create a new recording with high-quality preset
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      )

      recording.setOnRecordingStatusUpdate(onRecordingStatusUpdate)
      recording.setProgressUpdateInterval(1000) // Updates every second

      setRecording(recording)
      console.log(recording, "just recorded a voice note")
    } catch (err) {
      console.error("Failed to start recording:", err)
    }
  }

  // Function to stop recording
  async function stopRecording(): Promise<void> {
    try {
      if (!recording) {
        return
      }

      await recording.stopAndUnloadAsync()
      setRecording(undefined)

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      })

      const uri = recording.getURI()
      if (uri) {
        setRecordingUri(uri)
      }
      console.log("Recording stopped and stored at", uri)
    } catch (err) {
      console.error("Failed to stop recording:", err)
    }
  }

  function onRecordingStatusUpdate(status: Audio.RecordingStatus) {
    if (status.isRecording) {
      setRecordingDuration(status.durationMillis || 0)
    }
  }

  return {
    startRecording,
    stopRecording,
    recording,
    recordingDuration,
    recordingUri,
  }
}
