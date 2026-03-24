# novuscap

Full-stack fintech platform built with **.NET 8 Clean Architecture** backend and **React/TypeScript** frontend. Provides capital management, portfolio tracking, and financial reporting features.

## Architecture

```
src/
  backend/
    NovusCap.Domain          Core entities and business rules
    NovusCap.Application     Use cases and interfaces (CQRS)
    NovusCap.Infrastructure  EF Core, external services
    NovusCap.WebApi          REST API controllers
  frontend/                  React + TypeScript + Tailwind CSS
  docker-compose.yml         Production orchestration
  nginx.conf                 Reverse proxy configuration
```

## Tech Stack

**Backend:** `.NET 8` `C#` `Entity Framework Core` `Clean Architecture` `CQRS`

**Frontend:** `React` `TypeScript` `Tailwind CSS` `Jest`

**Infra:** `Docker` `Docker Compose` `Nginx` `PostgreSQL`

## Getting Started

```bash
docker compose up --build
```

API available at `https://localhost/api`, frontend at `https://localhost`.
