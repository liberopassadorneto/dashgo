import faker from 'faker';
import { createServer, Factory, Model, Response } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    // gerar dados em massa
    factories: {
      user: Factory.extend({
        name() {
          return faker.name.findName();
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    // criação de users fake
    seeds(server) {
      server.createList('user', 100);
    },

    routes() {
      // rota: '/api/users'
      this.namespace = 'api';

      // delay de 750ms
      this.timing = 750;

      // CRUD
      this.get('/users', function (schema, request) {
        // page -> qual página estou exibindo no momento
        // per_page -> quantos registros vou exibir por página
        const { page = 1, per_page = 10 } = request.queryParams;

        // total de registros (users)
        const total = schema.all('user').length;

        // exemplo para page = 3
        // pageStart = (3-1)*10 = 20
        // pageEnd = 20 + 10 = 30
        // na página 3 -> vou exibir os registros (users) de 20 - 30
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user')).users.slice(
          pageStart,
          pageEnd
        );

        // 200 -> código HTTP: OK
        return new Response(200, { 'x-total-count': String(total) }, { users });
      });
      this.post('/users');

      // resetar as rotas para default
      this.namespace = '';

      // tenta fazer as requisições pelo mirage, se não der certo, "passe a diante"
      this.passthrough();
    },
  });

  return server;
}
