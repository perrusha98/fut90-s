import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import ScreenLoading from "@screens/Loading/Screen";
import AdMobBanner from "@components/admob/banner";

const RSSFeedScreen = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("121864");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPosts = (categoryId, pageNumber) => {
    const url = `https://golazoz.com/wp-json/wp/v2/posts/?_fields=id,title,tagline,date,format,content,_links.wp:featuredmedia&_embed&per_page=6&categories=${categoryId}&page=${pageNumber}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((posts) => {
        setData((prevData) => [...prevData, ...posts]);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    setData([]); // Reset data on category change
    setPage(1); // Reset page on category change
    fetchPosts(selectedCategory, 1); // Fetch first page on category change
  }, [selectedCategory]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(selectedCategory, nextPage);
  };

  const navigation = useNavigation();

  const navigateToDetail = (item) => {
    const { title, content, _embedded, date } = item;
    const imageUrl = _embedded["wp:featuredmedia"][0].source_url;

    navigation.navigate("Details-Stack", {
      title: title.rendered,
      contentEncoded: content.rendered,
      imageUrl: imageUrl,
      date: date
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ScreenLoading />
        </View>
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>NOTICIAS</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  style={styles.categoriesContainer}
                >
                  <TouchableOpacity 
                    style={[styles.categoryButton, selectedCategory === "121864" && styles.selectedCategory]} 
                    onPress={() => {
                      setSelectedCategory("121864");
                      setLoading(true);
                    }}
                  >
                    <Text style={[styles.categoryText, selectedCategory === "121864" && styles.selectedCategoryText]}>LIGA MX</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.categoryButton, selectedCategory === "121850" && styles.selectedCategory]} 
                    onPress={() => {
                      setSelectedCategory("121850");
                      setLoading(true);
                    }}
                  >
                    <Text style={[styles.categoryText, selectedCategory === "121850" && styles.selectedCategoryText]}>PREMIER LEAGUE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.categoryButton, selectedCategory === "121859" && styles.selectedCategory]} 
                    onPress={() => {
                      setSelectedCategory("121859");
                      setLoading(true);
                    }}
                  >
                    <Text style={[styles.categoryText, selectedCategory === "121859" && styles.selectedCategoryText]}>CHAMPIONS LEAGUE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.categoryButton, selectedCategory === "121863" && styles.selectedCategory]} 
                    onPress={() => {
                      setSelectedCategory("121863");
                      setLoading(true);
                    }}
                  >
                    <Text style={[styles.categoryText, selectedCategory === "121863" && styles.selectedCategoryText]}>LALIGA (ESPAÑA)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.categoryButton, selectedCategory === "121843" && styles.selectedCategory]} 
                    onPress={() => {
                      setSelectedCategory("121843");
                      setLoading(true);
                    }}
                  >
                    <Text style={[styles.categoryText, selectedCategory === "121843" && styles.selectedCategoryText]}>COPA LIBERTADORES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.categoryButton, selectedCategory === "121858" && styles.selectedCategory]} 
                    onPress={() => {
                      setSelectedCategory("121858");
                      setLoading(true);
                    }}
                  >
                    <Text style={[styles.categoryText, selectedCategory === "121858" && styles.selectedCategoryText]}>BUNDESLIGA</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.categoryButton, selectedCategory === "121849" && styles.selectedCategory]} 
                    onPress={() => {
                      setSelectedCategory("121849");
                      setLoading(true);
                    }}
                  >
                    <Text style={[styles.categoryText, selectedCategory === "121849" && styles.selectedCategoryText]}>MLS</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToDetail(item)}>
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.title.rendered}</Text>
                      <Text style={styles.date}>{formatDate(item.date)}</Text>
                    </View>
                    {item._embedded["wp:featuredmedia"] && (
                      <Image
                        source={{
                          uri: item._embedded["wp:featuredmedia"][0].source_url,
                        }}
                        style={styles.featuredImage}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <TouchableOpacity 
                style={styles.loadMoreButton}
                onPress={loadMore}
              >
                <Text style={styles.loadMoreText}>CARGAR MÁS NOTICIAS</Text>
              </TouchableOpacity>
            }
            style={styles.dynamicScreen}
          />
        </>
      )}

      <View style={{ maxWidth: "100%" }}>
        <AdMobBanner bannerType="AnchorBanner" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#3c0001", // Rojo extremadamente oscuro casi negro
  },
  dynamicScreen: {
    width: "100%",
  },
  headerContainer: {
    backgroundColor: "#550000", // Rojo oscuro para diferenciación
    paddingTop: 10,
    paddingBottom: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#3a0a0a', // Rojo oscuro
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  categoriesContainer: {
    paddingLeft: 10,
    paddingRight: 5,
    marginBottom: 5,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#fff", // Fondo blanco para botones
    borderWidth: 1,
    borderColor: '#661414', // Borde rojo para mejorar visibilidad
  },
  selectedCategory: {
    backgroundColor: '#b50006', // Rojo fuerte
    borderColor: '#FF0800', // Rojo brillante
  },
  categoryText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 13,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  date: {
    color: "#aaa",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#4d101a", // Rojo oscuro para diferenciación
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#661414', // Borde rojo para mayor contraste
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  featuredImage: {
    width: 100,
    height: 70,
    borderRadius: 6,
    marginLeft: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    width: "100%",
  },
  loadMoreButton: {
    backgroundColor: '#b40004', // Rojo fuerte
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
    marginVertical: 20,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  imageBackground: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.2,
  },
});

export default RSSFeedScreen;
