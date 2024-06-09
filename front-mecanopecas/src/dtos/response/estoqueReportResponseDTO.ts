import { PecaResponseDTO } from './pecaResponseDTO';

export interface EstoqueReportResponseDTO {
    titulo: string;
    solicitante: string;
    dataGeracao: Date;
    dados: PecaResponseDTO[];
}
