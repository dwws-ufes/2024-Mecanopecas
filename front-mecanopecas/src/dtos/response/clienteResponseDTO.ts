import { OrcamentoResponseDTO } from './orcamentoResponseDTO';

export interface ClienteResponseDTO {
    id: bigint;
    cpfCnpj: string;
    nome: string;
    orcamentos: OrcamentoResponseDTO[];
    dataNascimento: Date;
    ativo: boolean;
}
