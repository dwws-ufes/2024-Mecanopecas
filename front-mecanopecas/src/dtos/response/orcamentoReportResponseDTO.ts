import { OrcamentoResponseDTO } from './orcamentoResponseDTO';

export interface OrcamentoReportResponseDTO {
    titulo: string;
    solicitante: string;
    dataGeracao: Date;
    dataInicio: Date;
    dataFim: Date;
    dados: OrcamentoResponseDTO[];
}
