import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MapPin, Compass, Sun, Droplet, Users, BookOpen, DollarSign, Airplay } from 'lucide-react-native';

export default function SecondWelcomePage() {
    const { width } = useWindowDimensions();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.heroContainer}>
                <Image
                    source={{ uri: 'https://api.a0.dev/assets/image?text=beautiful%20rajasthani%20village%20landscape%20with%20traditional%20houses%20and%20desert%20sunset&aspect=16:9' }}
                    // source={require('../Images/talab1.jpeg')}
                    style={[styles.heroImage, { width, height: width * 0.7 }]}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(11, 1, 1, 0.8)']}
                    style={styles.gradient}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 40 }}>
                        <Text style={styles.heroTitle}>Welcome to Surayata</Text>
                        <Text style={styles.heroSubtitle}>Surayata Village: Explore & Discover</Text>
                    </View>
                </LinearGradient>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.infoCard}>
                    <MapPin size={24} color="#E6B17E" />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>Location</Text>
                        <Text style={styles.infoDescription}>Sojat Tehsil, Pali District, Rajasthan</Text>
                        <Text style={styles.infoSubtext}>Coordinates: 25.9245° N, 73.5219° E</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Compass size={24} color="#E6B17E" />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>Nearby Villages</Text>
                        <Text style={styles.infoDescription}>Dhakari (8 km), Jhupelao (9 km), Shivpura (11 km), Jadan (13 km), Chadwas (15 km)</Text>
                    </View>
                </View>

                <View style={styles.climateSection}>
                    <Text style={styles.sectionTitle}>About Surayta</Text>
                    <Text style={styles.description}>
                        Surayta is a village located in the Sojat tehsil of Pali district in Rajasthan, India, about 31 km north of the district headquarters.
                        The village has a rich historical and cultural heritage, with landmarks such as a 1,000-year-old Shiva temple and a 1,200-year-old water harvesting structure.
                    </Text>
                </View>

                <View style={styles.climateSection}>
                    <Text style={styles.sectionTitle}>Climate</Text>
                    <View style={styles.climateCard}>
                        <Sun size={24} color="#E6B17E" />
                        <Text style={styles.climateText}>Hot semi-arid climate with temperatures reaching up to 45°C in summer</Text>
                    </View>
                    <View style={styles.climateCard}>
                        <Droplet size={24} color="#E6B17E" />
                        <Text style={styles.climateText}>Mild winters with temperatures dropping to around 0°C</Text>
                    </View>
                </View>
                <View style={styles.climateSection}>
                    <Text style={styles.sectionTitle}>Demographics</Text>
                    <View style={[styles.climateCard]}>
                        <Users size={24} color="#E6B17E" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.climateText}>Population: 3200+ (as of 2011 Census)</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.climateSection}>
                    <Text style={styles.sectionTitle}>Connectivity</Text>
                    <View style={[styles.climateCard]}>
                        <Airplay size={24} color="#E6B17E" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.connectivityText}><Text style={styles.waittext}>Nearest Airport: </Text>Jodhpur (59 km away)</Text>
                            <Text style={styles.connectivityText}><Text style={styles.waittext}>Nearest Rail Station:  </Text>Sojat Road, Marwar Junction, Pali</Text>
                            <Text style={styles.connectivityText}><Text style={styles.waittext}>Highways: </Text> Accessible via NH58 and NH62</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.climateSection}>
                    <Text style={styles.sectionTitle}>Economy</Text>
                    <View style={[styles.climateCard]}>
                        <DollarSign size={24} color="#E6B17E" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.economyText}>Agriculture is the primary occupation, with crops like millets, cotton, and pulses</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.climateSection}>
                    <Text style={styles.sectionTitle}>Education & Infrastructure</Text>
                    <View style={[styles.climateCard]}>
                        <BookOpen size={24} color="#E6B17E" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.educationText}>Basic educational facilities available, including government schools</Text>
                            <Text style={styles.educationText}>Basic healthcare centers, markets, and transportation services available</Text>                        </View>
                    </View>
                </View>
                <View style={[styles.climateSection, { alignItems: 'center', }]}>
                    <Text style={styles.temperature}>36°C</Text>
                    <Text style={styles.weatherDescription}>Partly Cloudy</Text>
                    <Text style={styles.weatherLocation}>Green Valley Village</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF6F1',
    },
    heroContainer: {
        position: 'relative',
    },
    heroImage: {
        resizeMode: 'cover',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        justifyContent: 'flex-end',
    },
    heroTitle: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    heroSubtitle: {
        color: '#fff',
        fontSize: 18,
        marginTop: 4,
    },
    contentContainer: {
        padding: 20,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoTextContainer: {
        marginLeft: 15,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    infoDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    infoSubtext: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    highlightsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    climateSection: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    climateCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    climateText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
    },
    demographicsSection: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    demographicsCard: {
        flexDirection: 'column',
        marginTop: 10,
    },
    demographicsText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
    },
    connectivitySection: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    connectivityCard: {
        flexDirection: 'column',
        marginTop: 10,
    },
    connectivityText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
    },
    waittext: {
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
        fontWeight: '700'
    },
    economySection: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    economyCard: {
        flexDirection: 'column',
        marginTop: 10,
    },
    economyText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
    },
    educationSection: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    educationCard: {
        flexDirection: 'column',
        marginTop: 10,
    },
    educationText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
    },
    weatherCard: {
        backgroundColor: '#f0fdf4',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    temperature: {
        fontSize: 36,
        fontFamily: 'Inter_700Bold',
        color: '#166534',
        marginBottom: 8,
    },
    weatherDescription: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
        color: '#166534',
        marginBottom: 4,
    },
    weatherLocation: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#166534',
    },
});

