import { ConfigService } from '@nestjs/config';

export const DatabaseFactory = (config: ConfigService) => {
  return config.get('database');
};
