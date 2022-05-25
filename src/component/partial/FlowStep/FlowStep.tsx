import React from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {colors, spacing} from '/theme';
import {Icon, Text} from '/component/base';

export type FlowStepProps = {
  navigation: NativeStackNavigationProp<any>;
  /**
   * Title to appear at the top of the modal beside the back button.
   */
  title?: string;
  /**
   * Whether to ensure the modal content is within the safe area by using a
   * SafeAreaView where needed.
   *
   * @default false
   */
  safeArea?: boolean;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    flex: 1,
  },
  inner: {
    marginTop: 24,
    marginHorizontal: spacing.gutter,
  },
  backButton: {
    position: 'absolute',
    left: -10,
    top: -10,
    padding: 10,
  },
  title: {
    marginHorizontal: 32,
    marginBottom: 24,
  },
});

const FlowStep: React.FC<FlowStepProps> = ({
  navigation,
  title,
  safeArea = false,
  style,
  children,
}) => {
  const Container = safeArea ? SafeAreaView : View;

  return (
    <Container style={styles.container}>
      <View style={[styles.inner, style]}>
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityLabel="Close modal"
          style={styles.backButton}>
          <Icon
            accessibilityElementsHidden
            svg={require('/asset/svg/back.svg')}
            width={24}
            height={24}
          />
        </Pressable>
        {!!title && (
          <Text variant="base" textAlign="center" style={styles.title}>
            {title}
          </Text>
        )}
        {children}
      </View>
    </Container>
  );
};

export default FlowStep;
