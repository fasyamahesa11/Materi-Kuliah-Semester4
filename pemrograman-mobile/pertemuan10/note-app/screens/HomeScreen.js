import { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import tw from 'twrnc';
import { Swipeable } from 'react-native-gesture-handler';
import { deleteNote } from '../database'
export const HomeScreen = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const db = useSQLiteContext();

    const loadNote = async () => {
        try {
            setIsLoading(true);
            const results = await db.getAllAsync('SELECT * FROM note ORDER BY id DESC');
            setNotes(results);
        } catch (error) {
            console.error('Database error', error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadNote();
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const handleDelete = (id) => {
        Alert.alert("Konfirmasi", "Apakah Anda yakin ingin menghapus catatan ini?", [
            { text: "Batal", style: "cancel" },
            {
                text: "Hapus",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteNote(db, id);
                        loadNote();
                    } catch (error) {
                        console.error("Delete error", error);
                    }
                },
            },
        ]);
    };
    const renderRightActions = (id) => (
        <TouchableOpacity
            onPress={() => handleDelete(id)}
            style={tw`bg-red-600 justify-center items-center w-20 h-full rounded-r-xl`}
        >
            <Text style={tw`text-white font-bold`}>Hapus</Text>
        </TouchableOpacity>
    );
    return (
        <FlatList style={tw`p-4`} data={notes} refreshControl={<RefreshControl
            refreshing={isLoading}
            onRefresh={loadNote}
            tintColor="#007AFF"
        />
        }
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                    <View style={tw`bg-white dark:bg-gray-900 p-4 mb-4 rounded-xl shadow-md`}>
                        <Text style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-1`}>
                            {item.tittle}
                        </Text>
                        <Text style={tw`text-gray-700 dark:text-gray-300`}>
                            {item.content}
                        </Text>
                    </View>
                </Swipeable>
            )}
            ListEmptyComponent={
                <View>
                    <Text style={tw`text-center text-gray-500 mt-4`}>No note found</Text>
                </View>
            }
        />
    );
};
export default HomeScreen;