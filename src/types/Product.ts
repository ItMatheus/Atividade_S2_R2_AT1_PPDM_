export interface Product{
    id?: number | string;
    nome: string;
    descricao: string;
    categoria?: string;
    preco: number;
    quantidade_estoque?: number;
    quantidade?: number;
    categoria_id?: number;
    status?: number;
    destaque?: boolean;
    marca?: string;
    modelo?: string;
    garantia_meses?: number;
}

// DTO -> Data Transfer Object ou Objeto de Transferência de Dados
// Definindo quais os dados nós vamos mandar para criar produto e atualizar
export interface CreateProductDTO {
    nome: string;
    descricao: string;
    categoria?: string;
    preco: number;
    quantidade_estoque?: number;
    quantidade?: number;
    categoria_id?: number;
    status?: number;
    destaque?: boolean;
}

export interface UpdateProductDTO {
    id?: number | string;
    nome: string;
    descricao: string;
    categoria?: string;
    preco: number;
    quantidade_estoque?: number;
    quantidade?: number;
    categoria_id?: number;
    status?: number;
    destaque?: boolean;
}