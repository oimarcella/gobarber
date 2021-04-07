import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
	provider_id: string;
	date: Date;
}

class CreateAppointmentService {
	constructor(private appointmentsRepository: IAppointmentsRepository) { }


	public async execute({ provider_id, date }: Request): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		const appointmentInSameDate = await this.appointmentsRepository.findByDate(
			appointmentDate,
		);
		if (appointmentInSameDate) {
			throw new AppError(
				'There is already another appointment in the same time',
				400,
			);
		}
		const appointment = await this.appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});

		return appointment;
	}
}
export default CreateAppointmentService;
