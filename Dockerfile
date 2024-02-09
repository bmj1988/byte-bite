FROM --platform=amd64 node:18-alpine as frontend

WORKDIR /react-vite

COPY ./react-vite/package*.json .

RUN npm install

COPY ./react-vite .

RUN npm run build


FROM --platform=amd64 python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev



ARG FLASK_APP=app
ENV FLASK_APP=${FLASK_APP}

ARG FLASK_ENV=production
ENV FLASK_ENV=${FLASK_ENV}


ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG SCHEMA=
ENV SCHEMA=${SCHEMA}


ARG SECRET_KEY=
ENV SECRET_KEY=${SECRET_KEY}

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY ./app ./app
COPY ./migrations ./migrations

COPY --from=frontend /react-vite/dist ./react-vite/dist

# RUN flask db upgrade
# RUN flask seed all
EXPOSE 8000

CMD ["gunicorn", "app:app"]
