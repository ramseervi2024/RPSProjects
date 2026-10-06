import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  Image,
} from 'react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Search,
  Star,
  TrendingUp,
  ArrowRight,
  Headphones,
  Filter,
  X,
} from 'lucide-react-native';
import { getSipLists } from '../redux/profile/action';
import { COLORS, SHADOWS, GLOBAL_STYLES } from '../theme/theme';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { getCategoryTheme, getSipImageUrl } from '../utils/mediaUtils';

const CATEGORY_TABS = [
  'All Funds',
  'Top SIPs',
  'Mid Cap',
  'Equity',
  'Tax Saving',
];

export default function SIPScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(route.params?.initialTab || 'All Funds');
  const [imageErrors, setImageErrors] = useState({});

  const rawSips = useSelector((state) => state.profile.siplists);
  const sipsList = useMemo(() => (Array.isArray(rawSips) ? rawSips : []), [rawSips]);

  const loadData = async () => {
    try {
      await dispatch(getSipLists());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const filteredFunds = useMemo(() => {
    return sipsList.filter((fund) => {
      const name = fund.name || '';
      const heading = fund.heading || '';
      const cat = fund.category || '';
      const subCat = fund.sub_category || '';

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        name.toLowerCase().includes(query) ||
        heading.toLowerCase().includes(query) ||
        cat.toLowerCase().includes(query) ||
        subCat.toLowerCase().includes(query);

      let matchesTab = true;
      if (activeTab === 'Top SIPs') {
        matchesTab = (parseFloat(fund.rating_label) || 4) >= 4.5 || (parseFloat(fund.one_year_return) || 0) >= 20;
      } else if (activeTab === 'Mid Cap') {
        matchesTab = cat.toLowerCase().includes('mid') || subCat.toLowerCase().includes('mid');
      } else if (activeTab === 'Equity') {
        matchesTab = !cat.toLowerCase().includes('debt');
      } else if (activeTab === 'Tax Saving') {
        matchesTab = cat.toLowerCase().includes('tax') || heading.toLowerCase().includes('elss');
      }

      return matchesSearch && matchesTab;
    });
  }, [sipsList, searchQuery, activeTab]);

  const handleInvestNow = (fund) => {
    const fundHeading = fund.heading || fund.category || 'mid cap';
    navigation.navigate('ContactAdvisor', {
      category: 'Mutual Fund & SIP Advisory',
      subject: `Investment Inquiry: ${fund.name} (${fundHeading})`,
      initialMessage: `Hello! I am interested in investing in the "${fund.name}" plan (${fundHeading}). Please guide me with the step-by-step investment process, recommended monthly SIP allocation, and documentation needed.`,
    });
  };

  const [showFilters, setShowFilters] = useState(false);

  const cleanPill = (s) => {
    if (!s) return 'Sip';
    let t = String(s).trim();
    t = t.replace(/^(category|sub-category)\s*[-:]?\s*/i, '');
    t = t.replace(/\s*-\s*\d+$/i, '');
    t = t.replace(/[-_]+/g, ' ').trim();
    if (!t) return 'Sip';
    return t
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  const renderSipCard = ({ item, index }) => {
    const imageUrl = getSipImageUrl(item, index);
    const hasImage = Boolean(imageUrl) && !imageErrors[item.id];
    const theme = getCategoryTheme(index);
    const rating = item.rating_label || '4';
    const ret1y = item.one_year_return ? `${parseFloat(item.one_year_return).toFixed(2)}%` : '20.00%';
    const cagr3y = item.three_year_cagr ? `${parseFloat(item.three_year_cagr).toFixed(2)}%` : '80.00%';
    const cagr5y = item.five_year_cagr ? `${parseFloat(item.five_year_cagr).toFixed(2)}%` : '120.00%';
    const categoryBadge = cleanPill(item.category || item.sub_category || 'Sip');

    return (
      <View style={styles.sipCard}>
        {/* 16:9 Rectangle Media Banner matching Website */}
        <View style={styles.mediaContainer}>
          {hasImage ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.mediaImg}
              resizeMode="cover"
              onError={() =>
                setImageErrors((prev) => ({ ...prev, [item.id]: true }))
              }
            />
          ) : (
            <View style={[styles.mediaFallback, { backgroundColor: theme.bg }]}>
              <TrendingUp size={36} color={theme.text} />
              <Text style={[styles.fallbackTitle, { color: theme.text }]}>
                {item.name} SIP
              </Text>
            </View>
          )}

          {/* Overlaid Badges matching Screenshot 2 */}
          <View style={styles.badgeRow}>
            <View style={styles.glassPill}>
              <TrendingUp size={11} color="#DC2626" style={{ marginRight: 4 }} />
              <Text style={styles.glassPillText}>{categoryBadge}</Text>
            </View>

            <View style={styles.glassRatingPill}>
              <Star size={11} color="#D97706" fill="#D97706" style={{ marginRight: 3 }} />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>
        </View>

        {/* Card Body matching Website */}
        <View style={styles.cardBody}>
          <Text style={styles.fundName}>{item.name}</Text>
          <Text style={styles.fundHeading}>{item.heading || 'Top Mutual Funds for SIP'}</Text>

          {/* 3-Column CAGR Return Box matching Screenshot 2 */}
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLbl}>1Y RETURN</Text>
              <Text style={styles.metricVal}>↗ {ret1y}</Text>
            </View>

            <View style={styles.metricBox}>
              <Text style={styles.metricLbl}>3Y CAGR</Text>
              <Text style={styles.metricVal}>↗ {cagr3y}</Text>
            </View>

            <View style={[styles.metricBox, styles.metricBoxHighlight]}>
              <Text style={[styles.metricLbl, { color: '#047857' }]}>5Y CAGR</Text>
              <Text style={[styles.metricVal, { color: '#047857' }]}>↗ {cagr5y}</Text>
            </View>
          </View>

          {/* Bottom Action: Invest Now */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.investBtnFull}
              onPress={() => handleInvestNow(item)}
              activeOpacity={0.85}
            >
              <Text style={styles.investBtnText}>Invest Now</Text>
              <ArrowRight size={15} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Simple Clean Mobile Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>SIP Portfolios</Text>
        </View>

        <TouchableOpacity
          style={styles.advisorHeaderBtn}
          onPress={() => navigation.navigate('ContactAdvisor')}
          activeOpacity={0.8}
        >
          <Headphones size={18} color="#0F766E" />
        </TouchableOpacity>
      </View>

      {/* Search Bar + Filter Button matching Screenshot 2 */}
      <View style={styles.searchBarRow}>
        <View style={styles.searchBox}>
          <Search size={16} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search SIP scheme, category..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={15} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.filterBtn, showFilters && styles.filterBtnActive]}
          onPress={() => setShowFilters(!showFilters)}
          activeOpacity={0.8}
        >
          <Filter size={15} color="#FFFFFF" />
          <Text style={styles.filterBtnText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Category Pills Bar */}
      {showFilters && (
        <View style={styles.tabsWrap}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CATEGORY_TABS}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.tabsContent}
            renderItem={({ item }) => {
              const isActive = activeTab === item;
              return (
                <TouchableOpacity
                  style={[styles.tabPill, isActive && styles.tabPillActive]}
                  onPress={() => setActiveTab(item)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {/* SIP Portfolios List */}
      {loading ? (
        <View style={GLOBAL_STYLES.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredFunds}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderSipCard}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <TrendingUp size={44} color="#94A3B8" />
              <Text style={styles.emptyTitle}>No SIP Portfolios Found</Text>
              <Text style={styles.emptySub}>
                Try adjusting your search or category filter.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 12,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size24,
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  headerSubtitleTop: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size10,
    color: '#0F766E',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 18,
  },
  advisorHeaderBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F766E',
    paddingHorizontal: 14,
    height: 42,
    borderRadius: 12,
    gap: 6,
  },
  filterBtnActive: {
    backgroundColor: '#115E59',
  },
  filterBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size13,
    color: '#FFFFFF',
  },
  investBtnFull: {
    flex: 1,
    backgroundColor: '#0F766E',
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size13,
    color: '#0F172A',
    marginLeft: 8,
    padding: 0,
  },
  tabsWrap: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  tabsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  tabPillActive: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E',
  },
  tabText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size12,
    color: '#64748B',
  },
  tabTextActive: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 110,
  },
  // SIP Card
  sipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
    ...SHADOWS.card,
  },
  mediaContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  mediaImg: {
    width: '100%',
    height: '100%',
  },
  mediaFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size14,
    marginTop: 6,
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  glassPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    ...SHADOWS.sm,
  },
  glassPillText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size10,
    color: '#0F172A',
  },
  glassRatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    ...SHADOWS.sm,
  },
  ratingText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size10,
    color: '#B45309',
  },
  cardBody: {
    padding: 16,
  },
  fundName: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size17,
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  fundHeading: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
    marginTop: 2,
    marginBottom: 6,
  },
  fundDesc: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    lineHeight: fontSizes.size12 * 1.4,
    marginBottom: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  metricBoxHighlight: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  metricLbl: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size9,
    color: '#64748B',
    marginBottom: 2,
  },
  metricVal: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size13,
    color: '#0F766E',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  simulateBtn: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderRadius: 12,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  simulateBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#0F766E',
  },
  investBtn: {
    flex: 1.2,
    backgroundColor: '#0F766E',
    borderRadius: 12,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  investBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size12,
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size16,
    color: '#0F172A',
    marginTop: 12,
  },
  emptySub: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    marginTop: 4,
  },
});
