import express from 'express';
import { AppDataSource } from './data-source';
import path from 'path';
import agendaRoutes from './routes/agenda.routes';

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    app.use('/', agendaRoutes);

    app.listen(3000, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });
  })
  .catch((error) => console.error('Error al conectar con la BD', error));
