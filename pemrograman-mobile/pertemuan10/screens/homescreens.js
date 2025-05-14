import { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import tw from 'twrnc';
export const HomeScreen = () => {
  const [Note, setNote] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const db = useSQLiteContext();

  const loadNote = async () => {
    try {
      setIsLoading(true);
      const results = await db.getAllAsync(` SELECT * FROM note ORDER BY id DESC `);
      setNote(results);
    } catch (error) {
      console.error("Database error", error);
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

  return (
    <FlatList
      style={tw`p-4`}
      data={Note}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadNote}
          tintColor="#007AFF"
        />
      }
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={tw`bg-white dark:bg-gray-900 p-4 mb-4 rounded-xl shadow-md`}>
          <Text style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-1`}>
            {item.title}
          </Text>
          <Text style={tw`text-gray-700 dark:text-gray-300`}>
            {item.content}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={tw`text-center text-gray-500 mt-4`}>No note found</Text>
      }
    />
  );
};
export default HomeScreen;