import api from './axiosClient';
import { AxiosPromise, AxiosResponse, AxiosResponseHeaders, } from "axios";

const mockMarcas = ['Ford', 'Fiat', 'Chevrolet', 'Toyota', 'Honda'];
const mockModelos = {
    Ford: ['Fiesta', 'Focus', 'Mustang'],
    Fiat: ['500', 'Panda', 'Punto'],
    Chevrolet: ['Camaro', 'Spark', 'Cruze'],
    Toyota: ['Corolla', 'Camry', 'Prius'],
    Honda: ['Civic', 'Accord', 'Fit'],
};

export function searchMarcas(marca: string): AxiosPromise<string[]> {
    return api.get(`/api/dbpedia/marcas`, { params: { marca } });
}

export function searchModelosByMarca(marca: string, modelo: string): AxiosPromise<string[]> {
    return api.get(`/api/dbpedia/marcas/${marca}/modelos`, { params: { modelo } });
}

// export function searchMarca(filtro: string): AxiosPromise<string[]> {
//     return new Promise<AxiosResponse<string[]>>(resolve => {
//         setTimeout(() => {
//             const filteredMarcas = mockMarcas.filter(marca =>
//                 marca.toLowerCase().includes(filtro.toLowerCase())
//             );
//             resolve({ data: filteredMarcas, status: 200, statusText: 'OK', headers: {} as AxiosResponseHeaders, config: { headers: {} as AxiosResponseHeaders } });
//         }, 500);
//     });
// }

// export function searchModelo(marca: string, filtro: string): AxiosPromise<string[]> {
//     return new Promise<AxiosResponse<string[]>>(resolve => {
//         setTimeout(() => {
//             const modelos = mockModelos[marca as keyof typeof mockModelos] || [];
//             const filteredModelos = modelos.filter(modelo =>
//                 modelo.toLowerCase().includes(filtro.toLowerCase())
//             );
//             resolve({ data: filteredModelos, status: 200, statusText: 'OK', headers: {} as AxiosResponseHeaders, config: { headers: {} as AxiosResponseHeaders } });
//         }, 500);
//     });
//}