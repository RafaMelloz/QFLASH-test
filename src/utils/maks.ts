export const maskMoney = (value: string): string => {
    // Remove caracteres não numéricos
    const cleanValue = value.replace(/\D/g, '');

    // Formata para moeda
    const formattedValue = (Number(cleanValue) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return formattedValue;
};

export const maskCep = (value: string): string => {
    // Remove caracteres não numéricos
    const cleanValue = value.replace(/\D/g, '');

    // Adiciona o hífen após os 5 primeiros números
    const formattedValue = cleanValue.length > 5
        ? cleanValue.slice(0, 5) + '-' + cleanValue.slice(5, 8)
        : cleanValue;

    // Retorna o valor formatado
    return formattedValue;
};
