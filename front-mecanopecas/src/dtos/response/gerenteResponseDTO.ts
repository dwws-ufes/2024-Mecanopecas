export interface GerenteResponseDTO {
    id: bigint;
    nome: string;
    cpf: string;
    emailInstituicional: string;
    dataPromocao: Date;
    percentualMaxDesconto: number;
}