import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import ExpertCard from '../components/ExpertCard';
import { expertsData } from '../data/experts';

const ExpertAdviceScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="Ask an Expert" />
            <ScrollView style={styles.content}>
                <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>Get Expert Help! 👨‍🌾</Text>
                    <Text style={styles.bannerDesc}>Connect with agricultural scientists for personalized advice.</Text>
                    <TouchableOpacity style={styles.askButton}>
                        <Text style={styles.askButtonText}>Ask a Question</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Available Experts</Text>
                {expertsData.map((expert) => (
                    <ExpertCard key={expert.id} expert={expert} />
                ))}

                <Text style={styles.sectionTitle}>Recent Discussions</Text>
                <View style={styles.chatPreview}>
                    <View style={styles.chatHeader}>
                        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
                        <View>
                            <Text style={styles.chatUser}>Dr. Ramesh Kumar</Text>
                            <Text style={styles.chatTime}>2 hours ago</Text>
                        </View>
                    </View>
                    <Text style={styles.chatMsg}>"For wheat blight, use Propiconazole fungicide 1ml/liter water spray..."</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    content: {
        padding: 16,
    },
    banner: {
        backgroundColor: '#16A34A',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        alignItems: 'center'
    },
    bannerTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8
    },
    bannerDesc: {
        color: '#DCFCE7',
        textAlign: 'center',
        marginBottom: 16
    },
    askButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24
    },
    askButtonText: {
        color: '#16A34A',
        fontWeight: 'bold',
        fontSize: 16
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 12
    },
    chatPreview: {
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 16,
        marginBottom: 30
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    chatUser: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    chatTime: {
        color: '#9CA3AF',
        fontSize: 12
    },
    chatMsg: {
        color: '#D1D5DB',
        fontStyle: 'italic'
    }
});

export default ExpertAdviceScreen;
