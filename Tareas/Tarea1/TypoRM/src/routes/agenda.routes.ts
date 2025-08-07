// src/routes/agenda.routes.ts
import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Agenda } from '../Entity/Agenda';

const router = Router();
const agendaRepo = AppDataSource.getRepository(Agenda);

router.get('/', async (req, res) => {
  const agendas = await agendaRepo.find();
  res.render('index', { agendas });
});

router.get('/nuevo', (req, res) => {
  res.render('nuevo');
});

router.post('/nuevo', async (req, res) => {
  const datos = agendaRepo.create(req.body);
  await agendaRepo.save(datos);
  res.redirect('/');
});

router.get('/editar/:id', async (req, res) => {
  const agenda = await agendaRepo.findOneBy({ id: Number(req.params.id) });
  res.render('editar', { agenda });
});

router.post('/editar/:id', async (req, res) => {
  await agendaRepo.update(req.params.id, req.body);
  res.redirect('/');
});

router.post('/eliminar/:id', async (req, res) => {
  await agendaRepo.delete(req.params.id);
  res.redirect('/');
});

export default router;
