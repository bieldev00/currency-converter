const convertButton = document.querySelector('.convert-button');
const currencySelect = document.querySelector('.currency-select');

const convertValues = async () => {
    const inputCurrencyValue = Number(document.querySelector('.input-currency').value || 0);
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert');
    const currencyValueConverted = document.querySelector('.currency-value');

    const data = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL') // o fetch serve para fazer requisições HTTP, neste caso, para obter os dados de câmbio do dólar e do euro em relação ao real
        .then(response => response.json());

    const dolar = Number(data.USDBRL.high);
    const euro = Number(data.EURBRL.high);

    currencyValueToConvert.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(inputCurrencyValue);

    if (currencySelect.value === 'dolar') {
        currencyValueConverted.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(inputCurrencyValue / dolar);
    }

    if (currencySelect.value === 'euro') {
        currencyValueConverted.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
        }).format(inputCurrencyValue / euro);
    }
};

function ChangeCurrency() {
    const currencyName = document.getElementById('currency-name');
    const currencyImage = document.querySelector('.currency-img');

    if (currencySelect.value === 'dolar') {
        currencyName.innerHTML = 'Dólar Americano';
        currencyImage.src = './assets/logo-EUA.png';
    }

    if (currencySelect.value === 'euro') {
        currencyName.innerHTML = 'Euro';
        currencyImage.src = './assets/logo-Euro.png';
    }

    convertValues();
}

currencySelect.addEventListener('change', ChangeCurrency);
convertButton.addEventListener('click', convertValues);

/* 
innerHTML é uma propriedade que permite acessar ou modificar o conteúdo HTML de um elemento.

Intl.NumberFormat é um objeto global em JavaScript que fornece uma maneira de formatar números de acordo com as convenções de um idioma específico. Ele é usado para formatar números como moeda, porcentagem, ou simplesmente para exibir números com separadores de milhares e casas decimais de acordo com as regras do idioma escolhido.

*/