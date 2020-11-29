import axios from 'axios'
import { Request } from './types'
import { request, requestFx } from './index'

requestFx.use(request)
