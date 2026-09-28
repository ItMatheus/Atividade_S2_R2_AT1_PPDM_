import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
  Platform
} from "react-native";

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from "./src/types/Product";
import { productService } from "./src/services/productServices";
import { ProductCard } from "./src/components/ProductCard";
import { ProductModal } from "./src/components/ProductModal";

import { styles } from "./src/themes/styles";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Controle do Modal
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);


  // Carregar produtos da API
  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      window.alert("Erro ao carregar produtos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

 

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };
  // Abrir modal para criar um novo produto
  const handleOpenCreateModal = () => {
    setProductToEdit(null);
    setModalVisible(true);
  };
  // Abrir modal para editar um produto
  const handleOpenEditModal = (Product: Product) => {

    setProductToEdit(Product);
    setModalVisible(true);
  };

  // Salvar (Cadastrar ou Editar)
  const handleSaveProduct = async (
    productData: CreateProductDTO | UpdateProductDTO,
    id?: number | string,
  ) => {
    if (id !== undefined && id !== null) {
      
      await productService.updateProduct(id, productData);

    } else {
      
      await productService.createProduct(productData);
      
    }
    // Atualizar lista
    await fetchProducts();
  };

  // Excluir produto
  const handleDeleteProduct = async (Product: Product) => {
    if (!Product.id) return;
  
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir ${Product.nome}?`
    );
  
    if (!confirmar) return;
  
    try {
      setLoading(true);
  
      await productService.deleteProduct(Product.id);
  
      window.alert("Produto excluído com sucesso!");
  
      await fetchProducts();
    } catch (error) {
      console.error(error);
      window.alert("Erro ao excluir produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Produtos</Text>
          <Text style={styles.subtitle}>
            Gerenciamento de Estoque & Catálogo
          </Text>
        </View>
        <TouchableOpacity
          style={styles.newProductButton}
          onPress={handleOpenCreateModal}
        >
          <Text style={styles.newProductButtonText}>+ Novo Produto</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo Principal / Lista de Produtos */}
      {loading && refreshing ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) =>
            item.id ? String(item.id) : String(index)
          }
          renderItem={({ item }) => (
            <ProductCard
            Product={item}
            onDelete={handleDeleteProduct}
            onOpenModal={handleOpenEditModal}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📦</Text>
              <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
              <Text style={styles.emptySubtitle}>
                Clique no botão acima para cadastrar seu primeiro produto no
                sistema.
              </Text>
              <TouchableOpacity
                style={styles.emptyActionButton}
                onPress={handleOpenCreateModal}
              >
                <Text style={styles.emptyActionButtonText}>
                  Cadastrar Produto
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      <ProductModal
      visible={modalVisible}
      productToEdit={productToEdit}
      onClose={() => setModalVisible(false)}
      onSave={handleSaveProduct}
      />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}


