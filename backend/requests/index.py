import json
import os
from datetime import datetime

import pymysql

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
}


def resp(code: int, data) -> dict:
    return {
        'statusCode': code,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(data, ensure_ascii=False),
    }


def connect():
    return pymysql.connect(
        host=os.environ['MYSQL_HOST'],
        port=int(os.environ.get('MYSQL_PORT') or 3306),
        user=os.environ['MYSQL_USER'],
        password=os.environ['MYSQL_PASSWORD'],
        database=os.environ['MYSQL_DB'],
        charset='utf8mb4',
        connect_timeout=4,
        cursorclass=pymysql.cursors.DictCursor,
    )


def iso(v):
    if isinstance(v, datetime):
        return v.isoformat() + 'Z'
    return None


def norm_status(s: str) -> str:
    t = (s or '').lower()
    if 'закры' in t or 'выполнена' in t:
        return 'Выполнена'
    if 'отклон' in t:
        return 'Отклонена'
    return 'На исполнении'


def row_to_request(r: dict) -> dict:
    return {
        'num': r['num'],
        'system': r.get('sistem') or '',
        'status': norm_status(r.get('stat') or ''),
        'description': r.get('description') or '',
        'answer': r.get('accomplishment') or '',
        'createdAt': iso(r.get('date')),
        'closedAt': iso(r.get('closed_at')),
        'comments': [],
    }


SELECT = 'SELECT num, description, stat, accomplishment, `date`, `Дата закрытия` AS closed_at, sistem FROM general'


def handler(event: dict, context) -> dict:
    """Заявки обслуживания из MySQL (таблица general): GET — список, POST — создать заявку"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    required = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DB']
    if any(not os.environ.get(k) for k in required):
        return resp(200, {'configured': False, 'requests': []})

    conn = connect()
    with conn:
        with conn.cursor() as cur:
            if event.get('httpMethod') == 'POST':
                body = json.loads(event.get('body') or '{}')
                system = str(body.get('system') or '').strip()
                description = str(body.get('description') or '').strip()
                if not system or not description:
                    return resp(400, {'error': 'Укажите систему и описание'})
                cur.execute(
                    'INSERT INTO general (description, stat, accomplishment, `date`, sistem) '
                    'VALUES (%s, %s, %s, NOW(), %s)',
                    (description, 'На исполнении', 'На исполнении', system),
                )
                conn.commit()
                cur.execute(SELECT + ' WHERE num = %s', (cur.lastrowid,))
                return resp(200, {'request': row_to_request(cur.fetchone())})

            cur.execute(SELECT + ' ORDER BY num DESC LIMIT 500')
            rows = cur.fetchall()
    return resp(200, {'configured': True, 'requests': [row_to_request(r) for r in rows]})