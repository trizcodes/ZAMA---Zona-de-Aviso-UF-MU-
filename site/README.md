# ZAMA - Zona de Aviso Manaus

O **ZAMA** é um site que permite aos usuários verificar e reportar o status de energia em sua unidade federativa(a minha no caso é Manaus) em tempo real. O objetivo principal é informar quais bairros estão sem luz, utilizando geolocalização e um mapa interativo para facilitar a visualização dos dados

## Funcionalidades

- **Visualizar Status de Energia**  
  - Obtém a localização do usuário
  - Realiza geocodificação reversa para extrair o nome do bairro
  - Simula o status de energia (70% de chance de haver energia) e exibe a mensagem personalizada com o nome do bairro (ex.: "Energia disponível em [Bairro]." ou "Sem energia em [Bairro].")
  - Desenha um círculo com raio no mapa, indicando a área com energia (amarelo) ou sem energia (cinza)

- **Reportar Apagão**  
  - Permite ao usuário reportar um apagão na sua área (necessário ter a localização ativada)
  - Registra o endereço completo, extrai o bairro e armazena a data/hora
  - Exibe o relato na seção "Relatos de Apagões" e desenha um círculo cinza no mapa para indicar a área afetada

- **Relatos de Apagões (Hoje)**  
  - Exibe apenas os relatos registrados para o dia atual
  - Permite ao usuário pesquisar relatos por bairro para facilitar a visualização

## Tecnologias Utilizadas

- **HTML5, CSS3, JavaScript** – Estrutura, estilos e lógica do site
- **Leaflet** – Biblioteca para exibição de mapas interativos
- **Nominatim (OpenStreetMap)** – API de geocodificação reversa para obter endereços e extrair o nome do bairro
- **Font Awesome** – Para os ícones utilizados no design
- **Google Fonts (Poppins)** – Fonte utilizada no layout

## Estrutura do Projeto

/zama ├── css │ └── style.css ├── html │ └── index.html └── js └── script.js


- **html/index.html**: Contém a estrutura principal do site
- **css/style.css**: Arquivo de estilos
- **js/script.js**: Lógica para geolocalização, verificação de energia, registro de apagões e atualização dos relatos

## Como Executar

1. Clone ou faça o download dos arquivos do projeto, mantendo a estrutura de pastas mostrada acima
2. Abra o arquivo `html/index.html` em seu navegador
3. Permita o acesso à sua localização quando solicitado
4. Utilize os botões:
   - **Visualizar status de energia em Manaus**: Para verificar o status de energia na sua área e ver o resultado no mapa
   - **Reportar que está sem luz**: Para registrar um apagão e atualizar a lista de relatos
5. Utilize o campo "Pesquisar por bairro" para filtrar os relatos registrados para o dia atual

## Observações

- A verificação do status de energia é simulada com uma chance de 70% de energia disponível
- Para uma aplicação em produção, seria necessário integrar uma API oficial para monitoramento do status de energia
- A geocodificação reversa utiliza o serviço Nominatim do OpenStreetMap

## Licença

Este projeto é de código aberto e pode ser utilizado e modificado conforme necessário
