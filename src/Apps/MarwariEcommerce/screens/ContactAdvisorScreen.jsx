import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import {
  ChevronLeft,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Send,
  RefreshCw,
  Zap,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { COLORS, SHADOWS, GLOBAL_STYLES } from '../theme/theme';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { showToast } from '../components/common/Toast';

const QUICK_TEMPLATES = [
  {
    id: 'help',
    title: 'Need some help',
    message: 'Hello! I need some guidance regarding corporate investment options and financial planning.',
  },
  {
    id: 'investment',
    title: 'investment plan idea',
    message: 'Hello! Could you suggest an optimal monthly SIP and investment plan based on my profile?',
  },
  {
    id: 'portfolio',
    title: 'Portfolio review',
    message: 'Hello! Could you please review my existing mutual funds and stock portfolio to help optimize returns?',
  },
  {
    id: 'tax',
    title: 'Tax planning idea',
    message: 'Hello! I need assistance with tax saving strategies under Section 80C and corporate tax planning.',
  },
  {
    id: 'support',
    title: 'need support',
    message: 'Hello! I need support regarding my corporate benefits account and recent financial query.',
  },
];

export default function ContactAdvisorScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const profile = useSelector((state) => state.profile?.profiledetails || state.profile?.userProfile || {});
  const userEmail = profile?.email || 'ramseervi4321@gmail.com';
  const fullName = `${profile?.first_name || 'Ramesh'} ${profile?.last_name || 'Seervi'}`.trim();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sending, setSending] = useState(false);
  const [latestInquiryId, setLatestInquiryId] = useState(2);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  const flatListRef = useRef(null);
  const inputRef = useRef(null);

  const formatCurrentTimeIST = () => {
    try {
      return (
        new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }) + ' IST'
      );
    } catch (e) {
      const d = new Date();
      let h = d.getHours();
      const m = String(d.getMinutes()).padStart(2, '0');
      const ampm = h >= 12 ? 'pm' : 'am';
      h = h % 12 || 12;
      return `${String(h).padStart(2, '0')}:${m} ${ampm} IST`;
    }
  };

  const fetchChatMessages = async (showSpinner = false) => {
    if (showSpinner) setRefreshing(true);
    try {
      const url = `https://wealthhackers.in/wp-admin/admin-ajax.php?action=wh_get_user_chat_stream&email=${encodeURIComponent(
        userEmail
      )}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json && json.success && json.data) {
        if (json.data.latest_inquiry_id) {
          setLatestInquiryId(json.data.latest_inquiry_id);
        }
        const msgs = json.data.messages || [];
        setMessages(msgs);
      }
    } catch (err) {
      console.warn('Chat fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load & Polling every 5 seconds
  useEffect(() => {
    fetchChatMessages(false);
    const interval = setInterval(() => {
      fetchChatMessages(false);
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  // Handle route params prefilling
  useEffect(() => {
    if (route.params?.initialMessage) {
      setInputText(route.params.initialMessage);
    } else if (route.params?.subject) {
      setInputText(
        `Hello! I need advisory guidance regarding: ${route.params.subject}. Please guide me with recommended allocations and process.`
      );
    }
  }, [route.params]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [messages.length]);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi WealthHackers Advisor, I need professional guidance regarding my corporate investment portfolio.`
    );
    Linking.openURL(`https://wa.me/918884222044?text=${text}`).catch(() => {
      showToast.error('WhatsApp Error', 'Could not open WhatsApp on this device.');
    });
  };

  const handleCall = () => {
    Linking.openURL('tel:+918884222044').catch(() => {
      showToast.error('Dialer Error', 'Could not open phone dialer.');
    });
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplateId(template.id);
    setInputText(template.message);
    inputRef.current?.focus();
    setTimeout(() => {
      setSelectedTemplateId(null);
    }, 800);
  };

  const handleSendMessage = async () => {
    const text = inputText.trim();
    if (!text || sending) return;

    const nowIst = formatCurrentTimeIST();
    const optimisticMsg = {
      id: 'opt_' + Date.now(),
      sender_type: 'user',
      sender_name: fullName,
      sender_email: userEmail,
      message: text,
      created_at: new Date().toISOString(),
      time_ist: nowIst,
      isOptimistic: true,
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setInputText('');
    setSending(true);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const inqId = latestInquiryId || 2;
      const params = new URLSearchParams();
      if (inqId) {
        params.append('action', 'wh_reply_inquiry');
        params.append('inquiry_id', String(inqId));
        params.append('message', text);
        params.append('user_email', userEmail);
        params.append('sender_email', userEmail);
        params.append('sender_name', fullName);
      } else {
        params.append('action', 'wh_submit_inquiry');
        params.append('subject', 'Direct Advisory Chat');
        params.append('category', 'General Wealth Guidance');
        params.append('message', text);
        params.append('user_email', userEmail);
        params.append('user_name', fullName);
        params.append('platform', 'mobile');
      }

      const res = await fetch('https://wealthhackers.in/wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      const data = await res.json();
      if (data?.success && data?.data?.inquiry_id) {
        setLatestInquiryId(data.data.inquiry_id);
      }
    } catch (err) {
      console.warn('Send message error:', err);
    } finally {
      setSending(false);
      fetchChatMessages(false);
    }
  };

  const cleanMessageText = (txt) => {
    if (!txt) return '';
    return String(txt)
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\n/g, '\n');
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender_type === 'user';
    const msgTime = item.time_ist || 'Just now';
    const textContent = cleanMessageText(item.message);

    if (isUser) {
      return (
        <View style={styles.userMsgWrapper}>
          <View style={styles.userBubble}>
            <Text style={styles.userMsgText}>{textContent}</Text>
            <View style={styles.userMetaRow}>
              <Text style={styles.timeText}>{msgTime}</Text>
              <Text style={styles.doubleCheck}>✓✓</Text>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.advisorMsgWrapper}>
        <View style={styles.advisorBubble}>
          <View style={styles.advisorBadgeRow}>
            <ShieldCheck size={14} color="#0284C7" strokeWidth={2.4} />
            <Text style={styles.advisorBadgeText}>
              {item.sender_name || 'CFP Wealth Advisor'}
            </Text>
          </View>
          <Text style={styles.advisorMsgText}>{textContent}</Text>
          <View style={styles.advisorMetaRow}>
            <Text style={styles.timeText}>{msgTime}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Advisory Desk Header */}
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main')
            }
            activeOpacity={0.7}
          >
            <ChevronLeft size={20} color={COLORS.navy} />
          </TouchableOpacity>

          <Text style={styles.navHeaderTitle}>Contact Advisor</Text>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={styles.refreshBtn}
            onPress={() => fetchChatMessages(true)}
            disabled={refreshing}
            activeOpacity={0.75}
          >
            {refreshing ? (
              <ActivityIndicator size="small" color="#0284C7" style={{ marginRight: 5 }} />
            ) : (
              <RefreshCw size={12} color="#0284C7" strokeWidth={2.4} style={{ marginRight: 5 }} />
            )}
            <Text style={styles.refreshBtnText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Chat Interface Container */}
      <KeyboardAvoidingView
        style={[styles.chatCardOuter, { paddingBottom: Math.max(insets.bottom + 14, 24) }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <View style={styles.chatCard}>
          {/* <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderTitle}>Wealth Advisor</Text>

            <TouchableOpacity
              style={styles.refreshBtn}
              onPress={() => fetchChatMessages(true)}
              disabled={refreshing}
              activeOpacity={0.75}
            >
              {refreshing ? (
                <ActivityIndicator size="small" color="#0284C7" style={{ marginRight: 5 }} />
              ) : (
                <RefreshCw size={12} color="#0284C7" strokeWidth={2.4} style={{ marginRight: 5 }} />
              )}
              <Text style={styles.refreshBtnText}>Refresh</Text>
            </TouchableOpacity>
          </View> */}

          {/* Messages Stream */}
          <View style={styles.streamContainer}>
            {loading ? (
              <View style={styles.loadingWrap}>
                <ActivityIndicator size="large" color="#0D9488" />
                <Text style={styles.loadingText}>Loading advisor chat...</Text>
              </View>
            ) : messages.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>💬 Direct Advisor Chat</Text>
                <Text style={styles.emptySubtitle}>
                  Type your message below or pick a quick template to begin chatting directly with
                  your dedicated wealth advisor.
                </Text>
              </View>
            ) : (
              <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item, index) => String(item.id || index)}
                renderItem={renderMessage}
                contentContainerStyle={styles.messagesList}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() =>
                  flatListRef.current?.scrollToEnd({ animated: true })
                }
              />
            )}
          </View>

          {/* Quick Templates Bar */}
          <View style={styles.templatesBar}>
            <Text style={styles.templatesLabel}>QUICK TEMPLATES:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.templatesScroll}
            >
              {QUICK_TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplateId === tmpl.id;
                return (
                  <TouchableOpacity
                    key={tmpl.id}
                    style={[styles.templatePill, isSelected && styles.templatePillActive]}
                    onPress={() => handleSelectTemplate(tmpl)}
                    activeOpacity={0.7}
                  >
                    <Zap
                      size={12}
                      color="#F59E0B"
                      fill="#F59E0B"
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.templatePillText,
                        isSelected && styles.templatePillTextActive,
                      ]}
                    >
                      {tmpl.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Chat Message Input Row */}
          <View style={styles.inputRow}>
            <View style={styles.inputWrap}>
              <TextInput
                ref={inputRef}
                style={styles.textInput}
                placeholder="Type your message to the advisor..."
                placeholderTextColor="#94A3B8"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={1000}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.sendBtn,
                (!inputText.trim() || sending) && styles.sendBtnDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={!inputText.trim() || sending}
              activeOpacity={0.8}
            >
              {sending ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Send size={18} color="#FFFFFF" strokeWidth={2.4} style={{ marginLeft: 2 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 10,
  },
  navHeaderTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size18 || 18,
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  hotlineActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 6,
  },
  actionBtnWhatsApp: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnCall: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#99F6E4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: '#475569',
    marginTop: 4,
    lineHeight: 17,
  },
  chatCardOuter: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },
  chatCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeaderTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#0F172A',
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    backgroundColor: '#FFFFFF',
  },
  refreshBtnText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11.5,
    color: '#0284C7',
  },
  streamContainer: {
    flex: 1,
    backgroundColor: '#EFEAE2',
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: '#64748B',
  },
  emptyContainer: {
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 12,
    padding: 16,
    maxWidth: '88%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#0F172A',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11.5,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  messagesList: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 16,
  },
  userMsgWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginVertical: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    maxWidth: '82%',
    backgroundColor: '#D9FDD3',
    borderRadius: 10,
    borderTopRightRadius: 2,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    shadowColor: '#0B141A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 1,
    elevation: 1,
  },
  userMsgText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 18,
    color: '#111B21',
  },
  userMetaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  advisorMsgWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 4,
  },
  advisorBubble: {
    alignSelf: 'flex-start',
    maxWidth: '82%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderTopLeftRadius: 2,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0B141A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
  },
  advisorBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  advisorBadgeText: {
    fontFamily: fontFamilies.bold,
    fontSize: 11.5,
    color: '#0284C7',
  },
  advisorMsgText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 18,
    color: '#111B21',
  },
  advisorMetaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  timeText: {
    fontFamily: fontFamilies.regular,
    fontSize: 10.5,
    color: '#667781',
  },
  doubleCheck: {
    fontFamily: fontFamilies.bold,
    fontSize: 12.5,
    color: '#53BDEB',
    letterSpacing: -2,
    marginLeft: 2,
  },
  templatesBar: {
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  templatesLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: 10,
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  templatesScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  templatePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  templatePillActive: {
    backgroundColor: '#E0F2FE',
    borderColor: '#0284C7',
  },
  templatePillText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11.5,
    color: '#334155',
  },
  templatePillTextActive: {
    color: '#0369A1',
    fontFamily: fontFamilies.bold,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#F1F5F9',
    gap: 8,
  },
  inputWrap: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 38,
    maxHeight: 90,
    justifyContent: 'center',
  },
  textInput: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: '#0F172A',
    padding: 0,
    margin: 0,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },
  sendBtnDisabled: {
    backgroundColor: '#94A3B8',
    opacity: 0.6,
  },
});
