import PostgresAboutPage from '@/infra/database/about-page/PostgresAboutPage'
import postgres from '@/infra/database/postgres'
import PostgresSkills from '@/infra/database/skills/PostgresSkills'
import { aboutPageMock } from '@/shared/aboutPageMock'
import { beforeAll, describe, expect, test } from 'vitest'
import AboutPage from './AboutPage'

describe('About Page Use Case test', () => {
  const aboutPageRepository = new PostgresAboutPage()
  const skillsRepository = new PostgresSkills()
  const aboutPageUseCase = new AboutPage(aboutPageRepository, skillsRepository)

  beforeAll(async () => {
    await postgres.none('delete from about_page')
    await postgres.none('delete from skills')
  })

  test('should create a About Page', async () => {
    await expect(
      aboutPageUseCase.createAboutPage(aboutPageMock)
    ).resolves.not.toThrowError()
  })

  test('should get the About Page', async () => {
    await aboutPageUseCase.getAboutPage()
  })

  test('should delete a Skill', async () => {
    await expect(
      aboutPageUseCase.deleteSkill('jest')
    ).resolves.not.toThrowError()
  })

  test('should delete the About Page', async () => {
    await expect(aboutPageUseCase.deleteAboutPage()).resolves.not.toThrowError()
    await expect(aboutPageUseCase.getAboutPage()).resolves.toBeUndefined()
  })
})
