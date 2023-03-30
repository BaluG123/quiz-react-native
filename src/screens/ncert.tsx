import { View, Text, ScrollView, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { styles } from "../components/styles";
import axios from "axios";

const Ncert = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetch('https://CompetativeQuiz.pythonanywhere.com/quiz/ncertapi')
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);


    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#1DA1F2" />
            ) : (
                <ScrollView>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) =>
                            <View style={styles.container}>
                                <Text style={styles.questionText}>{`${index + 1}. ${item.question}`}</Text>
                                <Text style={styles.answerText}><MaterialIcons name="arrow-right-alt" size={30} style={styles.arrowIcon} />{item.answer}</Text>
                            </View>
                        }
                    />
                </ScrollView>
            )}
        </View>
    )
}

export default Ncert;


