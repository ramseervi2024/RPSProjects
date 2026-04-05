import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {
    ChevronRight, Code, Layout, Moon, Camera, Rocket,
    Grid, Box, Cpu, Package, Layers, Feather, Edit,
    Monitor, Coffee, Zap, User, Film, Sparkles, Star, Compass,
    Target, Aperture, Library, BookOpen, Terminal, Orbit, Maximize2, Settings,
    Activity, Gamepad2, Diamond, Droplet, FileCode, Hash, Eye,
    Leaf, Maximize, Droplets, Move, Trophy, Scissors, Shield, Sun,
    PenTool, HardDrive, Map
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

// Import Portfolio Themes (to be created)
import Portfolio1 from './Portfolio1';
import Portfolio2 from './Portfolio2';
import Portfolio3 from './Portfolio3';
import Portfolio4 from './Portfolio4';
import Portfolio5 from './Portfolio5';
import Portfolio6 from './Portfolio6';
import Portfolio7 from './Portfolio7';
import Portfolio8 from './Portfolio8';
import Portfolio9 from './Portfolio9';
import Portfolio10 from './Portfolio10';
import Portfolio11 from './Portfolio11';
import Portfolio12 from './Portfolio12';
import Portfolio13 from './Portfolio13';
import Portfolio14 from './Portfolio14';
import Portfolio15 from './Portfolio15';
import Portfolio16 from './Portfolio16';
import Portfolio17 from './Portfolio17';
import Portfolio18 from './Portfolio18';
import Portfolio19 from './Portfolio19';
import Portfolio20 from './Portfolio20';
import Portfolio21 from './Portfolio21';
import Portfolio22 from './Portfolio22';
import Portfolio23 from './Portfolio23';
import Portfolio24 from './Portfolio24';
import Portfolio25 from './Portfolio25';
import Portfolio26 from './Portfolio26';
import Portfolio27 from './Portfolio27';
import Portfolio28 from './Portfolio28';
import Portfolio29 from './Portfolio29';
import Portfolio30 from './Portfolio30';
import Portfolio31 from './Portfolio31';
import Portfolio32 from './Portfolio32';
import Portfolio33 from './Portfolio33';
import Portfolio34 from './Portfolio34';
import Portfolio35 from './Portfolio35';
import Portfolio36 from './Portfolio36';
import Portfolio37 from './Portfolio37';
import Portfolio38 from './Portfolio38';
import Portfolio39 from './Portfolio39';
import Portfolio40 from './Portfolio40';
import Portfolio41 from './Portfolio41';
import Portfolio42 from './Portfolio42';
import Portfolio43 from './Portfolio43';
import Portfolio44 from './Portfolio44';
import Portfolio45 from './Portfolio45';
import Portfolio46 from './Portfolio46';
import Portfolio47 from './Portfolio47';
import Portfolio48 from './Portfolio48';
import Portfolio49 from './Portfolio49';
import Portfolio50 from './Portfolio50';
import Portfolio51 from './Portfolio51';
import Portfolio52 from './Portfolio52';
import Portfolio53 from './Portfolio53';
import Portfolio54 from './Portfolio54';
import Portfolio55 from './Portfolio55';
import Portfolio56 from './Portfolio56';
import Portfolio57 from './Portfolio57';
import Portfolio58 from './Portfolio58';
import Portfolio59 from './Portfolio59';
import Portfolio60 from './Portfolio60';
import Portfolio61 from './Portfolio61';
import Portfolio62 from './Portfolio62';
import Portfolio63 from './Portfolio63';
import Portfolio64 from './Portfolio64';
import Portfolio65 from './Portfolio65';
import Portfolio66 from './Portfolio66';
import Portfolio67 from './Portfolio67';
import Portfolio68 from './Portfolio68';
import Portfolio69 from './Portfolio69';
import Portfolio70 from './Portfolio70';
import Portfolio71 from './Portfolio71';
import Portfolio72 from './Portfolio72';
import Portfolio73 from './Portfolio73';
import Portfolio74 from './Portfolio74';
import Portfolio75 from './Portfolio75';
import Portfolio76 from './Portfolio76';
import Portfolio77 from './Portfolio77';
import Portfolio78 from './Portfolio78';
import Portfolio79 from './Portfolio79';
import Portfolio80 from './Portfolio80';
import Portfolio81 from './Portfolio81';
import Portfolio82 from './Portfolio82';

const Stack = createStackNavigator();

const portfolios = [
    { id: 'Portfolio1', title: 'Modern Clean', desc: 'Minimalist content-focused design.', icon: Layout, color: ['#3B82F6', '#1D4ED8'] },
    { id: 'Portfolio2', title: 'Dark Mode Pro', desc: 'Sleek dark theme for developers.', icon: Moon, color: ['#8B5CF6', '#5B21B6'] },
    { id: 'Portfolio3', title: 'Creative Studio', desc: 'Bold typography and creative elements.', icon: Edit, color: ['#F59E0B', '#B45309'] },
    { id: 'Portfolio4', title: 'Photography Focus', desc: 'Image-heavy layout for artists.', icon: Camera, color: ['#10B981', '#047857'] },
    { id: 'Portfolio5', title: 'Tech Startup', desc: 'Professional, trustworthy design.', icon: Rocket, color: ['#EF4444', '#B91C1C'] },
    { id: 'Portfolio6', title: 'Bento Grid', desc: 'Trendy grid-based layout.', icon: Grid, color: ['#0EA5E9', '#0369A1'] },
    { id: 'Portfolio7', title: 'Deep Space', desc: 'Immersive dark space experience.', icon: Layers, color: ['#4F46E5', '#312E81'] },
    { id: 'Portfolio8', title: 'Cinematic 3D', desc: 'High-end glassmorphic UI.', icon: Box, color: ['#A855F7', '#6B21A8'] },
    { id: 'Portfolio9', title: 'AI Futuristic', desc: 'Neon-glow UI with futuristic vibes.', icon: Cpu, color: ['#06B6D4', '#0891B2'] },
    { id: 'Portfolio10', title: '3D Interactive', desc: 'WebGL-style interactive experience.', icon: Box, color: ['#F97316', '#C2410C'] },
    { id: 'Portfolio11', title: 'Glassmorphism Pro', desc: 'Liquid glass design with gradients.', icon: Layers, color: ['#EC4899', '#BE185D'] },
    { id: 'Portfolio12', title: 'Storytelling', desc: 'Horizontal scrolling narrative.', icon: Feather, color: ['#84CC16', '#4D7C0F'] },
    { id: 'Portfolio13', title: 'Editorial Strategy', desc: 'Strategic typography-led layout.', icon: Monitor, color: ['#6366F1', '#4338CA'] },
    { id: 'Portfolio14', title: 'Developer OS', desc: 'System monitoring & Terminal feel.', icon: Code, color: ['#14B8A6', '#0F766E'] },
    { id: 'Portfolio15', title: 'Zen Minimalist', desc: 'Minimalist foundation with accents.', icon: Coffee, color: ['#D946EF', '#A21CAF'] },
    { id: 'Portfolio16', title: 'Liquid Agency', desc: 'Fluid agency style with animations.', icon: Zap, color: ['#6366F1', '#3730A3'] },
    { id: 'Portfolio17', title: 'Refined Brutalist', desc: 'Stark B&W with architectural type.', icon: Layout, color: ['#000000', '#333333'] },
    { id: 'Portfolio18', title: 'Neumorphic Glass', desc: 'Ultra-soft depth and tactile UI.', icon: User, color: ['#E0E5EC', '#A3B1C6'] },
    { id: 'Portfolio19', title: 'Swiss Modernist', desc: 'Grid-perfect, Helvetica-focused.', icon: Grid, color: ['#E63946', '#1D3557'] },
    { id: 'Portfolio20', title: 'Cinematic Noir', desc: 'Moody dark mode film aesthetic.', icon: Film, color: ['#111111', '#000000'] },
    { id: 'Portfolio21', title: 'Cyber Modular', desc: 'Futuristic bento instrumentation.', icon: Cpu, color: ['#06B6D4', '#0891B2'] },
    { id: 'Portfolio22', title: 'Organic Fluid', desc: 'Pastel gradients and blob shapes.', icon: Sparkles, color: ['#8B5CF6', '#7C3AED'] },
    { id: 'Portfolio23', title: 'Gradient Mesh', desc: 'Dynamic mesh with glass depth.', icon: Star, color: ['#4F46E5', '#EC4899'] },
    { id: 'Portfolio24', title: 'Future Vision', desc: 'Transparent Vision OS glass.', icon: Compass, color: ['#1E293B', '#334155'] },
    { id: 'Portfolio25', title: 'Abstract Geometry', desc: 'Bold SVG-style color blocks.', icon: Target, color: ['#EF4444', '#3B82F6'] },
    { id: 'Portfolio26', title: 'Glass Duo-Tone', desc: 'Split-screen high-contrast glass.', icon: Aperture, color: ['#3B82F6', '#2563EB'] },
    { id: 'Portfolio27', title: 'Typography Archive', desc: 'Oversized index-style navigation.', icon: Library, color: ['#111111', '#000000'] },
    { id: 'Portfolio28', title: 'Paper & Ink', desc: 'Textured print-magazine aesthetic.', icon: BookOpen, color: ['#FCFAF5', '#1A1A1A'] },
    { id: 'Portfolio29', title: 'Glitch Technical', desc: 'HUD instrumentation and terminal logs.', icon: Terminal, color: ['#00FF41', '#003B00'] },
    { id: 'Portfolio30', title: 'Solar Orbital', desc: 'Radial composition with rotating nodes.', icon: Orbit, color: ['#F59E0B', '#EF4444'] },
    { id: 'Portfolio31', title: 'Minimalist Solo', desc: 'Centred micro-interaction focus.', icon: Maximize2, color: ['#FFF', '#F3F4F6'] },
    { id: 'Portfolio32', title: 'Sidebar Wall', desc: 'Modular vertical navigation wall.', icon: Settings, color: ['#000', '#333'] },
    { id: 'Portfolio33', title: 'Neon Cyberpunk', desc: 'Glowing terminal command center.', icon: Activity, color: ['#050110', '#0D0221'] },
    { id: 'Portfolio34', title: 'Retro Dot-Matrix', desc: 'Nostalgic greenish LCD handheld.', icon: Gamepad2, color: ['#8FA38F', '#1A2F1A'] },
    { id: 'Portfolio35', title: 'Luxury Boutique', desc: 'Elegant high-end minimalist magazine.', icon: Diamond, color: ['#FFF', '#D4AF37'] },
    { id: 'Portfolio36', title: 'Isometric Pro', desc: '3D-feeling tactile block grid.', icon: Box, color: ['#F3F4F6', '#3B82F6'] },
    { id: 'Portfolio37', title: 'Liquid Glass 2.0', desc: 'Morphing animated fluid glass blobs.', icon: Droplet, color: ['#EEF2FF', '#4338CA'] },
    { id: 'Portfolio38', title: 'Refined Terminal', desc: 'Professional syntax highlighted IDE.', icon: FileCode, color: ['#1E1E1E', '#191919'] },
    { id: 'Portfolio39', title: 'Swiss Poster', desc: 'Bold asymmetrical impact typography.', icon: Hash, color: ['#FFF', '#E63946'] },
    { id: 'Portfolio40', title: 'Spatial Vision', desc: 'Advanced Vision OS spatial depth.', icon: Eye, color: ['#1E293B', '#0F172A'] },
    { id: 'Portfolio41', title: 'Deep Space Noir', desc: 'Cinematic star-field storytelling.', icon: Moon, color: ['#020617', '#000000'] },
    { id: 'Portfolio42', title: 'Organic Ceramic', desc: 'Soothing earthy textures and clay tones.', icon: Leaf, color: ['#F7F3F0', '#A78B71'] },
    { id: 'Portfolio43', title: 'Vibrant Bento', desc: 'Lively modular color-changing grid.', icon: Layout, color: ['#F7F9FC', '#FF6B6B'] },
    { id: 'Portfolio44', title: 'Brutalist Architecture', desc: 'Raw industrial impact typography.', icon: Maximize, color: ['#F0F0F0', '#000000'] },
    { id: 'Portfolio45', title: 'Aurora Mesh', desc: 'Moving liquid aurora gradients.', icon: Droplets, color: ['#0F172A', '#22D3EE'] },
    { id: 'Portfolio46', title: 'Holographic Projector', desc: 'Refractive HUD light flicker projections.', icon: Monitor, color: ['#050110', '#00F3FF'] },
    { id: 'Portfolio47', title: 'Modernist Editorial', desc: 'High-impact asymmetrical magazine.', icon: Move, color: ['#FFFFFF', '#000000'] },
    { id: 'Portfolio48', title: 'Pixel Art Studio', desc: 'Nostalgic game-level world logic.', icon: Trophy, color: ['#1A1A1A', '#50E3C2'] },
    { id: 'Portfolio49', title: 'Kinetic Typography', desc: 'Bold moving text as the hero.', icon: Star, color: ['#FFFFFF', '#FFD700'] },
    { id: 'Portfolio50', title: 'Organic Blobs', desc: 'Soft fluid animated forms.', icon: Droplet, color: ['#FFF9F9', '#FFB7B2'] },
    { id: 'Portfolio51', title: 'Retro Terminal Console', desc: 'Clean green-monochrome aesthetic.', icon: Terminal, color: ['#000000', '#00FF41'] },
    { id: 'Portfolio52', title: 'Silver Metallic', desc: 'High-shine reflections precision.', icon: Shield, color: ['#F3F4F6', '#1F2937'] },
    { id: 'Portfolio53', title: 'Paper Cutout', desc: 'Layered 3D depth paper textures.', icon: Scissors, color: ['#F5F5F5', '#333333'] },
    { id: 'Portfolio54', title: 'Midnight Neon', desc: 'Glowing accents midnight blue.', icon: Moon, color: ['#050110', '#BD00FF'] },
    { id: 'Portfolio55', title: 'Minimalist Grid', desc: 'Perfectly aligned strict grid.', icon: Grid, color: ['#FFFFFF', '#000000'] },
    { id: 'Portfolio56', title: 'Dynamic Gradient Mesh', desc: 'Fluid morphing color transitions.', icon: Sparkles, color: ['#EEF2FF', '#4338CA'] },
    { id: 'Portfolio57', title: 'Soft Mesh Gradient', desc: 'Morphing pastel pink/blue mesh.', icon: Sparkles, color: ['#FFDEE9', '#B5FFFC'] },
    { id: 'Portfolio58', title: 'Zebra Organic', desc: 'Wavy lines and earthy textures.', icon: Leaf, color: ['#F5F5F0', '#8B4513'] },
    { id: 'Portfolio59', title: 'Purple Abstract', desc: 'Playful organic purple shapes.', icon: Droplets, color: ['#F3E8FF', '#A855F7'] },
    { id: 'Portfolio60', title: 'Sunset Horizon', desc: 'Bold orange-to-cyan horizon.', icon: Sun, color: ['#FF8C00', '#00CED1'] },
    { id: 'Portfolio61', title: 'Glassmorphic Noir', desc: 'Ultra-clear glass on dark mode.', icon: Moon, color: ['#111827', '#000000'] },
    { id: 'Portfolio62', title: 'Deep Emerald Mint', desc: 'Rich greens with soft mint icons.', icon: Leaf, color: ['#064E3B', '#10B981'] },
    { id: 'Portfolio63', title: 'Retro Clay', desc: 'Soft, pillowy UI with beige tones.', icon: Target, color: ['#FDFCF0', '#8E8D7A'] },
    { id: 'Portfolio64', title: 'Vignette Espresso', desc: 'Focused center deep brown vignette.', icon: Target, color: ['#3E2723', '#1B1110'] },
    { id: 'Portfolio65', title: 'Floating Geometric', desc: 'Clean background moving shapes.', icon: Sparkles, color: ['#F8FAFC', '#64748B'] },
    { id: 'Portfolio66', title: 'Blueprint Grid', desc: 'Professional scientific grid paper.', icon: Library, color: ['#1E3A8A', '#60A5FA'] },
    { id: 'Portfolio67', title: 'Holographic Foil', desc: 'Shifting metallic rainbow on black.', icon: Sparkles, color: ['#FF00CC', '#3333FF'] },
    { id: 'Portfolio68', title: 'Grainy Sand & Stone', desc: 'Neutral, organic textured feel.', icon: Terminal, color: ['#E5E5E5', '#404040'] },
    { id: 'Portfolio69', title: 'Cyber Neon Violet', desc: 'High-energy glowing purple/pink.', icon: Cpu, color: ['#0F0524', '#BD00FF'] },
    { id: 'Portfolio70', title: 'Minimalist Stroke', desc: 'Sharp lines and outline-only cards.', icon: Layout, color: ['#FFFFFF', '#000000'] },
    { id: 'Portfolio71', title: 'Split Vertical Duo', desc: 'High-contrast split-screen layout.', icon: Layers, color: ['#000000', '#FF007A'] },
    { id: 'Portfolio72', title: 'Cosmic Starfield', desc: 'Animated deep space particles.', icon: Rocket, color: ['#020617', '#38BDF8'] },
    { id: 'Portfolio73', title: 'Carbon Fiber', desc: 'Sleek dark tactical texture.', icon: Shield, color: ['#1A1A1A', '#0D0D0D'] },
    { id: 'Portfolio74', title: 'Topographic Map', desc: 'Flowing elevation contours.', icon: Compass, color: ['#1E1E1E', '#121212'] },
    { id: 'Portfolio75', title: 'Circuitry HUD', desc: 'High-tech PCB traces & nodes.', icon: Activity, color: ['#050110', '#0D0221'] },
    { id: 'Portfolio76', title: 'Abstract Bauhaus', desc: 'Geometric grid modernist lines.', icon: Target, color: ['#F5F5F5', '#1D3557'] },
    { id: 'Portfolio77', title: 'Microchip Die', desc: 'Precision silicon wafer patterns.', icon: Cpu, color: ['#1F2937', '#111827'] },
    { id: 'Portfolio78', title: 'Noise Grain Noir', desc: 'Cinematic film grain & light leaks.', icon: Film, color: ['#111111', '#000000'] },
    { id: 'Portfolio79', title: 'Hexagonal Mesh', desc: 'Tactical sleek honeycomb mesh.', icon: Shield, color: ['#0F172A', '#38BDF8'] },
    { id: 'Portfolio80', title: 'Polar Radar', desc: 'Navigational radial scope grid.', icon: Orbit, color: ['#020617', '#FBBF24'] },
    { id: 'Portfolio81', title: 'Matrix Flow', desc: 'Cybernetic digital rain effect.', icon: Terminal, color: ['#001100', '#00FF41'] },
    { id: 'Portfolio82', title: 'Blueprint Sketch', desc: 'Architectural pencil sketch lines.', icon: PenTool, color: ['#FFFFFF', '#1E3A8A'] },
];

export function PortfolioDirectory({ navigation }) {
    const renderItem = ({ item, index }) => {
        const Icon = item.icon;
        return (
            <Animated.View
                entering={FadeInDown.delay(index * 100).duration(500)}
                style={styles.cardContainer}
            >
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate(item.id)}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={item.color}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.iconContainer}
                    >
                        <Icon size={24} color="#FFF" />
                    </LinearGradient>

                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDesc} numberOfLines={2}>
                            {item.desc}
                        </Text>
                    </View>
                    <Text style={styles.cardDesc} numberOfLines={2}>
                        {index + 1}
                    </Text>
                    <ChevronRight size={20} color="#64748B" />
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Animated.Text entering={FadeInUp.duration(600)} style={styles.headerTitle}>
                    My Portfolios
                </Animated.Text>
                <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.headerSubtitle}>
                    Explore 82 unique, high-end portfolio designs crafted with React Native.
                </Animated.Text>
            </View>

            <FlatList
                data={portfolios}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    header: {
        padding: 24,
        paddingTop: 40,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: '#F8FAFC',
        textAlign: 'center',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#94A3B8',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    cardContainer: {
        marginBottom: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#334155',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F1F5F9',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 18,
    }
});

export default function PersonalPortfolio() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'card' }}>
            <Stack.Screen name="Directory" component={PortfolioDirectory} />
            <Stack.Screen name="Portfolio1" component={Portfolio1} />
            <Stack.Screen name="Portfolio2" component={Portfolio2} />
            <Stack.Screen name="Portfolio3" component={Portfolio3} />
            <Stack.Screen name="Portfolio4" component={Portfolio4} />
            <Stack.Screen name="Portfolio5" component={Portfolio5} />
            <Stack.Screen name="Portfolio6" component={Portfolio6} />
            <Stack.Screen name="Portfolio7" component={Portfolio7} />
            <Stack.Screen name="Portfolio8" component={Portfolio8} />
            <Stack.Screen name="Portfolio9" component={Portfolio9} />
            <Stack.Screen name="Portfolio10" component={Portfolio10} />
            <Stack.Screen name="Portfolio11" component={Portfolio11} />
            <Stack.Screen name="Portfolio12" component={Portfolio12} />
            <Stack.Screen name="Portfolio13" component={Portfolio13} />
            <Stack.Screen name="Portfolio14" component={Portfolio14} />
            <Stack.Screen name="Portfolio15" component={Portfolio15} />
            <Stack.Screen name="Portfolio16" component={Portfolio16} />
            <Stack.Screen name="Portfolio17" component={Portfolio17} />
            <Stack.Screen name="Portfolio18" component={Portfolio18} />
            <Stack.Screen name="Portfolio19" component={Portfolio19} />
            <Stack.Screen name="Portfolio20" component={Portfolio20} />
            <Stack.Screen name="Portfolio21" component={Portfolio21} />
            <Stack.Screen name="Portfolio22" component={Portfolio22} />
            <Stack.Screen name="Portfolio23" component={Portfolio23} />
            <Stack.Screen name="Portfolio24" component={Portfolio24} />
            <Stack.Screen name="Portfolio25" component={Portfolio25} />
            <Stack.Screen name="Portfolio26" component={Portfolio26} />
            <Stack.Screen name="Portfolio27" component={Portfolio27} />
            <Stack.Screen name="Portfolio28" component={Portfolio28} />
            <Stack.Screen name="Portfolio29" component={Portfolio29} />
            <Stack.Screen name="Portfolio30" component={Portfolio30} />
            <Stack.Screen name="Portfolio31" component={Portfolio31} />
            <Stack.Screen name="Portfolio32" component={Portfolio32} />
            <Stack.Screen name="Portfolio33" component={Portfolio33} />
            <Stack.Screen name="Portfolio34" component={Portfolio34} />
            <Stack.Screen name="Portfolio35" component={Portfolio35} />
            <Stack.Screen name="Portfolio36" component={Portfolio36} />
            <Stack.Screen name="Portfolio37" component={Portfolio37} />
            <Stack.Screen name="Portfolio38" component={Portfolio38} />
            <Stack.Screen name="Portfolio39" component={Portfolio39} />
            <Stack.Screen name="Portfolio40" component={Portfolio40} />
            <Stack.Screen name="Portfolio41" component={Portfolio41} />
            <Stack.Screen name="Portfolio42" component={Portfolio42} />
            <Stack.Screen name="Portfolio43" component={Portfolio43} />
            <Stack.Screen name="Portfolio44" component={Portfolio44} />
            <Stack.Screen name="Portfolio45" component={Portfolio45} />
            <Stack.Screen name="Portfolio46" component={Portfolio46} />
            <Stack.Screen name="Portfolio47" component={Portfolio47} />
            <Stack.Screen name="Portfolio48" component={Portfolio48} />
            <Stack.Screen name="Portfolio49" component={Portfolio49} />
            <Stack.Screen name="Portfolio50" component={Portfolio50} />
            <Stack.Screen name="Portfolio51" component={Portfolio51} />
            <Stack.Screen name="Portfolio52" component={Portfolio52} />
            <Stack.Screen name="Portfolio53" component={Portfolio53} />
            <Stack.Screen name="Portfolio54" component={Portfolio54} />
            <Stack.Screen name="Portfolio55" component={Portfolio55} />
            <Stack.Screen name="Portfolio56" component={Portfolio56} />
            <Stack.Screen name="Portfolio57" component={Portfolio57} />
            <Stack.Screen name="Portfolio58" component={Portfolio58} />
            <Stack.Screen name="Portfolio59" component={Portfolio59} />
            <Stack.Screen name="Portfolio60" component={Portfolio60} />
            <Stack.Screen name="Portfolio61" component={Portfolio61} />
            <Stack.Screen name="Portfolio62" component={Portfolio62} />
            <Stack.Screen name="Portfolio63" component={Portfolio63} />
            <Stack.Screen name="Portfolio64" component={Portfolio64} />
            <Stack.Screen name="Portfolio65" component={Portfolio65} />
            <Stack.Screen name="Portfolio66" component={Portfolio66} />
            <Stack.Screen name="Portfolio67" component={Portfolio67} />
            <Stack.Screen name="Portfolio68" component={Portfolio68} />
            <Stack.Screen name="Portfolio69" component={Portfolio69} />
            <Stack.Screen name="Portfolio70" component={Portfolio70} />
            <Stack.Screen name="Portfolio71" component={Portfolio71} />
            <Stack.Screen name="Portfolio72" component={Portfolio72} />
            <Stack.Screen name="Portfolio73" component={Portfolio73} />
            <Stack.Screen name="Portfolio74" component={Portfolio74} />
            <Stack.Screen name="Portfolio75" component={Portfolio75} />
            <Stack.Screen name="Portfolio76" component={Portfolio76} />
            <Stack.Screen name="Portfolio77" component={Portfolio77} />
            <Stack.Screen name="Portfolio78" component={Portfolio78} />
            <Stack.Screen name="Portfolio79" component={Portfolio79} />
            <Stack.Screen name="Portfolio80" component={Portfolio80} />
            <Stack.Screen name="Portfolio81" component={Portfolio81} />
            <Stack.Screen name="Portfolio82" component={Portfolio82} />
        </Stack.Navigator>
    );
}