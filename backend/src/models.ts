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
  // Set one default configuration
  await ApplicationSettings.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      pageSettings: JSON.stringify({
        components: [
          { type: 'hero', title: 'Unsere Möglichkeiten', description: 'Bewirb dich heute für ein Team der Zukunft!', bannerUrl: 'https://cdn.eso.org/images/screen/eso1019a.jpg' },
          { type: 'jobs', title: 'Unsere Jobs', description: 'Finde die Position, die am besten zu dir passt.' }
        ]
      })
    }
  })
}
