import api from "../api/api"
import { Product, CreateProductDTO, UpdateProductDTO } from "../types/Product"

export const productService = {

    // Buscar todos os produtos
    async getProducts(): Promise<Product[]>{
        const response = await api.get('/products?limit=99999')

        // Array.isArray() -> serve para descobrir se um valor ou objeto passado
        // realmente é um array
        // Verificações para diferentes tipos de estruturas de respostas
        if (Array.isArray(response.data)){
            return response.data
        }

        if(response.data && Array.isArray(response.data.data)){
            return response.data.data
        }

        if(response.data && Array.isArray(response.data.produtos)){
            return response.data.produtos
        }


        return []

    },

    // Cadastrar um novo produto
    async createProduct(productData: CreateProductDTO): Promise<Product> {
        const payload = {
            ...productData,
            preco: Number(productData.preco),
            quantidade_estoque: Number(productData.quantidade),
            quantidade: Number(productData.quantidade),
            categoria_id: productData.categoria_id || 1,
            status: productData.status ?? 1,
            destaque: productData.destaque ?? false
        }


        const response = await api.post('/products', payload)
        return response.data
    },

    // Atualizar um produto
    async updateProduct(id: number | string, productData: UpdateProductDTO): Promise<Product> {
        const payload = {
            ...productData,
            preco: Number(productData.preco),
            quantidade_estoque: Number(productData.quantidade),
            quantidade: Number(productData.quantidade),
            categoria_id: productData.categoria_id || 1,
            status: productData.status ?? 1,
            destaque: productData.destaque ?? false
        }
        console.log(id)
        const response = await api.put(`/products/${id}`, payload)
        return response.data
    },

    // Excluir um produto
    async deleteProduct(id: number | string): Promise<void>{
        await api.delete(`/products/${id}`)
    }

}