
Rhythm Box

Plataforma de streaming de música com gerenciamento de playlists, usuários e consumo de API externa (Vagalume).

 Pré-requisitos

- Docker & Docker Compose

- Node.js v18+ (ou superior)

- npm ou yarn

 🐳 Backend com Docker

Na raiz do projeto, suba o banco e a API com Docker Compose:

docker-compose up --build

 Configure suas variáveis de ambiente em `.env` (exemplo em `.env.example`):

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=silvia
DB_NAME=rhythm_db

   - Serviço **db**: Postgres (porta `5432`)
   - Serviço **api**: NestJS (porta `3000`)

 A API ficará disponível em `http://localhost:3000`.

 Para parar e remover containers:
  docker-compose down

Para rodar os testes do backend com cobertura 
npm run test:cov
npm run test:e2e

⚛️ Frontend

Instale dependências e inicie o servidor de desenvolvimento:

npm install
npm run dev

## 🧪 Testes (Frontend)
No diretório `frontend/`:

npm run coverage

## 📝 Observações

- O backend utiliza **TypeORM** com sincronização automática (`synchronize: true`). Para produção, recomenda-se migrar para migrations.
- O frontend foi montado com **Vite**, **React**, **TypeScript** e **Ant Design**.
- A cobertura mínima implementada no frontend e backend é de **25%**.
