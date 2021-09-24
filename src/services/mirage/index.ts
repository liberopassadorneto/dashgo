import faker from 'faker';
import { createServer, Factory, Model } from 'miragejs';

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
      server.createList('user', 20);
    },

    routes() {
      // rota: '/api/users'
      this.namespace = 'api';

      // delay de 750ms
      this.timing = 750;

      // CRUD
      this.get('/users');
      this.post('/users');

      // resetar as rotas para default
      this.namespace = '';

      // tenta fazer as requisições pelo mirage, se não der certo, "passe a diante"
      this.passthrough();
    },
  });

  return server;
}
