import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (request, response) => {
	const appointments = await appointmentsRepository.find();

	return response.status(200).json(appointments);
}); */

appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const dateParsed = parseISO(date);

	const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
	const appointment = await createAppointmentService.execute({
		provider_id,
		date: dateParsed,
	});

	return response.status(200).json(appointment);
});

export default appointmentsRouter;