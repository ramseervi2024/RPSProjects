import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';

export default function LikedScreen({ liked, theme }) {
    if (liked.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: theme.text, fontSize: 18 }}>
                    No Pokémon liked yet 💔
                </Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text
                style={{
                    color: theme.text,
                    fontSize: 22,
                    marginBottom: 10,
                    textAlign: 'center',
                }}
            >
                Pokémon you liked ❤️
            </Text>

            <FlatList
                data={liked}
                keyExtractor={(item) => item?.id?.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            margin: 10,
                            padding: 10,
                            borderRadius: 12,
                            backgroundColor: theme.card,
                            alignItems: 'center',
                        }}
                    >

                        <SvgUri
                            uri={item.image}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                            width={100}
                            height={100}
                        />
                        <Text style={{ color: theme.text, marginTop: 6 }}>
                            {item.name}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}
