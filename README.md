# MyFullstackApp
App para registro de atendimento para setor de serviço - React + Nodejs

O app foi desenvolvido pensando numa solução que facilitasse o trabalho de prestadores de serviço, como manicures, cabelereiros, tatuadores, entre outros. É possível se cadastrar, fazer login com senha criptografada e token que expira em 8 horas, registrar atendimentos, cadastrar tipos de serviço, alterar valores ou "apagar" serviços, cadastrar novos funcionários, "deletar" (demitir) funcionários, e por último, visualizar as informações de forma dinâmica via gráficos e dashboards. Não é usado rotas de delete nesse script pois de fato as informações não sao deletadas, pois é preciso manter o histórico das alterações para exibir na aba de dashboards.

O roteamento, tanto no front quanto no back, está visualmente bem fácil de se entender. As pastas estão organizadas de forma bem semântica e o código está bem isolado para facilitar testes unitários e identificação de erros.

É encontrado fora dos dois diretórios principais o dump.sql desse projeto. Esse é o schema do banco de dados utilizado no projeto. Foi feito da forma mais otimazada possível, salietando a necessidade/importância de nunca APAGAR um registro, pois disponibiliza gráficos que apresetam dados históricos. Logo, é necessários saber o preço e os funcionários pré-alterações. Ah, o motivo de ter desenvolvido em Postgres é puramente pensando na leveza desse banco de dados. 

- Necessário react-dom versão 18.2.0 ou superior.
- Para esse app, utilizei banco de dados Postgres, então caso não queira fazer alterações, é necessário tê-lo instalado.
- Preparar o arquivo .env com as conexões no banco e algumas informções pro script, como porta utilizada para a rota http.

- Bibliotecas no frontend: axios; chart.js; react-data-grid; react-input-mask; react-toastify e as bibliotecas padrão do react.
- Bibliotecas no backend: bcrypt; cors; dotenv; express; jsonwebtoken; knex; pg

Após instalar as bibliotecas: 
**npm start para iniciar o frontend**
**npm run dev ou npm start para iniciar o backend**

