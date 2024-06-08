import api from '../repositories/api';
import {AxiosPromise} from "axios";
import {useQuery} from "@tanstack/react-query";
import {orcamentoDTO} from "../dtos/orcamentosDTO.ts";

const fetchData = async (): AxiosPromise<orcamentoDTO[]> => {
    return await api.get('/orcamentos');
}

export function useOrcamento() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['fetch-data'],
        retry: 2
    });

    return  {
        ...query,
        data: query.data?.data
    }
}