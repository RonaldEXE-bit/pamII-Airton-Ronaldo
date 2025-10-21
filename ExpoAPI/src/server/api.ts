import axios from "axios";

export const api = axios.create({
    // AQUI ESTÁ O PONTO IMPORTANTE:
    // Você deve substituir o endereço IP abaixo pelo que aparece no SEU terminal.
    // O Rodrigo usou o dele como exemplo, mas o seu será diferente.
    baseURL: "http://192.168.2.107:8081" 
});