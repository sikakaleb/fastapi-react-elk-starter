
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "FastAPI Backend"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = Field(default="development", description="Environment: development, staging, production")
    DEBUG: bool = Field(default=True, description="Debug mode")
    SECRET_KEY: str = Field(..., description="Secret key for JWT and encryption")

    # Database
    DATABASE_URL: str = Field(..., description="PostgreSQL database URL (asyncpg format)")

    # CORS - Comma-separated string that will be parsed to list
    CORS_ORIGINS: str = Field(
        default="http://localhost:5173,http://localhost:3000",
        description="Allowed CORS origins (comma-separated string)"
    )

    # Logging
    LOGSTASH_HOST: str = Field(default="localhost", description="Logstash host")
    LOGSTASH_PORT: int = Field(default=5000, description="Logstash TCP port")
    LOG_LEVEL: str = Field(default="INFO", description="Logging level")

    # API
    API_V1_PREFIX: str = "/api/v1"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]


settings = Settings()
