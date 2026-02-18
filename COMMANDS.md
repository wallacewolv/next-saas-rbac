# Docker

## 🆕 Subindo do zero (primeira vez ou após `docker compose down -v`)

1. Subir o container do banco
   ``docker compose up -d``

2. Gerar o Prisma Client
   ``pnpm prisma generate``

3. Rodar as migrations (cria o banco e as tabelas)
   ``pnpm db:migrate``

4. Popular o banco com dados iniciais
   ``pnpm prisma db seed``

------------------------------

## 🔄 Restore do banco (container já existe e estava parado)

1. Subir o container do banco
   ``docker compose up -d``

2. Popular o banco com dados iniciais (se necessário)
   ``pnpm prisma db seed``

------------------------------

## 🛠️ Comandos úteis do dia a dia

- Criar uma nova migration após alterar o schema
  ``pnpm prisma migrate dev``

- Abrir o db:studio para visualizar os dados (na pasta /api)
  ``pnpm run db:studio``

------------------------------

## ⚠️ Destruir tudo (apaga volumes e dados)

- Derrubar e remover os bancos no docker
  ``docker compose down -v``

> Após esse comando, será necessário subir do zero novamente.
