import React, { useEffect, useRef, useState, memo } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Period, TABS } from './ReportAnalyticsType';

interface Props {
  value: Period;
  onChange: (p: Period) => void;
}

const DurationTab: React.FC<Props> = ({ value, onChange }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [containerWidth, setContainerWidth] = useState(0);
  const horizontalPadding = 4;
  const tabWidth =
    containerWidth > 0 ? (containerWidth - horizontalPadding * 2) / TABS.length : 0;

  const translateX = useRef(new Animated.Value(0)).current;

  const indexFor = (p: Period) => Math.max(0, TABS.indexOf(p));
  const selectedIndex = indexFor(value);

  const onContainerLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  useEffect(() => {
    if (tabWidth <= 0) return;
    Animated.timing(translateX, {
      toValue: selectedIndex * tabWidth,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex, tabWidth, translateX]);

  return (
    <View style={styles.tabContainer} onLayout={onContainerLayout}>
      {tabWidth > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.tabIndicator,
            {
              width: tabWidth,
              transform: [{ translateX }],
              backgroundColor: colors.primary,
            },
          ]}
        />
      )}

      {TABS.map((p) => {
        const active = value === p;
        return (
          <TouchableOpacity
            key={p}
            style={[styles.tab, { width: tabWidth || undefined }]}
            onPress={() => onChange(p)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.tabText, active && styles.tabTextActive]}>{p}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(DurationTab);

const getStyles = (colors: any) =>
  StyleSheet.create({
    tabContainer: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
      marginHorizontal: 16,
      padding: 4,
      borderRadius: 999,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.outline,
      overflow: 'hidden',
    },
    tabIndicator: {
      position: 'absolute',
      top: 4,
      bottom: 4,
      left: 4,
      borderRadius: 999,
    },
    tab: {
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.onSurface,
    },
    tabTextActive: {
      color: colors.onPrimary,
      fontWeight: '700',
    },
  });
