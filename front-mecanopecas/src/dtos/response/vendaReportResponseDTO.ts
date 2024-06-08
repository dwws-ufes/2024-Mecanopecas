import { VendaResponseDTO } from './vendaResponseDTO';

export interface VendaReportResponseDTO {
    titulo: string;
    solicitante: string;
    dataGeracao: Date;
    dataInicio: Date;
    dataFim: Date;
    dados: VendaResponseDTO[];
}
