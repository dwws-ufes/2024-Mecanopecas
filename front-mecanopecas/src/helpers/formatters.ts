export function formatCPF(cpf: string): string {
    const cleanedCPF = cpf.replace(/\D/g, '');
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    return cleanedCPF.replace(cpfRegex, '$1.$2.$3-$4');
}

export function formatCNPJ(cnpj: string): string {
    const cleanedCNPJ = cnpj.replace(/\D/g, ''); 
    const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
    return cleanedCNPJ.replace(cnpjRegex, '$1.$2.$3/$4-$5');
}