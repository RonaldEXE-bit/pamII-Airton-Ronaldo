import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCy6gltgiy3fwnT6OVbvZM2lpzZtN_qdsY",
    authDomain: "meu-primeiro-firebase-db2d4.firebaseapp.com",
    projectId: "meu-primeiro-firebase-db2d4",
    storageBucket: "meu-primeiro-firebase-db2d4.firebasestorage.app",
    messagingSenderId: "581990649171",
    appId: "1:581990649171:web:fbcad448ce927c33ff65a6",
    measurementId: "G-16S552PL8Q"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

export default function App() {

    const [nomes, setNomes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const nomesCollection = firebase.firestore().collection('Nomes');
                const snapshot = await nomesCollection.get();

                const data = [];
                snapshot.forEach((doc) => {
                    data.push({ 
                        id: doc.id, 
                        ...doc.data()
                    });
                });

                setNomes(data); 

            } catch (error) {
                console.error("Erro ao buscar dados no Firestore: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>[ ACESSO DE DADOS HACKEADOS ]</Text>
            
            {nomes.length === 0 ? (
                <Text style={styles.loadingText}>INICIANDO LEITURA DE DADOS...</Text>
            ) : (
                <FlatList
                    data={nomes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.text}>{item.Nome} {item.Sobrenome}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#111',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#00ff00',
        fontFamily: 'monospace',
        textShadowColor: '#00ff00',
        textShadowRadius: 8,
    },
    loadingText: {
        color: '#00aaff',
        fontFamily: 'monospace',
    },
    item: {
        padding: 10,
        marginVertical: 5,
    },
    text: {
        fontSize: 18,
        color: '#00ff00',
        fontFamily: 'monospace',
        textShadowColor: '#00ff00',
        textShadowRadius: 3,
    }
});