import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dayjs from 'dayjs';

@Injectable()
export class DateValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { fechaInicial, fechaFinal, horaInicial, horaFinal } = req.query;

    if (!fechaInicial || !fechaFinal || !horaInicial || !horaFinal) {
      return res.status(400).json({
        message: 'Bad request, validate the required query parameters',
      });
    }

    // Validate Dates
    const startDateDayjs = dayjs(`${fechaInicial}T${horaInicial}`);
    const endDateDayjs = dayjs(`${fechaFinal}T${horaFinal}`);
    if (!startDateDayjs.isValid() || !endDateDayjs.isValid()) {
      return res.status(400).json({
        message: 'Bad request, validate the required query parameters',
      });
    }

    // Validate if endDate is after to startDate
    const isValid = dayjs(startDateDayjs).isBefore(endDateDayjs);
    if (!isValid) {
      return res.status(400).json({
        message: 'Bad request, validate the required query parameters',
      });
    }

    if (endDateDayjs.diff(startDateDayjs, 'day') > 5) {
      return res.status(400).json({
        message:
          'Bad request, the difference between startDate and endDate must be over 5 days',
      });
    }

    // If all is valid, continue with the request
    next();
  }
}
