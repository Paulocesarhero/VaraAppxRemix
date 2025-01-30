import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";

const ImageDebugger = () => {
  const [files, setFiles] = useState<string[]>([]);

  const listFiles = async () => {
    const directory = `${FileSystem.documentDirectory}VaraAppx/`;
    const fileList = await FileSystem.readDirectoryAsync(directory);
    setFiles(fileList.map((file) => directory + file));
  };

  useFocusEffect(
    useCallback(() => {
      listFiles();
    }, [])
  );

  return (
    <ScrollView>
      {files.map((file, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 12, marginBottom: 5 }}>{file}</Text>
          <Image source={{ uri: file }} style={{ width: 200, height: 200 }} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ImageDebugger;
