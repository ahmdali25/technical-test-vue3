import { createStore } from "vuex";

export default createStore({
  state: {
    cost_of_goods: 0,
    dropshipping_fee: 0,
    total: 0,
    selected_shipment: "",
    selected_payment: "",
    delivery_estimate: "",
    order_id: "",
  },
  getters: {
    getCostOfGoods(state) {
      return state.cost_of_goods;
    },
    getDropshippingFee(state) {
      return state.dropshipping_fee;
    },
    getTotal(state) {
      return state.total;
    },
    getSelectedShipment(state) {
      return state.selected_shipment;
    },
    getSelectedPayment(state) {
      return state.selected_payment;
    },
    getDeliveryEstimate(state) {
      return state.delivery_estimate;
    },
    getOrderId(state) {
      return state.order_id;
    },
  },
  mutations: {
    updateCostOfGoods(state, data) {
      state.cost_of_goods = data;
    },
    updateDropshippingFee(state, data) {
      state.dropshipping_fee = data;
    },
    updateTotal(state, data) {
      state.total = data;
    },
    updateSelectedShipment(state, data) {
      state.selected_shipment = data;
    },
    updateDeliveryEstimate(state, data) {
      state.delivery_estimate = data;
    },
    updateSelectedPayment(state, data) {
      state.selected_payment = data;
    },
    updateOrderId(state, data) {
      state.order_id = data;
    },
  },
});
