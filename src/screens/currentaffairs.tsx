import { View, Text, ScrollView, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "../components/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";

const LoadMoreItem = () => {
    console.log('load more data')
}


const Currentaffairs = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);

    const renderLoader = () => {
        return (
            loading ?
                <View style={{}}>
                    <ActivityIndicator size="large" color="#aaa" />
                </View> : null
        );
    };

    const LoadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    const getData = () => {
        setLoading(true);
        axios.get(`https://CompetativeQuiz.pythonanywhere.com/quiz/Currentapi/?page=${currentPage}`)
            .then(res => {
                setData([...data, ...res.data.results]);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         loading(true)
    //         axios.get(`https://CompetativeQuiz.pythonanywhere.com/quiz/Currentapi/?page=${currentPage}`)
    //             .then(res => {
    //                 setData([...data, ...res.data.results]);
    //                 setLoading(false);
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //                 setLoading(false);
    //             });
    //     }, 3000);

    //     return () => {
    //         clearTimeout(timeoutId);
    //     };
    // }, [currentPage]);

    useEffect(() => {
        getData()
    }, [currentPage])

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
                        keyExtractor={item => item.question}
                        onEndReached={LoadMoreItem}
                        onEndReachedThreshold={0}
                        ListFooterComponent={renderLoader}
                    />
                </ScrollView>
            )}
        </View>
    )
}

export default Currentaffairs;