export interface OrcamentoResponseDTO {
    id: bigint;
    codigo: string;
    clienteNome: string;
    dataOrcamento: Date;
    dataExpiracao: Date;
    status: string;
}
