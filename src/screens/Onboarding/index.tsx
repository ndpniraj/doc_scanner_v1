import { FC, JSX, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  FlatListProps,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing } from '@theme';
import OnboardingWelcome from './OnboardingWelcome';
import OnboardingAutoScan from './OnboardingAutoScan';
import OnboardingExport from './OnboardingExport';
import Button from '@common_comp/Button';
import Indicators from '@common_comp/Indicators';

interface Props {}

type ItemsChangedHandler = FlatListProps<View>['onViewableItemsChanged'];

const getOnboardingScreens = (data: JSX.Element[]) => {
  const { width, height } = Dimensions.get('screen');
  return data.map(item => {
    return <View style={{ width, height }}>{item}</View>;
  });
};

const Onboarding: FC<Props> = () => {
  const flatListRef = useRef<FlatList>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const onboardingScreens = getOnboardingScreens([
    <OnboardingWelcome />,
    <OnboardingAutoScan />,
    <OnboardingExport />,
  ]);

  const handleSkip = () => {
    flatListRef.current?.scrollToEnd();
  };

  const handleItemsChanged = useRef<ItemsChangedHandler>(info => {
    const activeSlide = info.viewableItems[0].index || 0;
    setActiveSlideIndex(activeSlide);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleSkip} style={styles.skipBtn}>
        <Text style={styles.skipBtnLabel}>SKIP</Text>
      </Pressable>

      <FlatList
        ref={flatListRef}
        data={onboardingScreens}
        renderItem={({ item }) => {
          return item;
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleItemsChanged.current}
      />

      <View style={styles.absoluteBottomContainer}>
        <Indicators
          size={15}
          gap={15}
          indicators={3}
          activeIndex={activeSlideIndex}
        />

        <Button
          onPress={() => {
            setActiveSlideIndex(
              Math.min(activeSlideIndex + 1, onboardingScreens.length - 1),
            );
          }}
          title={
            activeSlideIndex == onboardingScreens.length - 1
              ? 'Get Started'
              : 'Next'
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    // padding: Spacing.lg,
  },
  absoluteBottomContainer: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    bottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xl,
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  skipBtn: {
    zIndex: 2,
    position: 'absolute',
    top: 40,
    right: 10,
    padding: Spacing.lg,
  },
  skipBtnLabel: {
    fontSize: FontSize.body,
    textDecorationLine: 'underline',
    fontWeight: FontWeight.semibold,
    opacity: 0.5,
    color: Colors.text,
  },
});

export default Onboarding;
