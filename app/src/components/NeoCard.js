import { useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { BLACK, BORDER_WIDTH, NEUTRAL_CARD, SHADOW_OFFSET } from '../theme';

// Shared neobrutalist primitive: a thick black border plus a hard, blur-free
// offset shadow (a solid block behind the card, not a native shadow prop —
// native shadows read soft/blurred, which is exactly what this look rejects).
// Pressable cards slide onto their own shadow on press, for a tactile
// "pushed in" feel, and call onPress on release.
export default function NeoCard({
  children,
  backgroundColor = NEUTRAL_CARD,
  borderRadius = 16,
  borderWidth = BORDER_WIDTH,
  shadowOffset = SHADOW_OFFSET,
  pressable = false,
  onPress,
  disabled = false,
  style,
  containerStyle,
}) {
  const press = useRef(new Animated.Value(0)).current;

  const animateTo = (value) => {
    Animated.timing(press, { toValue: value, duration: 90, useNativeDriver: true }).start();
  };

  const card = (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor,
          borderRadius,
          borderWidth,
          borderColor: BLACK,
          transform: [{ translateX: press }, { translateY: press }],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  const wrapper = (
    <Animated.View style={[styles.wrapper, containerStyle]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: BLACK, borderRadius, transform: [{ translateX: shadowOffset }, { translateY: shadowOffset }] },
        ]}
      />
      {card}
    </Animated.View>
  );

  if (!pressable) return wrapper;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => animateTo(shadowOffset)}
      onPressOut={() => animateTo(0)}
      disabled={disabled}
    >
      {wrapper}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  card: {
    padding: 16,
  },
});
