#!/bin/sh


if [ "$FLASK_ENV" = "production" ]; then

    echo "Running in production mode..."
    echo "Waiting for PostgreSQL to start..."
    echo "You may need to increase the sleep duration if your web service begins before the db"
    # you may need to increase the timeout if your web service begins before
    # postgresql is ready.   The sleep command can be removed for Render.
    sleep 3

    flask db upgrade
    flask seed all


    exec gunicorn app:app

else

    echo "Running in non-production mode..."
    echo "Waiting for PostgreSQL to start..."
    echo "You may need to increase the sleep duration if your web service begins before the db"
    # you may need to increase the timeout if your web service begins before
    # postgresql is ready.
    sleep 3

    flask db upgrade
    flask seed all

    # Start Gunicorn with binding for local testing
    exec gunicorn app:app --bind 0.0.0.0:8000
fi
