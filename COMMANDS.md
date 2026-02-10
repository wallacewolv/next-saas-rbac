# Docker

- Comando para subir o banco
  ``docker compose up -d``

- Comando para gerar as colunas no banco
  ``pnpm prisma generate``

- Comando para popular o banco
  ``pnpm prisma db seed``

- Comando para criar uma migrate
  ``pnpm prisma migrate dev``

- Comando para rodar o db:studio (na pasta /api)
  ``pnpm run db:studio``

------------------------------

- Comando para derrubar e remover os bancos no docker
  ``docker compose down -v``
