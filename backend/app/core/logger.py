
import logging
import sys
from typing import Any, Dict
from datetime import datetime
from pythonjsonlogger import jsonlogger
from logstash_async.handler import AsynchronousLogstashHandler
from app.core.config import settings


class CustomJsonFormatter(jsonlogger.JsonFormatter):
    def add_fields(self, log_record: Dict[str, Any], record: logging.LogRecord, message_dict: Dict[str, Any]) -> None:
        super().add_fields(log_record, record, message_dict)
        
        log_record['timestamp'] = datetime.utcnow().isoformat() + 'Z'
        log_record['environment'] = settings.ENVIRONMENT
        log_record['service'] = 'fastapi-backend'
        log_record['level'] = record.levelname
        log_record['logger'] = record.name
        log_record['module'] = record.module
        log_record['function'] = record.funcName
        log_record['line'] = record.lineno


def setup_logger(name: str = "fastapi") -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO))
    logger.handlers.clear()
    
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_formatter = CustomJsonFormatter(
        '%(timestamp)s %(level)s %(name)s %(message)s'
    )
    console_handler.setFormatter(console_formatter)
    logger.addHandler(console_handler)
    
    try:
        logstash_handler = AsynchronousLogstashHandler(
            host=settings.LOGSTASH_HOST,
            port=settings.LOGSTASH_PORT,
            database_path=None,
            transport='logstash_async.transport.TcpTransport',
            ssl_enable=False,
            ssl_verify=False,
            enable=True,
            event_ttl=30,
        )
        logstash_handler.setLevel(logging.INFO)
        logger.addHandler(logstash_handler)
        logger.info(f"Logstash handler connected to {settings.LOGSTASH_HOST}:{settings.LOGSTASH_PORT}")
    except Exception as e:
        logger.warning(f"Could not connect to Logstash: {e}. Logging to console only.")
    
    return logger


logger = setup_logger("fastapi")
