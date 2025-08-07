import { EntityRepository, Repository } from 'typeorm';
import { Agenda } from '../Entity/Agenda';

@EntityRepository(Agenda)
export class AgendaRepository extends Repository<Agenda> {}
