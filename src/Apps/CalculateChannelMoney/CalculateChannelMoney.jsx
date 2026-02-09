import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";

const CHANNEL_CAP = 1000;

const CalculateChannelMoney = () => {
    const [videos, setVideos] = useState("1000");
    const [withdrawn, setWithdrawn] = useState("0");

    const calculateEarnings = () => {
        const v = Number(videos);
        const w = Number(withdrawn);

        let gross = 0;
        let remaining = v;

        // Slab 1 – first 100 videos
        const slab1 = Math.min(remaining, 100);
        gross += slab1 * 0.10;
        remaining -= slab1;

        // Slab 2 – next 200 videos
        if (remaining > 0) {
            const slab2 = Math.min(remaining, 200);
            gross += slab2 * 0.50;
            remaining -= slab2;
        }

        // Slab 3 – next 300 videos
        if (remaining > 0) {
            const slab3 = Math.min(remaining, 300);
            gross += slab3 * 0.80;
            remaining -= slab3;
        }

        // Slab 4 – remaining videos
        if (remaining > 0) {
            gross += remaining * 3.50;
        }

        // Apply channel cap
        const totalEarned = Math.min(gross, CHANNEL_CAP);

        // Available balance
        const available = totalEarned - w;

        return {
            gross: gross.toFixed(2),
            totalEarned: totalEarned.toFixed(2),
            available: available.toFixed(2),
        };
    };

    const result = calculateEarnings();

    //   CHANNEL PAYOUT RULES & EARNINGS LOGIC

    // 1. Channel-Level Payout Rule

    // Each channel has a fixed payout cap.

    // For 1,00,000 views, the maximum payable amount per channel is ₹1,000.

    // If a channel crosses 1,00,000 views, the payout will still remain ₹1,000.

    // This payout cap is mandatory and non-negotiable.

    // 2. Video Upload Details

    // A channel can upload paid videos.

    // The maximum number of paid videos per channel is 1,000.

    // 3. Video Cost Slabs

    // Video earnings are defined according to the following slabs:

    // First 100 videos

    // ₹0.10 per video

    // 100 views per video ???

    // Next 200 videos

    // ₹0.50 per video

    // 150 views per video

    // Next 300 videos

    // ₹0.80 per video

    // 200 views per video

    // Remaining videos

    // ₹3.50 per video

    // 100 views per video

    // Each slab has fixed views per video and a fixed payout per video.

    // 4. Earnings & Wallet Definitions

    // Total Earned in Channel
    // → Total amount credited to the channel after applying the channel payout cap.

    // Total Withdrawn Amount
    // → Total amount already withdrawn by the channel owner.

    // Total Available Balance
    // → Remaining balance after withdrawals.



    // //total earning money of channel

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Channel Earnings Calculator</Text>

            <Text style={styles.label}>Total Paid Videos Uploaded</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={videos}
                onChangeText={setVideos}
                placeholder="e.g. 1000"
            />

            <Text style={styles.label}>Total Withdrawn Amount (₹)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={withdrawn}
                onChangeText={setWithdrawn}
                placeholder="e.g. 300"
            />

            <View style={styles.card}>
                <Text style={styles.result}>
                    Gross Earning (before cap): ₹{result.gross}
                </Text>

                <Text style={styles.result}>
                    Total Earned (after cap): ₹{result.totalEarned}
                </Text>

                <Text style={styles.result}>
                    Available Balance: ₹{result.available}
                </Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Auto Calculated</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CalculateChannelMoney;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 120,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    label: {
        marginTop: 10,
        fontWeight: "600",
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 15,
        borderRadius: 10,
        elevation: 3,
    },
    result: {
        fontSize: 16,
        marginVertical: 4,
    },
    button: {
        marginTop: 15,
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
