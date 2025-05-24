"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native"

interface Props {
  script: string
  fontSize: number
  scrollSpeed: number
  isScrolling: boolean
}

const { height } = Dimensions.get("window")

export const TeleprompterView: React.FC<Props> = ({ script, fontSize, scrollSpeed, isScrolling }) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollIntervalRef = useRef<NodeJS.Timeout>()
  const currentScrollY = useRef(0)

  useEffect(() => {
    if (isScrolling) {
      startAutoScroll()
    } else {
      stopAutoScroll()
    }

    return () => stopAutoScroll()
  }, [isScrolling, scrollSpeed])

  const startAutoScroll = () => {
    stopAutoScroll() // Clear any existing interval

    scrollIntervalRef.current = setInterval(() => {
      if (scrollViewRef.current) {
        currentScrollY.current += scrollSpeed
        scrollViewRef.current.scrollTo({
          y: currentScrollY.current,
          animated: true,
        })
      }
    }, 50) // Update every 50ms for smooth scrolling
  }

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current)
      scrollIntervalRef.current = undefined
    }
  }

  const handleScroll = (event: any) => {
    currentScrollY.current = event.nativeEvent.contentOffset.y
  }

  // Split script into paragraphs for better readability
  const paragraphs = script.split("\n").filter((p) => p.trim().length > 0)

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Top padding to center first line */}
        <View style={{ height: height * 0.4 }} />

        {paragraphs.map((paragraph, index) => (
          <Text key={index} style={[styles.scriptText, { fontSize, lineHeight: fontSize * 1.4 }]}>
            {paragraph}
          </Text>
        ))}

        {/* Bottom padding to allow last line to scroll to center */}
        <View style={{ height: height * 0.4 }} />
      </ScrollView>

      {/* Center line indicator */}
      <View style={styles.centerLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  scriptText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  centerLine: {
    position: "absolute",
    top: "50%",
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: "rgba(74, 144, 226, 0.5)",
    transform: [{ translateY: -1 }],
  },
})
