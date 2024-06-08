import { OrcamentoPecaResponseDTO } from './orcamentoPecaResponseDTO';

export interface OrcamentoDetailResponseDTO {
    id: bigint;
    codigo: string;
    clienteNome: string;
    vendedorNome: string;
    DataOrcamento: Date;
    dataExpiracao: Date;
    valor: number;
    percentualDesconto: number;
    valorTotal: number;
    pecas: OrcamentoPecaResponseDTO[];
    status: string;
}
