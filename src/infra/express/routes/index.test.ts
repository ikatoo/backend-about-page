import request from 'supertest';
import { describe, expect, test } from "vitest";
import app from '../app';

describe('Express Test', () => {
  test('should index ok', async () => {
    const response = await request(app).get('/').send()

    expect(response.status).toBe(200)
  })
})
