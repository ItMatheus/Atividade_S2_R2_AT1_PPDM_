import { useState, useEffect } from "react";
import { Modal, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from "react-native";

import { Product, CreateProductDTO, UpdateProductDTO } from "../types/Product";
import { stylesModal } from "../themes/ProductModal";

interface ProductModalProps{
    visible: boolean;
    productToEdit: Product | null;
    onClose: () => void;
    onSave: (
        productData: CreateProductDTO | UpdateProductDTO,
        id?: number | string,
    ) => Promise<void>
}

export const ProductModal = ({visible, productToEdit, onClose, onSave}: ProductModalProps)  => {

     // Campos para criar ou editar produtos
      const [nome, setNome] = useState("");
      const [descricao, setDescricao] = useState("");
      const [categoria, setCategoria] = useState("");
      const [preco, setPreco] = useState("");
      const [quantidade, setQuantidade] = useState("");
      const [loading, setLoading] = useState(false)
    
      const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
      const isEditing = !!productToEdit;

      
       useEffect(() => {
          if (productToEdit) {
            setNome(productToEdit.nome);
            setDescricao(productToEdit.descricao);
            setCategoria(
              productToEdit.categoria ||
              (productToEdit.categoria_id
                ? String(productToEdit.categoria_id)
                : "Eletrônicos"),
            );
            setPreco(
              productToEdit.preco !== undefined ? String(productToEdit.preco) : "",
            );
            setQuantidade(
              String(
                productToEdit.quantidade_estoque ?? productToEdit.quantidade ?? 0,
              ),
            );
          } else {
            setNome("");
            setDescricao("");
            setCategoria("Eletrônicos");
            setPreco("");
            setQuantidade("");
          }
      
          setErrors({});
        }, [productToEdit, visible]);

    
      const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
    
        if (!nome.trim()) {
          newErrors.nome = "O nome do produto é obrigatório.";
        }
    
        if (!descricao.trim()) {
          newErrors.descricao = "A descrição do produto é obrigatória.";
        }
    
        if (!categoria.trim()) {
          newErrors.categoria = "A categoria do produto é obrigatória.";
        }
    
        const numericPrice = parseFloat(preco.replace(",", "."));
        if (!preco.trim() || isNaN(numericPrice) || numericPrice <= 0) {
          newErrors.preco = "Informe um preço válido maior que zero";
        }
    
        const numericQty = parseInt(quantidade, 10);
        if (!quantidade.trim() || isNaN(numericQty) || numericQty <= 0) {
          newErrors.quantidade =
            "Informe uma quantidade de estoque válida (0 ou mais)";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleFormSubmit = async () => {
        if (!validate()) {
          return;
        }
    
        setLoading(true);
        try {
          const numericPrice = parseFloat(preco.replace(",", "."));
          const numericQty = parseInt(quantidade, 10);
    
          const payload = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            categoria: categoria.trim(),
            preco: numericPrice,
            quantidade: numericQty,
            quantidade_estoque: numericQty,
            categoria_id: productToEdit?.categoria_id || 1,
          };
          
          await onSave(payload, productToEdit?.id);
    
          window.alert(
            isEditing
              ? "Produto atualizado com sucesso"
              : "Produto cadastrado com sucesso"
          );
    
          onClose();
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Erro ao processar requisição";

            window.alert(`Erro na operação\n\n${errorMessage}`);;
        } finally {
          setLoading(false);
        }
      };

    return (
        <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <KeyboardAvoidingView style={stylesModal.overlay} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={stylesModal.modalContainer}>
          <View style={stylesModal.headerModal}>
            <Text style={stylesModal.headerTitle}>
              {isEditing ? "Editar Produto" : "Novo Produto"}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={stylesModal.closeButton}
            >
              <Text style={stylesModal.closeButtonText}>x</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={stylesModal.formContainer}>
            {/* Nome */}
            <View style={stylesModal.inputGroup}>
              <Text style={stylesModal.label}>Nome do Produto *</Text>
              <TextInput
                style={[stylesModal.input, errors.nome ? stylesModal.inputError : null]}
                placeholder="Ex: Smartphone Galaxy S23"
                placeholderTextColor="#94A3B8"
                value={nome}
                onChangeText={setNome}
              />
              {errors.nome ? (
                <Text style={stylesModal.errorText}>{errors.nome}</Text>
              ) : null}
            </View>

            {/* Descrição */}
            <View style={stylesModal.inputGroup}>
              <Text style={stylesModal.label}>Descrição *</Text>
              <TextInput
                style={[
                  stylesModal.input,
                  stylesModal.textArea,
                  errors.descricao ? stylesModal.inputError : null,
                ]}
                placeholder="Informe detalhes sobre o produto..."
                placeholderTextColor="#94A3B8"
                multiline={true}
                numberOfLines={3}
                value={descricao}
                onChangeText={setDescricao}
              />
              {errors.descricao ? (
                <Text style={stylesModal.errorText}>{errors.descricao}</Text>
              ) : null}
            </View>

            {/* Categoria */}
            <View style={stylesModal.inputGroup}>
              <Text style={stylesModal.label}>Categoria *</Text>
              <TextInput
                style={[
                  stylesModal.input,
                  errors.categoria ? stylesModal.inputError : null,
                ]}
                placeholder="Ex: Eletrônicos, Vestuário, Alimentos"
                placeholderTextColor="#94A3B8"
                value={categoria}
                onChangeText={setCategoria}
              />
              {errors.categoria ? (
                <Text style={stylesModal.errorText}>{errors.categoria}</Text>
              ) : null}
            </View>

            <View style={stylesModal.row}>
              {/* Preço */}
              <View style={[stylesModal.inputGroup, stylesModal.halfWidth]}>
                <Text style={stylesModal.label}>Preço (R$) *</Text>
                <TextInput
                  style={[
                    stylesModal.input,
                    errors.preco ? stylesModal.inputError : null,
                  ]}
                  placeholder="0.00"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  value={preco}
                  onChangeText={setPreco}
                />
                {errors.preco ? (
                  <Text style={stylesModal.errorText}>{errors.preco}</Text>
                ) : null}
              </View>

              {/* Quantidade */}
              <View style={[stylesModal.inputGroup, stylesModal.halfWidth]}>
                <Text style={stylesModal.label}>Estoque (Qtd) *</Text>
                <TextInput
                  style={[
                    stylesModal.input,
                    errors.quantidade ? stylesModal.inputError : null,
                  ]}
                  placeholder="0"
                  placeholderTextColor="#94A3B8"
                  keyboardType="number-pad"
                  value={quantidade}
                  onChangeText={setQuantidade}
                />
                {errors.quantidade ? (
                  <Text style={stylesModal.errorText}>{errors.quantidade}</Text>
                ) : null}
              </View>
            </View>
          </View>

          {/* Footer Actions */}
          <View style={stylesModal.footer}>
            <TouchableOpacity
              style={stylesModal.cancelBtn}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={stylesModal.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[stylesModal.saveBtn, loading ? stylesModal.saveBtnDisabled : null]}
              onPress={handleFormSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={stylesModal.saveBtnText}>
                  {isEditing ? "Atualizar" : "Cadastrar"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAvoidingView>    
      </Modal>
    )
}