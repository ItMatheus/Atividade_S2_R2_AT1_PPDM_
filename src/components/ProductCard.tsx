import { View,Text, TouchableOpacity } from "react-native";
import { Product } from "../types/Product";

import { stylesCard } from "../themes/ProductCard";

interface ProductCardProps{
    Product: Product;
    onDelete: (Product: Product) => void;
    onOpenModal: (Product: Product) => void
}

export const ProductCard = ({Product, onDelete, onOpenModal}: ProductCardProps) => {


    const formatPrice = (value: number) => {
        // Intl -> Objeto nativo do JS que serve para formatar dados de acordo com
        // o idioma e região.
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value || 0);
      };

    return (
        <View style={stylesCard.card}>
              <View style={stylesCard.headerRow}>
                <View>
                  <Text style={stylesCard.productName}>{Product.nome}</Text>
                  <Text style={stylesCard.categoryBadgeText}>{Product.categoria}</Text>
                </View>
                <Text style={stylesCard.priceText}>
                  {formatPrice(Number(Product.preco))}
                </Text>
              </View>

              <Text style={stylesCard.descriptionText}>
                {Product.descricao || "Sem descrição cadastrada."}
              </Text>

              <View style={stylesCard.footerRow}>
                <View style={stylesCard.stockContainer}>
                  <View
                    style={[
                      stylesCard.stockDot,
                      Number(Product.quantidade_estoque ?? Product.quantidade ?? 0) >
                        0
                        ? stylesCard.stockDotActive
                        : stylesCard.stockDotEmpty,
                    ]}
                  />
                  <Text style={stylesCard.stockText}>
                    {" "}
                    Estoque:
                    <Text style={stylesCard.stockValue}>
                      {" "}
                      {Product.quantidade} un.
                    </Text>
                  </Text>
                </View>

                <View style={stylesCard.actionsContainer}>
                  <TouchableOpacity
                    style={[stylesCard.actionButton, stylesCard.editButton]}
                    onPress={() => onOpenModal(Product)}
                  >
                    <Text style={stylesCard.editButtonText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[stylesCard.actionButton, stylesCard.deleteButton]}
                    onPress={() => onDelete(Product)}
                  >
                    <Text style={stylesCard.deleteButtonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
    );
}