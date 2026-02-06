# nest-crud

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

A NestJS CRUD application demonstrating **git-crypt** for transparent file encryption in git repositories. This project showcases best practices for managing sensitive environment files, conventional commits workflow, and production-ready NestJS configuration.

## Key Features

- **NestJS** with TypeScript
- **Git-crypt** integration for encrypted .env files
- **Multi-stage environment configuration** (.env, .env.stage, .env.production)
- **Production-ready setup** (validation, CORS, graceful shutdown)
- **Conventional commits** workflow
- **GPG-based encryption** for team collaboration

## Prerequisites

- Node.js (v18+)
- npm or yarn
- git-crypt (https://github.com/AGWA/git-crypt)
- GPG with a valid key

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/The-Dave-Stack/nest-crud.git
cd nest-crud
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Unlock Encrypted Files

After cloning, sensitive files appear encrypted. Unlock them using git-crypt:

```bash
# If you have GPG configured with an authorized key
git-crypt unlock

# Or with a symmetric key file (if provided)
git-crypt unlock /path/to/git-crypt-key
```

### 4. Run the Application

```bash
# Development mode (loads .env)
npm run start

# Watch mode
npm run start:dev

# Stage environment (loads .env.stage)
NODE_ENV=stage npm run start

# Production mode (loads .env.production)
NODE_ENV=production npm run start:prod
```

The application will start on `http://localhost:3000`

## Environment Configuration

This project supports multiple environments with dedicated encrypted .env files:

- `.env` - Development environment (default)
- `.env.stage` - Stage environment
- `.env.production` - Production environment

Environment files are automatically loaded based on `NODE_ENV`:
- If `NODE_ENV` is not set or is `development` → loads `.env`
- If `NODE_ENV=stage` → loads `.env.stage`
- If `NODE_ENV=production` → loads `.env.production`

## Git-Crypt Setup

### Adding a New Team Member

To grant someone access to encrypted files:

```bash
# Add a collaborator by email (their GPG key must be in your keyring)
git-crypt add-gpg-user user@example.com

# Commit the changes
git add .git-crypt/keys/default/0/*.gpg
git commit -m "chore: add git-crypt collaborator"
git push
```

### Checking Encryption Status

```bash
# Show encrypted/decrypted status of files
git-crypt status

# Show all files with encryption status
git-crypt status -e
```

### Exporting a Backup Key

```bash
git-crypt export-key git-crypt-key
```

⚠️ **Never commit the `git-crypt-key` file to the repository!**

## Development Workflow

This project follows **conventional commits** specification:

```bash
# Format: <type>: <description>
git commit -m "feat: add new user authentication"
git commit -m "fix: resolve database connection issue"
git commit -m "docs: update README with deployment instructions"
git commit -m "chore: upgrade dependencies to latest versions"
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Typical Workflow

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature

# 2. Make changes and test
npm run lint
npm run test

# 3. Commit with conventional commit message
git add .
git commit -m "feat: implement user CRUD operations"

# 4. Push and create PR
git push origin feature/your-feature
```

## Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## Code Quality

```bash
# Linting
npm run lint

# Format code
npm run format
```

## Project Structure

```
nest-crud/
├── src/
│   ├── config/
│   │   ├── configuration.ts      # Configuration schema
│   │   └── env.validation.ts      # Environment validation
│   ├── app.module.ts              # Root module
│   ├── main.ts                    # Application entry point
│   └── ...
├── test/                          # Test files
├── .env                           # Development environment (encrypted)
├── .env.stage                     # Stage environment (encrypted)
├── .env.production                # Production environment (encrypted)
├── .gitattributes                 # Git-crypt encryption rules
├── .git-crypt/                    # Git-crypt keys and config
├── GIT_CRYPT.md                   # Git-crypt documentation
├── CLAUDE.md                      # Project guidelines
└── README.md                      # This file
```

## Production Features

The application includes production-ready configurations:

- ✅ Global validation pipe with automatic DTO transformation
- ✅ CORS enabled with configurable origin
- ✅ Graceful shutdown handling (SIGTERM/SIGINT)
- ✅ Environment-specific configuration loading
- ✅ Structured logging
- ✅ Error handling middleware

## Deployment

When deploying to production:

1. Set `NODE_ENV=production` to load `.env.production`
2. Ensure git-crypt is unlocked on the server
3. Use `npm run build` to compile TypeScript
4. Run `npm run start:prod` to start the production server

### Docker Deployment

```bash
# Using docker-compose
docker-compose up -d

# Or with Docker
docker build -t nest-crud .
docker run --env-file .env.production -p 3000:3000 nest-crud
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Git-Crypt GitHub](https://github.com/AGWA/git-crypt)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [The Dave Stack](https://thedavestack.com)

## Support

For detailed git-crypt setup instructions, see [GIT_CRYPT.md](GIT_CRYPT.md).

## License

This project is **UNLICENSED** - proprietary software.

## Author

- **David López Felguera** - [The Dave Stack](https://thedavestack.com)
