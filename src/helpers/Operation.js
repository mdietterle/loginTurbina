import OperationsPermission from './OperationsPermission'

const Operation = {
  operation: {},
  permission: {},
  router: { name: '', param: '' },

  hasPermission (user) {
    this.operation = user.groups.find(group => group.key.startsWith('ps_operacao'))
    this.permission = OperationsPermission.find(operation => operation.key === this.operation.key)

    if (this.permission) {
      return true
    } else {
      return false
    }
  },

  findRouter () {
    if (this.permission.module.includes('ofertas')) {
      if (!this.permission.submodule.includes('empresarial') && !this.permission.submodule.includes('oi_total') && !this.permission.submodule.includes('residencial') && !this.permission.submodule.includes('guiada')) {
        this.router.name = 'Ofertas'
        this.router.param = 'agr'
      } else if (this.permission.submodule.includes('oi_total')) {
        this.router.name = 'Oferta'
        this.router.param = 'oi_total'
      } else if (this.permission.submodule.includes('residencial')) {
        this.router.name = 'Oferta'
        this.router.param = 'residencial'
      } else if (this.permission.submodule.includes('guiada')) {
        this.router.name = 'Contestação Guiada Fibra'
        this.router.param = 'oi_total'
      } else {
        this.router.name = 'Oferta'
        this.router.param = 'empresarial'
      }
    } else if (this.permission.module.includes('oi_total')) {
      this.router.name = 'Oferta'
      this.router.param = 'oi_total'
    } else if (this.permission.module.includes('residencial')) {
      this.router.name = 'Oferta'
      this.router.param = 'residencial'
    } else {
      this.router.name = 'Oferta'
      this.router.param = 'empresarial'
    }
    return this.router
  }

}

export default Operation
