import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dayjs from 'dayjs';

@Injectable()
export class DateValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { startDate, endDate, startTime, endTime } = req.query;

    if (!startDate || !endDate || !startTime || !endTime) {
      return res.status(400).json({
        message: 'Bad request, validate the required query parameters',
      });
    }

    // Validate Dates
    const startDateDayjs = dayjs(`${startDate}T${startTime}`);
    const endDateDayjs = dayjs(`${endDate}T${endTime}`);
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

    console.log('endDateDayjs.diff ', endDateDayjs.diff(startDateDayjs, 'day'));
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
