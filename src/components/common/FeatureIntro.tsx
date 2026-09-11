import { FC, ReactNode } from 'react';
import { Image, ImageSource, StyleSheet, Text, View } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing } from '@theme';

export interface FeatureIntroProps {
  illustration: ImageSource;
  headers: string[];
  subHeader: string;
  children?: ReactNode;
}

const FeatureIntro: FC<FeatureIntroProps> = ({
  headers,
  illustration,
  subHeader,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={illustration}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.headerContainer}>
          {headers.map((item, index) => (
            <Text key={index} style={styles.header}>
              {item}
            </Text>
          ))}
        </View>

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>{subHeader}</Text>
        </View>

        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: Spacing.lg,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  bottomContainer: {
    flex: 1,
    gap: Spacing.md,
  },
  headerContainer: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  header: {
    fontSize: FontSize.title,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  subHeaderContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  subHeader: {
    textAlign: 'center',
    fontSize: FontSize.body,
    color: Colors.text,
    fontWeight: FontWeight.semibold,
  },
});

export default FeatureIntro;
