const state = {
  user: {},
  typeMenu: true,
  activePage: '',
  selectedOffer: [],
  idDetalheUser: '',
  localSelectedOffer: {
    guidedService: {},
    guidedServiceItensExtrasDependentes: {},
    calculatorMigration: {},
    calculatorSaleFailure: {},
    ofertaNaoEncontrada: {},
    buscaOfertas: {}
  },
  utilizationDays: 0,
  daysInMonthBusiness: 0,
  daysInMonthResidencial: 0,
  applyDACC: false,
  applyDACCAnterior: false,

  proRataTableRows: [],
  migrationTableRows: [],
  saleFailureTableRows: [],

  showProRata: false,

  productTotalCharged: '0',
  productTotalAdjustment: '0',
  productTotalProportional: '0',

  packagesTotalCharged: '0',
  packagesTotalAdjustment: '0',
  packagesTotalProportional: '0',

  additionalPackages: [],

  billsData: {},
  simulatorLogId: '',

  proRataType: '',
  snackBarMessage: '',
  tipoContestacao: '',
  cnpjCpf: '',
  ofertaNaoEncontrada: false,
  proRataNoAdjustment: false,
  fimSimulacao: false,

  hasAdjustment: false

}

export default state
