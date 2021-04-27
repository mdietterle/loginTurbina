const mutations = {
  setUser (state, user) {
    state.user = user
  },

  setDetalheUser (state, id) {
    state.idDetalhaUser = id
  },

  changePage (state, page) {
    state.activePage = page
  },

  addOffer (state, offer) {
    state.selectedOffer.push(offer)
  },

  setLocalSelectedOffer (state, payload) {
    if (payload.local) {
      state.localSelectedOffer[payload.local] = payload.oferta
    }
  },

  setShowDacc (state, show) {
    state.applyDACC = show
  },

  setShowDaccAnterior (state, showAnterior) {
    state.applyDACCAnterior = showAnterior
  },

  removeOffer (state, idx) {
    state.selectedOffer.slice(idx, -1)
  },

  clearOffer (state, local) {
    if (local) {
      state.localSelectedOffer[local] = {}
    }

    state.selectedOffer = []
  },

  setUtilizationDays (state, days) {
    state.utilizationDays = days
  },

  setDaysInMonthBusiness (state, days) {
    state.daysInMonthBusiness = days
  },

  setDaysInMonthResidencial (state, days) {
    state.daysInMonthResidencial = days
  },

  setUnavailableDays (state, days) {
    state.unavailableDays = days
  },

  setShowProRata (state, conditional) {
    if (state.selectedOffer.length > 1) {
      state.selectedOffer = [state.selectedOffer[0]]
    }

    state.showProRata = conditional
  },

  setProductTotalCharged (state, total) {
    state.productTotalCharged = total
  },

  setProductTotalProportional (state, total) {
    state.productTotalProportional = total
  },

  setProductTotalAdjustment (state, total) {
    state.productTotalAdjustment = total
  },

  setPackagesTotalCharged (state, total) {
    state.packagesTotalCharged = total
  },

  setPackagesTotalAdjustment (state, total) {
    state.packagesTotalAdjustment = total
  },

  setPackagesTotalProportional (state, total) {
    state.packagesTotalProportional = total
  },

  setBillsData (state, data) {
    state.billsData = data
  },

  setSimulatorLogId (state, logId) {
    state.simulatorLogId = logId
  },

  setMenu (state, typeMenu) {
    state.typeMenu = typeMenu
  },

  setProRataType (state, proRataType) {
    if (state.selectedOffer.length > 1) {
      state.selectedOffer = [state.selectedOffer[0]]
    }

    state.proRataType = proRataType
  },

  addAdditionalPackages (state, additionalPackage) {
    state.additionalPackages.push(additionalPackage)
  },

  removeAdditionalPackages (state, idx) {
    state.additionalPackages = state.additionalPackages.filter((el, i) => i !== idx)
  },

  clearAdditionalPackages (state) {
    state.additionalPackages = []
  },

  setProRataTableRowsOffer (state, tableOffers) {
    state.proRataTableRows = tableOffers
  },

  clearProRataTableRows (state) {
    state.proRataTableRows = []
  },

  addMigrationTableRow (state, migrationTableRows) {
    state.migrationTableRows.push(migrationTableRows)
  },

  clearMigrationTableRows (state) {
    state.migrationTableRows = []
  },

  addSaleFailureTableRow (state, saleFailureTableRows) {
    state.saleFailureTableRows.push(saleFailureTableRows)
  },

  addSaleFailureTableRows (state, saleFailureTableRows) {
    state.saleFailureTableRows = saleFailureTableRows
  },

  clearSaleFailureTableRow (state) {
    state.saleFailureTableRows = []
  },

  removeLastMigrationTableRow (state) {
    state.migrationTableRows.pop()
  },

  showSnackBar (state, snackBarMessage) {
    state.snackBarMessage = snackBarMessage
  },

  setTipoContestacao (state, tipoContestacao) {
    state.tipoContestacao = tipoContestacao
  },

  setCnpjCpf (state, cnpjCpf) {
    state.cnpjCpf = cnpjCpf
  },

  ofertaNaoEncontrada (state, value) {
    state.ofertaNaoEncontrada = value
  },

  setProRataNoAdjustment (state, value) {
    state.proRataNoAdjustment = value
  },

  setFimSimulacao (state, value) {
    state.fimSimulacao = value
  },
  setHasAdjustment (state, value) {
    state.hasAdjustment = value
  }
}

export default mutations
