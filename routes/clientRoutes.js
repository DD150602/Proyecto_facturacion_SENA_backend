import { Router } from 'express'
import { ClientController } from '../controllers/clientController.js'

export const ClientRoute = Router()

ClientRoute.get('/:numeroDocumentoClient', ClientController.verifyClient)
ClientRoute.get('/todos/clientes', ClientController.getData)
ClientRoute.get('/contacto/:id', ClientController.getContactInfoCliente)
ClientRoute.post('/', ClientController.createClient)
