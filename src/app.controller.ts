import { Controller, Get, MessageEvent, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of, map, takeLast, merge } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Sse('sse')
  getHello(): Observable<MessageEvent> {
    const events = new MyService().test();
    const all$ = events.pipe(
      map((data) => ({
        type: 'message',
        data: data,
      })),
    );
    const lastEvent$ = events.pipe(
      takeLast(1),
      map((data) => ({
        type: 'close',
        data: data,
      })),
    );
    return merge(all$, lastEvent$);
  }
}

export class MyService {
  test() {
    return of('1', '2', '3', '4', '5', '6', '7', '8', '9');
  }
}
