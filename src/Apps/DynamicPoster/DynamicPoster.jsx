import React, { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Download,
  ImagePlus,
  Languages,
  Palette,
  Share2,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
} from 'lucide-react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { launchImageLibrary } from 'react-native-image-picker';
import { captureRef } from 'react-native-view-shot';

const festivals = [
  {
    id: 'ganesh',
    name: 'Ganesh Chaturthi',
    accent: '#f97316',
    glow: '#fde68a',
    symbol: 'ॐ',
    colors: ['#f97316', '#fbbf24', '#f43f5e'],
    greetings: {
      English: 'Happy Ganesh Chaturthi',
      Hindi: 'गणेश चतुर्थी की हार्दिक शुभकामनाएं',
    },
  },
  {
    id: 'independence',
    name: 'Independence Day',
    accent: '#22c55e',
    glow: '#ffedd5',
    symbol: '✦',
    colors: ['#f97316', '#ffffff', '#22c55e'],
    greetings: {
      English: 'Happy Independence Day',
      Hindi: 'स्वतंत्रता दिवस की शुभकामनाएं',
    },
  },
  {
    id: 'ram-navami',
    name: 'Ram Navami',
    accent: '#eab308',
    glow: '#fed7aa',
    symbol: 'श्री',
    colors: ['#facc15', '#fb923c', '#ef4444'],
    greetings: {
      English: 'Happy Ram Navami',
      Hindi: 'राम नवमी की हार्दिक शुभकामनाएं',
    },
  },
  {
    id: 'guru-nanak',
    name: 'Guru Nanak Jayanti',
    accent: '#38bdf8',
    glow: '#bfdbfe',
    symbol: 'ੴ',
    colors: ['#38bdf8', '#6366f1', '#facc15'],
    greetings: {
      English: 'Happy Guru Nanak Jayanti',
      Hindi: 'गुरु नानक जयंती की शुभकामनाएं',
    },
  },
  {
    id: 'diwali',
    name: 'Diwali',
    accent: '#d946ef',
    glow: '#fef3c7',
    symbol: '✺',
    colors: ['#c026d3', '#7c3aed', '#f59e0b'],
    greetings: {
      English: 'Happy Diwali',
      Hindi: 'दीपावली की हार्दिक शुभकामनाएं',
    },
  },
  {
    id: 'holi',
    name: 'Holi',
    accent: '#ec4899',
    glow: '#fbcfe8',
    symbol: '✽',
    colors: ['#ec4899', '#fde047', '#22d3ee'],
    greetings: {
      English: 'Happy Holi',
      Hindi: 'होली की हार्दिक शुभकामनाएं',
    },
  },
  {
    id: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    accent: '#ef4444',
    glow: '#fecaca',
    symbol: '❋',
    colors: ['#f43f5e', '#ef4444', '#fcd34d'],
    greetings: {
      English: 'Happy Raksha Bandhan',
      Hindi: 'रक्षाबंधन की हार्दिक शुभकामनाएं',
    },
  },
  {
    id: 'janmashtami',
    name: 'Janmashtami',
    accent: '#2563eb',
    glow: '#bfdbfe',
    symbol: '♬',
    colors: ['#1d4ed8', '#22d3ee', '#fde047'],
    greetings: {
      English: 'Happy Janmashtami',
      Hindi: 'जन्माष्टमी की हार्दिक शुभकामनाएं',
    },
  },
  {
    id: 'navratri',
    name: 'Navratri',
    accent: '#a855f7',
    glow: '#e9d5ff',
    symbol: '✧',
    colors: ['#7c3aed', '#d946ef', '#fb923c'],
    greetings: {
      English: 'Happy Navratri',
      Hindi: 'नवरात्रि की हार्दिक शुभकामनाएं',
    },
  },
  {
    id: 'eid',
    name: 'Eid',
    accent: '#14b8a6',
    glow: '#ccfbf1',
    symbol: '☾',
    colors: ['#047857', '#14b8a6', '#fde68a'],
    greetings: {
      English: 'Eid Mubarak',
      Hindi: 'ईद मुबारक',
    },
  },
  {
    id: 'christmas',
    name: 'Christmas',
    accent: '#dc2626',
    glow: '#dcfce7',
    symbol: '✶',
    colors: ['#b91c1c', '#059669', '#ffffff'],
    greetings: {
      English: 'Merry Christmas',
      Hindi: 'क्रिसमस की शुभकामनाएं',
    },
  },
  {
    id: 'new-year',
    name: 'New Year',
    accent: '#f59e0b',
    glow: '#fef3c7',
    symbol: '✦',
    colors: ['#020617', '#4338ca', '#f59e0b'],
    greetings: {
      English: 'Happy New Year',
      Hindi: 'नव वर्ष की हार्दिक शुभकामनाएं',
    },
  },
  {
    id: 'makar-sankranti',
    name: 'Makar Sankranti',
    accent: '#0ea5e9',
    glow: '#bae6fd',
    symbol: '⬁',
    colors: ['#38bdf8', '#67e8f9', '#fdba74'],
    greetings: {
      English: 'Happy Makar Sankranti',
      Hindi: 'मकर संक्रांति की शुभकामनाएं',
    },
  },
];

const languages = ['English', 'Hindi'];

const posterFormats = [
  { id: 'story', label: 'Story', size: '1080 x 1920', ratio: 1080 / 1920 },
  { id: 'post', label: 'Portrait', size: '1080 x 1350', ratio: 1080 / 1350 },
  { id: 'square', label: 'Square', size: '1080 x 1080', ratio: 1 },
];

const nameStyles = [
  { id: 'classic', label: 'Classic', fontFamily: undefined, fontWeight: '900' },
  { id: 'royal', label: 'Royal', fontFamily: 'serif', fontWeight: '900' },
  { id: 'clean', label: 'Clean', fontFamily: undefined, fontWeight: '800' },
];

const avatarPositions = [
  { id: 'top', label: 'Top', translateY: -10 },
  { id: 'center', label: 'Center', translateY: 0 },
  { id: 'low', label: 'Low', translateY: 10 },
];

export default function DynamicPoster() {
  const posterRef = useRef(null);
  const { width: windowWidth } = useWindowDimensions();
  const [selectedFestivalId, setSelectedFestivalId] = useState(festivals[0].id);
  const [language, setLanguage] = useState('English');
  const [fullName, setFullName] = useState('');
  const [greeting, setGreeting] = useState(festivals[0].greetings.English);
  const [profileImage, setProfileImage] = useState('');
  const [avatarZoom, setAvatarZoom] = useState(1.08);
  const [avatarPositionId, setAvatarPositionId] = useState('center');
  const [formatId, setFormatId] = useState('story');
  const [nameStyleId, setNameStyleId] = useState('classic');
  const [showSparkles, setShowSparkles] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const selectedFestival = useMemo(
    () => festivals.find(festival => festival.id === selectedFestivalId) || festivals[0],
    [selectedFestivalId],
  );
  const selectedFormat = posterFormats.find(format => format.id === formatId) || posterFormats[0];
  const selectedNameStyle = nameStyles.find(style => style.id === nameStyleId) || nameStyles[0];
  const avatarPosition = avatarPositions.find(position => position.id === avatarPositionId) || avatarPositions[1];
  const isCompact = windowWidth < 430;
  const screenPadding = isCompact ? 12 : 16;
  const previewMaxWidth = selectedFormat.id === 'story' ? 252 : 312;
  const posterWidth = Math.min(windowWidth - screenPadding * 2 - 42, previewMaxWidth);
  const posterHeight = posterWidth / selectedFormat.ratio;
  const templateCardWidth = Math.min(136, Math.max(124, windowWidth * 0.31));
  const exportWidth = 1080;
  const exportHeight = Math.round(exportWidth / selectedFormat.ratio);

  const updateLanguage = item => {
    setLanguage(item);
    setGreeting(selectedFestival.greetings[item]);
  };

  const updateFestival = festival => {
    setSelectedFestivalId(festival.id);
    setGreeting(festival.greetings[language]);
  };

  const pickProfileImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.9,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        return;
      }

      const uri = result.assets?.[0]?.uri;

      if (uri) {
        setProfileImage(uri);
        setAvatarZoom(1.08);
        setAvatarPositionId('center');
      }
    } catch (error) {
      Alert.alert('Upload failed', 'Unable to open the photo library right now.');
    }
  };

  const requestAndroidSavePermission = async () => {
    if (Platform.OS !== 'android' || Platform.Version >= 29) {
      return true;
    }

    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    return result === PermissionsAndroid.RESULTS.GRANTED;
  };

  const capturePoster = async () => {
    if (!posterRef.current) {
      return null;
    }

    return captureRef(posterRef, {
      format: 'png',
      quality: 1,
      result: 'tmpfile',
      width: exportWidth,
      height: exportHeight,
    });
  };

  const downloadPoster = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const hasPermission = await requestAndroidSavePermission();

      if (!hasPermission) {
        Alert.alert('Permission needed', 'Please allow photo access so the poster can be saved.');
        return;
      }

      const uri = await capturePoster();

      if (!uri) {
        Alert.alert('Unable to save', 'Poster preview was not ready yet. Please try again.');
        return;
      }

      await CameraRoll.save(uri, {
        type: 'photo',
        album: 'Dynamic Posters',
      });

      Alert.alert('Downloaded', 'Poster saved to your Photos gallery.');
    } catch (error) {
      Alert.alert('Download failed', 'Unable to save this poster right now. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const sharePoster = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const uri = await capturePoster();

      if (!uri) {
        Alert.alert('Unable to share', 'Poster preview was not ready yet. Please try again.');
        return;
      }

      await Share.share({
        title: `${selectedFestival.name} Poster`,
        message: `${greeting}\nBest wishes from ${fullName.trim() || 'Your Name'}`,
        url: uri,
      });
    } catch (error) {
      Alert.alert('Share failed', 'Unable to share this poster right now. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const sharePosterText = async () => {
    await Share.share({
      title: `${selectedFestival.name} Poster`,
      message: `${greeting}\nBest wishes from ${fullName.trim() || 'Your Name'}`,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingHorizontal: screenPadding }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.appTitle}>Dynamic Poster</Text>
              <Text numberOfLines={1} style={styles.appSubtitle}>
                {selectedFestival.name}
              </Text>
            </View>
            <View style={styles.badge}>
              <Sparkles size={15} color="#fbbf24" />
            </View>
          </View>

          <View style={styles.segment}>
            {languages.map(item => (
              <TouchableOpacity
                key={item}
                activeOpacity={0.85}
                onPress={() => updateLanguage(item)}
                style={[styles.segmentButton, language === item && styles.segmentButtonActive]}>
                <Languages size={16} color={language === item ? '#020617' : '#cbd5e1'} />
                <Text style={[styles.segmentText, language === item && styles.segmentTextActive]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.previewShell}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Live Preview</Text>
              <Text style={styles.sectionHint}>Poster scales down for mobile editing</Text>
            </View>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.formatBadge}>{selectedFormat.size}</Text>
          </View>

          <LinearGradient
            ref={posterRef}
            collapsable={false}
            colors={selectedFestival.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.poster, { width: posterWidth, height: posterHeight }]}>
            <View style={styles.posterOverlay} />
            <View style={[styles.lightWash, { height: posterHeight * 0.28 }]} />
            <View style={styles.blurCircleLeft} />
            <View style={styles.blurCircleRight} />

            {showSparkles && (
              <>
                <Text style={[styles.sparkle, styles.sparkleOne]}>✦</Text>
                <Text style={[styles.sparkle, styles.sparkleTwo]}>✧</Text>
                <Text style={[styles.sparkle, styles.sparkleThree]}>✺</Text>
              </>
            )}

            <View style={styles.posterTopBar}>
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.posterPill}>
                {selectedFestival.name}
              </Text>
              <View style={styles.posterSymbol}>
                <Text style={[styles.posterSymbolText, { color: selectedFestival.glow }]}>{selectedFestival.symbol}</Text>
              </View>
            </View>

            <View style={[styles.posterProfileBlock, { top: posterHeight * 0.17 }]}>
              <LinearGradient colors={['#ffffff', '#fef3c7', '#ffffff']} style={styles.posterAvatarRing}>
                <View style={styles.posterAvatarInner}>
                  {profileImage.trim() ? (
                    <Image
                      source={{ uri: profileImage.trim() }}
                      resizeMode="cover"
                      style={[
                        styles.posterAvatarImage,
                        {
                          transform: [{ scale: avatarZoom }, { translateY: avatarPosition.translateY }],
                        },
                      ]}
                    />
                  ) : (
                    <ImagePlus size={44} color="rgba(255,255,255,0.72)" />
                  )}
                </View>
              </LinearGradient>

              <Text style={styles.wishesText}>Best wishes from</Text>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={[
                  styles.posterName,
                  {
                    fontFamily: selectedNameStyle.fontFamily,
                    fontWeight: selectedNameStyle.fontWeight,
                  },
                ]}>
                {fullName.trim() || 'Your Name'}
              </Text>
            </View>

            <View style={[styles.greetingBox, { bottom: posterHeight * 0.13 }]}>
              <Text numberOfLines={3} adjustsFontSizeToFit style={styles.greetingText}>
                {greeting}
              </Text>
              <View style={[styles.accentLine, { backgroundColor: selectedFestival.accent }]} />
            </View>

            <View style={styles.posterFooter}>
              <View style={styles.footerLine} />
              <Text style={styles.footerText}>Celebrate with joy</Text>
              <View style={styles.footerLine} />
            </View>
          </LinearGradient>

          <View style={styles.actionRow}>
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={isSaving}
              onPress={downloadPoster}
              style={[styles.primaryButton, isSaving && styles.disabledButton]}>
              <Download size={19} color="#020617" />
              <Text style={styles.primaryButtonText}>{isSaving ? 'Saving...' : 'Download'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={isSaving}
              onPress={sharePoster}
              onLongPress={sharePosterText}
              style={[styles.secondaryButton, isSaving && styles.disabledButton]}>
              <Share2 size={19} color="#ffffff" />
              <Text style={styles.secondaryButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Festival Template</Text>
              <Text style={styles.sectionHint}>Swipe to change theme</Text>
            </View>
            <Text numberOfLines={1} style={styles.mutedText}>
              {selectedFestival.name}
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.templateList}>
            {festivals.map(festival => {
              const isActive = selectedFestival.id === festival.id;

              return (
                <TouchableOpacity
                  key={festival.id}
                  activeOpacity={0.86}
                  onPress={() => updateFestival(festival)}
                  style={[styles.templateCard, { width: templateCardWidth }, isActive && styles.templateCardActive]}>
                  <LinearGradient colors={festival.colors} style={styles.templateGradient}>
                    <Text style={styles.templateSymbolText}>{festival.symbol}</Text>
                    <Text numberOfLines={2} adjustsFontSizeToFit style={styles.templateName}>
                      {festival.name}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Profile Image</Text>
              <Text style={styles.sectionHint}>Upload from gallery or paste an image URL</Text>
            </View>
            {profileImage.trim() ? (
              <TouchableOpacity activeOpacity={0.85} onPress={() => setProfileImage('')} style={styles.iconButton}>
                <Trash2 size={18} color="#ffffff" />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={[styles.profileRow, isCompact && styles.profileRowCompact]}>
            <LinearGradient
              colors={['#ffffff', '#fef3c7', '#ffffff']}
              style={[styles.profilePreviewRing, isCompact && styles.profilePreviewRingCompact]}>
              <View style={styles.profilePreviewInner}>
                {profileImage.trim() ? (
                  <Image source={{ uri: profileImage.trim() }} resizeMode="cover" style={styles.profilePreviewImage} />
                ) : (
                  <UserRound size={48} color="rgba(255,255,255,0.55)" />
                )}
              </View>
            </LinearGradient>
            <View style={[styles.profileControls, isCompact && styles.profileControlsCompact]}>
              <View style={styles.profileButtonRow}>
                <TouchableOpacity activeOpacity={0.85} onPress={pickProfileImage} style={styles.uploadButton}>
                  <Upload size={17} color="#020617" />
                  <Text style={styles.uploadButtonText}>Upload Photo</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.urlLabel}>
                <Upload size={17} color="rgba(255,255,255,0.78)" />
                <Text style={styles.urlLabelText}>Image URL</Text>
              </View>
              <TextInput
                value={profileImage}
                onChangeText={text => {
                  setProfileImage(text);
                  setAvatarZoom(1.08);
                  setAvatarPositionId('center');
                }}
                placeholder="https://example.com/photo.jpg"
                placeholderTextColor="rgba(255,255,255,0.36)"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>
          </View>

          <Text style={styles.controlLabel}>Image zoom {Math.round(avatarZoom * 100)}%</Text>
          <View style={styles.chipGrid}>
            {[1, 1.08, 1.22, 1.4, 1.6].map(value => (
              <TouchableOpacity
                key={value}
                activeOpacity={0.85}
                onPress={() => setAvatarZoom(value)}
                style={[styles.smallChip, styles.zoomChip, avatarZoom === value && styles.smallChipActive]}>
                <Text style={[styles.smallChipText, avatarZoom === value && styles.smallChipTextActive]}>
                  {Math.round(value * 100)}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.controlLabel}>Image position</Text>
          <View style={styles.chipGrid}>
            {avatarPositions.map(position => (
              <TouchableOpacity
                key={position.id}
                activeOpacity={0.85}
                onPress={() => setAvatarPositionId(position.id)}
                style={[styles.smallChip, styles.positionChip, avatarPositionId === position.id && styles.smallChipActive]}>
                <Text style={[styles.smallChipText, avatarPositionId === position.id && styles.smallChipTextActive]}>
                  {position.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Poster Details</Text>
          <Text style={styles.controlLabel}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your name"
            placeholderTextColor="rgba(255,255,255,0.36)"
            style={styles.input}
          />

          <Text style={styles.controlLabel}>Greeting Message</Text>
          <TextInput
            value={greeting}
            onChangeText={setGreeting}
            multiline
            placeholder="Write your greeting"
            placeholderTextColor="rgba(255,255,255,0.36)"
            style={[styles.input, styles.textArea]}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.paletteHeader}>
            <Palette size={20} color="#fbbf24" />
            <Text style={styles.sectionTitle}>Advanced Poster Options</Text>
          </View>

          <Text style={styles.controlLabel}>Poster size</Text>
          <View style={styles.optionColumn}>
            {posterFormats.map(format => (
              <TouchableOpacity
                key={format.id}
                activeOpacity={0.85}
                onPress={() => setFormatId(format.id)}
                style={[styles.optionCard, formatId === format.id && styles.optionCardActive]}>
                <Text style={[styles.optionTitle, formatId === format.id && styles.optionTextActive]}>{format.label}</Text>
                <Text style={[styles.optionMeta, formatId === format.id && styles.optionMetaActive]}>{format.size}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.controlLabel}>Name style</Text>
          <View style={styles.optionRow}>
            {nameStyles.map(style => (
              <TouchableOpacity
                key={style.id}
                activeOpacity={0.85}
                onPress={() => setNameStyleId(style.id)}
                style={[styles.smallChip, nameStyleId === style.id && styles.smallChipActive]}>
                <Text
                  style={[
                    styles.smallChipText,
                    { fontFamily: style.fontFamily, fontWeight: style.fontWeight },
                    nameStyleId === style.id && styles.smallChipTextActive,
                  ]}>
                  {style.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.optionTitle}>Festive sparkles</Text>
              <Text style={styles.optionMeta}>Decorative highlights on the poster</Text>
            </View>
            <Switch
              value={showSparkles}
              onValueChange={setShowSparkles}
              trackColor={{ false: '#334155', true: '#fef3c7' }}
              thumbColor={showSparkles ? '#f59e0b' : '#94a3b8'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617',
  },
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    paddingTop: 12,
    paddingBottom: 32,
    gap: 14,
  },
  heroCard: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 18,
    padding: 14,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '900',
  },
  appSubtitle: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  badge: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 21,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15,23,42,0.86)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  segmentButtonActive: {
    backgroundColor: '#ffffff',
  },
  segmentText: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '800',
  },
  segmentTextActive: {
    color: '#020617',
  },
  card: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 18,
    padding: 14,
  },
  previewShell: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
  },
  sectionHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    flexShrink: 1,
    fontSize: 20,
    fontWeight: '800',
  },
  sectionHint: {
    color: 'rgba(255,255,255,0.52)',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  formatBadge: {
    color: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: '700',
  },
  mutedText: {
    color: 'rgba(255,255,255,0.58)',
    fontSize: 13,
    fontWeight: '700',
    flexShrink: 1,
    maxWidth: '42%',
    textAlign: 'right',
  },
  poster: {
    alignSelf: 'center',
    borderRadius: 18,
    overflow: 'hidden',
  },
  posterOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.12)',
  },
  lightWash: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  blurCircleLeft: {
    position: 'absolute',
    left: -48,
    top: 96,
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: 'rgba(255,255,255,0.17)',
  },
  blurCircleRight: {
    position: 'absolute',
    right: -66,
    bottom: 130,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(254,215,170,0.22)',
  },
  sparkle: {
    position: 'absolute',
    color: 'rgba(255,255,255,0.72)',
    fontWeight: '900',
  },
  sparkleOne: {
    left: 34,
    top: 134,
    fontSize: 25,
  },
  sparkleTwo: {
    right: 44,
    top: 198,
    fontSize: 19,
  },
  sparkleThree: {
    left: 48,
    bottom: 186,
    fontSize: 21,
  },
  posterTopBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  posterPill: {
    maxWidth: '58%',
    color: '#ffffff',
    textTransform: 'uppercase',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  posterSymbol: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.40)',
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterSymbolText: {
    fontSize: 22,
    fontWeight: '900',
  },
  posterProfileBlock: {
    position: 'absolute',
    left: 22,
    right: 22,
    alignItems: 'center',
  },
  posterAvatarRing: {
    width: 92,
    height: 92,
    borderRadius: 46,
    padding: 5,
    marginBottom: 12,
  },
  posterAvatarInner: {
    flex: 1,
    borderRadius: 41,
    overflow: 'hidden',
    backgroundColor: 'rgba(15,23,42,0.84)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterAvatarImage: {
    width: '100%',
    height: '100%',
  },
  wishesText: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  posterName: {
    color: '#ffffff',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 7,
    textShadowColor: 'rgba(15,23,42,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  greetingBox: {
    position: 'absolute',
    left: 22,
    right: 22,
    minHeight: 118,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
    backgroundColor: 'rgba(15,23,42,0.28)',
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    color: '#ffffff',
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(15,23,42,0.42)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  accentLine: {
    width: 86,
    height: 5,
    borderRadius: 999,
    marginTop: 14,
  },
  posterFooter: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  footerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  footerText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '800',
  },
  actionRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  primaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#020617',
    fontSize: 14,
    fontWeight: '900',
  },
  secondaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabledButton: {
    opacity: 0.62,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  templateList: {
    gap: 10,
    paddingRight: 2,
  },
  templateCard: {
    height: 150,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  templateCardActive: {
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  templateGradient: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  templateSymbol: {
    alignSelf: 'flex-end',
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.42)',
    backgroundColor: 'rgba(255,255,255,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateSymbolText: {
    color: '#ffffff',
    alignSelf: 'flex-end',
    fontSize: 22,
    fontWeight: '900',
    opacity: 0.9,
  },
  templateName: {
    color: '#ffffff',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '900',
    textShadowColor: 'rgba(15,23,42,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  profileRowCompact: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  profilePreviewRing: {
    width: 108,
    height: 108,
    borderRadius: 54,
    padding: 5,
  },
  profilePreviewRingCompact: {
    alignSelf: 'center',
  },
  profilePreviewInner: {
    flex: 1,
    borderRadius: 49,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePreviewImage: {
    width: '100%',
    height: '100%',
  },
  profileControls: {
    flex: 1,
    gap: 9,
  },
  profileControlsCompact: {
    width: '100%',
    flex: 0,
  },
  profileButtonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  uploadButton: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  uploadButtonText: {
    color: '#020617',
    fontSize: 14,
    fontWeight: '900',
  },
  urlLabel: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  urlLabelText: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    fontWeight: '800',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(15,23,42,0.60)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  textArea: {
    minHeight: 98,
    textAlignVertical: 'top',
  },
  controlLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 9,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  optionColumn: {
    gap: 9,
  },
  smallChip: {
    minHeight: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(15,23,42,0.46)',
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomChip: {
    minWidth: 76,
    flexGrow: 1,
  },
  positionChip: {
    minWidth: 92,
  },
  smallChipActive: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  smallChipText: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: 13,
    fontWeight: '900',
  },
  smallChipTextActive: {
    color: '#020617',
  },
  paletteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 2,
  },
  optionCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(15,23,42,0.46)',
    padding: 14,
  },
  optionCardActive: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  optionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  optionTextActive: {
    color: '#020617',
  },
  optionMeta: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  optionMetaActive: {
    color: 'rgba(2,6,23,0.62)',
  },
  switchRow: {
    minHeight: 66,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(15,23,42,0.46)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
});
