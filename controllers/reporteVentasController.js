import ReporteVentasModel from '../models/reporteVentasModel.js'
import { NoData } from '../schemas/errorSchema.js'

export default class ReporteVentasController {
  static async getAll (req, res) {
    const response = await ReporteVentasModel.getAll()
    if (response instanceof NoData) return res.status(404).json({ message: 'No se han encontrado datos para cargar.' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error interno en el servidor' })

    return res.json(response)
  }

  static async getInfoForReport (req, res) {
    const { id } = req.params
    const { month = null, year = null } = req.query
    const response = await ReporteVentasModel.getInfoForReport({ id, input: { month, year } })
    if (response instanceof NoData) return res.status(404).json({ message: 'No se han encontrado datos para cargar.' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error interno en el servidor' })

    return res.json(response)
  }

  static async getInfoForCollectReport (req, res) {
    const { id } = req.params
    const { month = null, day = null } = req.query
    const response = await ReporteVentasModel.getInfoForCollectReport({ id, input: { month, day } })
    if (response instanceof NoData) return res.status(404).json({ message: 'No se han encontrado datos para cargar.' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error interno en el servidor' })

    return res.json(response)
  }
}
