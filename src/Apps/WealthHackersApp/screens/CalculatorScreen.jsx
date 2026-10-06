import React, { useState, useMemo, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { GLOBAL_STYLES } from '../theme/theme';

export const formatIndianCurrency = (value) => {
  const num = Math.round(value || 0);
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Crores`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lakhs`;
  return `₹${num.toLocaleString('en-IN')}`;
};

const THUMB_SIZE = 22;

const InteractiveSlider = ({ min = 1, max = 50, value, onValueChange, suffix = '' }) => {
  const [trackWidth, setTrackWidth] = useState(260);
  const trackRef = useRef(null);
  const trackPageX = useRef(0);

  const percentage = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const maxTravel = Math.max(1, trackWidth - THUMB_SIZE);
  const thumbLeft = percentage * maxTravel;
  const activeWidth = thumbLeft + THUMB_SIZE / 2;

  const updateMeasurement = () => {
    trackRef.current?.measure((x, y, width, height, pageX) => {
      if (pageX != null && pageX > 0) {
        trackPageX.current = pageX;
      }
      if (width > 0) {
        setTrackWidth(width);
      }
    });
  };

  const handleTouch = (evt) => {
    const native = evt.nativeEvent;
    let x = 0;
    if (trackPageX.current > 0 && native.pageX != null) {
      x = native.pageX - trackPageX.current;
    } else {
      x = native.locationX;
    }

    const clampedX = Math.max(0, Math.min(maxTravel, x - THUMB_SIZE / 2));
    const ratio = clampedX / maxTravel;
    const rawVal = Math.round(min + ratio * (max - min));
    onValueChange(rawVal);
  };

  return (
    <View style={styles.sliderWrapper}>
      <View
        ref={trackRef}
        style={styles.sliderTouchArea}
        onLayout={() => updateMeasurement()}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={(evt) => {
          updateMeasurement();
          handleTouch(evt);
        }}
        onResponderMove={handleTouch}
      >
        <View style={styles.sliderTrackBackground} pointerEvents="none">
          <View style={[styles.sliderTrackActive, { width: activeWidth }]} pointerEvents="none" />
        </View>
        <View
          style={[styles.sliderThumb, { left: thumbLeft }]}
          pointerEvents="none"
        />
      </View>
      <View style={styles.sliderMinMaxRow} pointerEvents="none">
        <Text style={styles.sliderMinMaxText}>{min}{suffix}</Text>
        <Text style={styles.sliderMinMaxText}>{max}{suffix}</Text>
      </View>
    </View>
  );
};

export default function CalculatorScreen() {
  const navigation = useNavigation();
  const [calcTab, setCalcTab] = useState('sip');

  const [sipAmount, setSipAmount] = useState('5000');
  const [sipStepup, setSipStepup] = useState('0');
  const [sipYears, setSipYears] = useState(12);
  const [sipReturn, setSipReturn] = useState(8);

  const [lumpAmount, setLumpAmount] = useState('50000');
  const [lumpYears, setLumpYears] = useState(12);
  const [lumpReturn, setLumpReturn] = useState(8);

  const handleReset = () => {
    if (calcTab === 'sip') {
      setSipAmount('5000');
      setSipStepup('0');
      setSipYears(12);
      setSipReturn(8);
    } else {
      setLumpAmount('50000');
      setLumpYears(12);
      setLumpReturn(8);
    }
  };

  const results = useMemo(() => {
    let totalInvested = 0;
    let totalValue = 0;

    if (calcTab === 'sip') {
      const amount = parseFloat(sipAmount) || 0;
      const stepup = parseFloat(sipStepup) || 0;
      const years = parseInt(sipYears, 10) || 0;
      const returnRate = parseFloat(sipReturn) || 0;
      const monthlyRate = returnRate / 100 / 12;
      let currentMonthlyAmount = amount;

      for (let y = 1; y <= years; y++) {
        for (let m = 1; m <= 12; m++) {
          totalInvested += currentMonthlyAmount;
          totalValue = (totalValue + currentMonthlyAmount) * (1 + monthlyRate);
        }
        currentMonthlyAmount += stepup;
      }
    } else {
      const amount = parseFloat(lumpAmount) || 0;
      const years = parseInt(lumpYears, 10) || 0;
      const returnRate = parseFloat(lumpReturn) || 0;
      totalInvested = amount;
      totalValue = amount * Math.pow(1 + returnRate / 100, years);
    }

    const wealthGained = Math.max(0, totalValue - totalInvested);

    return {
      totalInvested,
      wealthGained,
      expectedAmount: totalValue,
    };
  }, [calcTab, sipAmount, sipStepup, sipYears, sipReturn, lumpAmount, lumpYears, lumpReturn]);

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Header with Back Button */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main'))}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Wealth Calculator</Text>
          <Text style={styles.headerSubtitle}>Plan smarter. Grow faster. Achieve more.</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Segmented Pill Tab Switcher */}
        <View style={styles.tabToggleWrapper}>
          <TouchableOpacity
            style={[styles.togglePill, calcTab === 'sip' && styles.togglePillActive]}
            onPress={() => setCalcTab('sip')}
            activeOpacity={0.8}
          >
            <Text style={[styles.togglePillText, calcTab === 'sip' && styles.togglePillTextActive]}>
              SIP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.togglePill, calcTab === 'lump' && styles.togglePillActive]}
            onPress={() => setCalcTab('lump')}
            activeOpacity={0.8}
          >
            <Text style={[styles.togglePillText, calcTab === 'lump' && styles.togglePillTextActive]}>
              LUMPSUM
            </Text>
          </TouchableOpacity>
        </View>

        {/* Inputs Card */}
        <View style={styles.calculatorCard}>
          {calcTab === 'sip' ? (
            <View>
              {/* Monthly Investment & Annual Increment Side-by-Side */}
              <View style={styles.inputRow}>
                <View style={styles.inputCol}>
                  <Text style={styles.inputFieldLabel}>Monthly Investment</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.currencyPrefix}>₹</Text>
                    <TextInput
                      style={styles.textInput}
                      value={sipAmount}
                      onChangeText={setSipAmount}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.inputCol}>
                  <Text style={styles.inputFieldLabel}>Annual Increment</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.currencyPrefix}>₹</Text>
                    <TextInput
                      style={styles.textInput}
                      value={sipStepup}
                      onChangeText={setSipStepup}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              {/* Slider 1: Investment Period */}
              <View style={styles.sliderGroup}>
                <View style={styles.sliderLabelRow}>
                  <Text style={styles.sliderLabel}>Investment Period</Text>
                  <Text style={styles.sliderValue}>{sipYears} years</Text>
                </View>
                <InteractiveSlider min={1} max={50} value={sipYears} onValueChange={setSipYears} />
              </View>

              {/* Slider 2: Expected Annual Returns */}
              <View style={styles.sliderGroup}>
                <View style={styles.sliderLabelRow}>
                  <Text style={styles.sliderLabel}>Expected Annual Returns</Text>
                  <Text style={styles.sliderValue}>{sipReturn}%</Text>
                </View>
                <InteractiveSlider min={1} max={50} value={sipReturn} onValueChange={setSipReturn} suffix="%" />
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.sliderGroup}>
                <Text style={styles.inputFieldLabel}>Total Lumpsum Investment</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.currencyPrefix}>₹</Text>
                  <TextInput
                    style={styles.textInput}
                    value={lumpAmount}
                    onChangeText={setLumpAmount}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.sliderGroup}>
                <View style={styles.sliderLabelRow}>
                  <Text style={styles.sliderLabel}>Investment Period</Text>
                  <Text style={styles.sliderValue}>{lumpYears} years</Text>
                </View>
                <InteractiveSlider min={1} max={50} value={lumpYears} onValueChange={setLumpYears} />
              </View>

              <View style={styles.sliderGroup}>
                <View style={styles.sliderLabelRow}>
                  <Text style={styles.sliderLabel}>Expected Annual Returns</Text>
                  <Text style={styles.sliderValue}>{lumpReturn}%</Text>
                </View>
                <InteractiveSlider min={1} max={50} value={lumpReturn} onValueChange={setLumpReturn} suffix="%" />
              </View>
            </View>
          )}
        </View>

        {/* Expected Maturity Value Card matching Mockup */}
        <View style={styles.resultsCardModern}>
          <View style={styles.resultHeaderRow}>
            <View>
              <Text style={styles.expectedLabelModern}>Expected Maturity Value</Text>
              <Text style={styles.expectedValueModern}>
                {formatIndianCurrency(results.expectedAmount)}
              </Text>
            </View>
            {/* Green Trending Up Graphic */}
            <View style={styles.trendingUpCircle}>
              <View style={styles.trendingArrowTail} />
              <View style={styles.trendingArrowHead} />
            </View>
          </View>

          <View style={styles.resultDivider} />

          <View style={styles.resultMetricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Invested Amount</Text>
              <Text style={styles.metricValue}>{formatIndianCurrency(results.totalInvested)}</Text>
            </View>
            <View style={styles.metricDividerVertical} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Wealth Gained</Text>
              <Text style={[styles.metricValue, { color: '#059669' }]}>
                {formatIndianCurrency(results.wealthGained)}
              </Text>
            </View>
          </View>
        </View>

        {/* Full-width Reset Button matching Mockup */}
        <TouchableOpacity
          style={styles.resetPrimaryBtn}
          onPress={handleReset}
          activeOpacity={0.85}
        >
          <Text style={styles.resetPrimaryBtnText}>Reset</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  topHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size18,
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size11,
    color: '#64748B',
    marginTop: 2,
  },
  // Segmented Pill Tab Switcher
  tabToggleWrapper: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  togglePill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  togglePillActive: {
    backgroundColor: '#0F766E',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  togglePillText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size13,
    color: '#64748B',
  },
  togglePillTextActive: {
    fontFamily: fontFamilies.bold,
    color: '#FFFFFF',
  },
  // Calculator Card
  calculatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputCol: {
    flex: 0.48,
  },
  inputFieldLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size11,
    color: '#64748B',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    height: 48,
  },
  currencyPrefix: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size15,
    color: '#0F766E',
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size15,
    color: '#0F172A',
    padding: 0,
  },
  sliderGroup: {
    marginBottom: 18,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sliderLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size13,
    color: '#334155',
  },
  sliderValue: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F172A',
  },
  sliderWrapper: {
    width: '100%',
  },
  sliderTouchArea: {
    height: 36,
    justifyContent: 'center',
    position: 'relative',
  },
  sliderTrackBackground: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  sliderTrackActive: {
    height: '100%',
    backgroundColor: '#0F766E',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    top: 7,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0F766E',
    borderWidth: 3.5,
    borderColor: '#FFFFFF',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderMinMaxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  sliderMinMaxText: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size10,
    color: '#94A3B8',
  },
  // Result Card Modern
  resultsCardModern: {
    backgroundColor: '#F0FDFA',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#CCFBF1',
    padding: 18,
    marginBottom: 20,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resultHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expectedLabelModern: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size12,
    color: '#0F766E',
  },
  expectedValueModern: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size22,
    color: '#065F46',
    marginTop: 4,
    letterSpacing: -0.5,
  },
  trendingUpCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#CCFBF1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  trendingArrowTail: {
    width: 18,
    height: 3,
    backgroundColor: '#059669',
    borderRadius: 1.5,
    transform: [{ rotate: '-45deg' }],
  },
  trendingArrowHead: {
    position: 'absolute',
    top: 13,
    right: 13,
    width: 8,
    height: 8,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#059669',
  },
  resultDivider: {
    height: 1,
    backgroundColor: '#CCFBF1',
    marginVertical: 14,
  },
  resultMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    flex: 0.48,
  },
  metricDividerVertical: {
    width: 1,
    backgroundColor: '#CCFBF1',
  },
  metricLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size11,
    color: '#64748B',
    marginBottom: 4,
  },
  metricValue: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size14,
    color: '#0F172A',
  },
  // Reset Primary Button
  resetPrimaryBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#0F766E',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  resetPrimaryBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size15,
    color: '#FFFFFF',
  },
});
