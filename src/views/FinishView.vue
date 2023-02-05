<script setup>
import router from "@/router";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const shipment = computed(() => {
  return store.getters["getSelectedShipment"];
});

const deliveryEstimate = computed(() => {
  return store.getters["getDeliveryEstimate"];
});

const payment = computed(() => {
  return store.getters["getSelectedPayment"];
});

const orderId = computed(() => {
  return store.getters["getOrderId"];
});

const costOfGoods = computed(() => {
  return store.getters["getCostOfGoods"];
});

const dropshippingFee = computed(() => {
  return store.getters["getDropshippingFee"];
});

const total = computed(() => {
  return store.getters["getTotal"];
});

function backToHome() {
  router.push("/delivery");
}
</script>

<template>
  <main>
    <div class="row">
      <div class="col col-8">
        <div class="row justify-center">
          <div class="col">
            <div class="header">Thank you</div>
            <span class="order-id">Order ID : {{ orderId }}</span>
            <span
              >Your order will be delivered {{ deliveryEstimate }} with
              {{ shipment }}</span
            >
            <div class="row nav items-center">
              <div class="col">
                <img
                  src="@/assets/arrow-left.png"
                  alt="Icon"
                  style="width: 20px"
                />
              </div>
              <div class="col">
                <span @click="backToHome">Go to homepage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-3">
        <div class="row">
          <div class="col">
            <div class="summary">
              <div class="title">Summary</div>
              <div class="items">10 items purchased</div>

              <div class="delivery-estimation">
                <p><b>Delivery estimation</b></p>
                <p class="delivery-estimation-detail">
                  {{ deliveryEstimate }} by {{ shipment }}
                </p>
              </div>

              <div>
                <p>Payment method</p>
                <p>{{ payment }}</p>
              </div>

              <div class="summary-detail">
                <div class="list">
                  <p>Cost of goods</p>
                  <p>{{ costOfGoods }}</p>
                </div>
                <div class="list">
                  <p>Dropshipping fee</p>
                  <p>{{ dropshippingFee }}</p>
                </div>
                <div class="list total">
                  <p>Total</p>
                  <p>{{ total }}</p>
                </div>
              </div>

              <button type="submit" form="form-delivery" class="btn-payment">
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="stylus" scoped>
main
  height 550px
  margin 55px 50px
  padding-left 40px

  background #FFFFFF
  box-shadow 2px 10px 20px rgba(255, 138, 0, 0.1)
  border-radius 4px

.header
  color #FF8A00
  font-size 40px
  font-weight 600
  margin-top 100px

.order-id
  margin-top 15px
  margin-bottom 10px
  font-weight 600

.summary
  border-left 1px solid #cccccc
  padding-left 30px

  .delivery-estimation
    margin-top 50px

  .delivery-estimation-detail
    color #20C997
    font-weight 600

  .summary-detail
    margin-top 50px

.title
  color #FF8A00
  font-size 24px
  font-weight 700

.items
  margin-top 10px

.list
  font-size 13px
  display flex
  display -webkit-flex
  justify-content space-between

.total
  color #FF8A00
  font-size 25px
  font-weight 700

.btn-payment
  font-size 18px
  font-weight 550
  background-color #FF8A00
  color #FFFFFF
  border none
  border-radius 2px
  width 300px
  padding 25px 50px
  margin-top 20px
  cursor pointer

  &:hover
    background-color #FFA238

.nav
    cursor pointer
    margin-top 60px
    gap: 15px !important
</style>
