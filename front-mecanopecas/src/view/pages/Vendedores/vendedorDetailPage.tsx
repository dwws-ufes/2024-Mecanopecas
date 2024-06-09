import React from 'react';
import { useParams } from 'react-router-dom';
import { useVendedor } from '../../../hooks/vendedorHooks';

function VendedorDetailPage() {
    const { id } = useParams();
    const { vendedorData, vendedorLoading, vendedorError } = useVendedor(BigInt(id ?? ""));

    if (vendedorLoading) return <div>Loading...</div>;
    if (vendedorError) return <div>Error fetching data</div>;

    return (
        <div>
            <h1>Vendedor Details</h1>
            <p>Name: {vendedorData?.nome}</p>
            <p>Email: {vendedorData?.emailInstitucional}</p>
            <p>CPF: {vendedorData?.cpf}</p>
            <p>Telefone: {vendedorData?.telefone}</p>
            <p>Data de Nascimento: {vendedorData?.dataNascimento?.toLocaleDateString()}</p>
            <p>Ativo: {vendedorData?.ativo ? 'Sim' : 'Não'}</p>
        </div>
    );
}

export default VendedorDetailPage;
