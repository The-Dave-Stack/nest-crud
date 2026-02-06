# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a NestJS TypeScript application with modular configuration management. The project uses the standard NestJS structure with custom environment variable validation and database configuration (prepared for future implementation).

## Development Commands

### Build and Run
```bash
npm run build          # Compile TypeScript to dist/
npm run start          # Run compiled application
npm run start:dev      # Watch mode (recommended for development)
npm run start:debug    # Debug mode with watch
npm run start:prod     # Run production build
```

### Testing
```bash
npm test               # Run unit tests (Jest)
npm run test:e2e       # Run end-to-end tests
npm run test:cov       # Generate coverage report
npm run test:watch     # Watch mode for tests
npm run test:debug     # Debug tests
```

### Code Quality
```bash
npm run lint           # ESLint with auto-fix
npm run format         # Prettier formatting
```

## Configuration Architecture

### Environment Variables
The application uses a **two-file configuration pattern** in `src/config/`:

1. **`configuration.ts`**: Defines the configuration schema with defaults
2. **`env.validation.ts`**: Uses `class-validator` and `class-transformer` to validate environment variables at startup

### Required Environment Variables
The application requires these in `.env` (or environment):

```bash
NODE_ENV=development|production
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

### Adding New Configuration
To add new environment variables:

1. **Update** `src/config/configuration.ts`:
   ```typescript
   export default () => ({
     port: parseInt(process.env.PORT as string, 10) || 3000,
     database: { /* ... */ },
     newConfig: process.env.NEW_CONFIG,
   })
   ```

2. **Add validation** in `src/config/env.validation.ts`:
   ```typescript
   class EnvironmentVariables {
     // ... existing
     @IsString()  // or @IsNumber(), @IsEnum(), etc.
     NEW_CONFIG: string;
   }
   ```

### ConfigService Usage
Access configuration anywhere in the app:
```typescript
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {}

const port = this.configService.get<number>('port');
const dbHost = this.configService.get<string>('database.host');
```

## Project Structure

```
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root module with ConfigModule.forRoot()
├── app.controller.ts    # Root controller
├── app.service.ts       # Root service
└── config/
    ├── configuration.ts # Configuration schema
    └── env.validation.ts # Environment validation
```

## Code Style

- **Linting**: ESLint with TypeScript ESLint (recommended rules + customizations)
- **Formatting**: Prettier (single quotes, trailing commas)
- **TypeScript**: 
  - Module system: `nodenext`
  - Target: `ES2023`
  - Strict mode disabled for certain options (see `tsconfig.json`)
- **Decorators**: Enabled (`experimentalDecorators`, `emitDecoratorMetadata`)

## NestJS CLI

The project uses standard NestJS schematics. Generate new resources:

```bash
nest g module <name>       # Generate module
nest g controller <name>   # Generate controller
nest g service <name>      # Generate service
nest g resource <name>     # Generate full CRUD resource (module + controller + service)
```

## Key Dependencies

- **@nestjs/config**: Configuration management
- **class-validator**: Environment variable validation decorators
- **class-transformer**: Transform plain objects to class instances
- **@nestjs/platform-express**: HTTP adapter

## Database Configuration

Database configuration is defined in `src/config/configuration.ts` but not yet implemented. When adding database support:
- Install TypeORM or Prisma
- Add database module to `AppModule`
- Use `this.configService.get('database.host')` for connection details
