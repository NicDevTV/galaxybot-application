import { DataTypes, Model } from 'sequelize'
import { sequelize } from './db'

export class ApplicationSettings extends Model {
  declare id: number
  declare pageSettings: string
}

ApplicationSettings.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  pageSettings: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'application_settings',
  timestamps: false
})

export async function ensureDefaultApplicationSettings() {
  // Seed one default record so the frontend always has something to load.
  await ApplicationSettings.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      pageSettings: JSON.stringify({
        components: [
          { type: 'hero', title: 'Hero', description: 'Build your next application with a clean, modern landing page.', bannerUrl: '' },
          { type: 'jobs', title: 'Jobs', description: 'Find your next role in our open positions.' }
        ]
      })
    }
  })
}
