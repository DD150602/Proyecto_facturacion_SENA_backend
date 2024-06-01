import ZoneModel from '../models/zoneModel.js';
import { validateZona, validateZonaUpdate } from '../schemas/zone.js';
import { NoData } from '../schemas/errorSchema.js';

export default class zoneController{
  static async getAllZones  (req, res)  {
    const response = await ZoneModel.getAllzone()
    if(response instanceof NoData){
      res.status(404).json({ message: 'No hay zonas registradas' })
    } else if (response instanceof Error){
      res.status(500).json({ message: 'Error en el servidor' })
    } else{
      res.json(response)
    }
  };

  static async createZone (req, res) {
     const data = validateZona(req.body)
     if(!data.success){
        return res.status(400).json({ message: JSON.parse(data.error.message)[0].message })
     }
     const datos = await ZoneModel.createZone(data.data)
     if(datos instanceof NoData){
        res.status(404)({ message : 'No se insertaron los datos' })
     } else if ( datos instanceof Error) {
        res.status(500)({ message : 'Error interno en el servidor'})
     } else {
        res.status(200).json({ message: 'Zona registrada con exito' })
     }
  };

  static async updatedZone (req, res){
    const { id } = req.params
    const updata = validateZonaUpdate(req.body)

    if(!updata.success){
      return res.status(400).json({ message: JSON.parse(updata.error.message)[0].message })
    }
    const response = await ZoneModel.updateZone( id, updata.data )
    if(response instanceof NoData){
      res.status(404)({ message : 'Esta zona ya existe' })
   } else if (response instanceof Error) {
      res.status(500)({ message : 'Error interno en el servidor'})
   } else {
      res.json({ message: 'Zona actualizada con exito' })
   }
  };

  static async addUserToZone(req, res){
    const { id } = req.params
    const zonaId = req.body.id[0]
    const response = await ZoneModel.addUserZone(id, zonaId)
    if (response instanceof NoData) {
      res.status(400).json({ message: 'No se encontro al usuario para vincular' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json({ message: 'Vinculacion exitosa' })
    }
  };

  static async getUserById(req, res){
    const { id } = req.params
    const response = await ZoneModel.getUser(id)
    if(response instanceof NoData){
        res.status(404).json({ message: 'El usuario no eviste' })
      } else if (response instanceof Error){
        res.status(500).json({ message: 'Error en el servidor' })
      } else{
        res.json(response)
      }
  }

  static async getZonaById(req, res){
    const { id } = req.params
    const response = await ZoneModel.getZoneByID(id)
    if(response instanceof NoData){
      res.status(404).json({ message: 'No hay zonas registradas' })
    } else if (response instanceof Error){
      res.status(500).json({ message: 'Error en el servidor' })
    } else{
      res.json(response)
    }
  }

}