import { CronJob } from 'cron'

export interface Cron {
  New: (exp: string, fun: () => void) => CronJob
}

export class CronAdapter implements Cron {
  New(exp: string, fun: () => void) {
    return CronJob.from({
      cronTime: exp,
      onTick: fun,
      start: false,
      timeZone: 'America/Sao_Paulo',
    })
  }

  static create() {
    return new CronAdapter()
  }
}
