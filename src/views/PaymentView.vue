<script setup>
import router from "@/router";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const shipment = reactive({
  val: "",
  name: "",
  fee: "",
  delivery_estimate: "",
  active: false,
});

const payment = reactive({
  val: "",
  name: "",
  fee: "",
  active: false,
});

const costOfGoods = computed(() => {
  return store.getters["getCostOfGoods"];
});

const dropshippingFee = computed(() => {
  return store.getters["getDropshippingFee"];
});

const total = computed(() => {
  return shipment.fee + store.getters["getTotal"];
});

function handleSelectShipment(val) {
  if (val == "1") {
    shipment.val = "1";
    shipment.name = "GO-SEND";
    shipment.fee = 15000;
    shipment.delivery_estimate = "today";
    shipment.active = true;
  }

  if (val == "2") {
    shipment.val = "2";
    shipment.name = "JNE";
    shipment.fee = 9000;
    shipment.delivery_estimate = "2 days";
    shipment.active = true;
  }

  if (val == "3") {
    shipment.val = "3";
    shipment.name = "Personal Courier";
    shipment.delivery_estimate = "1 day";
    shipment.fee = 29000;
    shipment.active = true;
  }
}

function handleSelectPayment(val) {
  if (val == "1") {
    payment.val = "1";
    payment.name = "e-Wallet";
    payment.fee = 15000;
    payment.active = true;
  }

  if (val == "2") {
    payment.val = "2";
    payment.name = "Bank Transfer";
    payment.fee = 15000;
    payment.active = true;
  }

  if (val == "3") {
    payment.val = "3";
    payment.name = "Virtual Account";
    payment.fee = 15000;
    payment.active = true;
  }
}

function backToDelivery() {
  router.push("/delivery");
}

function generateOrderId() {
  let length = 5;
  let chars = "23456789abcdefghijkmnopqrstuvwxyz";
  let result = "";
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)].toUpperCase();
  }
  store.commit("updateOrderId", result);
}

function handlePay() {
  if (shipment.val == "" && payment.val == "") {
    alert("Shipment dan Payment harus dipilih");
  } else if (shipment.val == "") {
    alert("Shipment harus dipilih");
  } else if (payment.val == "") {
    alert("Payment harus dipilih");
  } else {
    generateOrderId();
    store.commit("updateSelectedShipment", shipment.name);
    store.commit("updateDeliveryEstimate", shipment.delivery_estimate);
    store.commit("updateSelectedPayment", payment.name);
    router.push("/finish");
  }
}
</script>

<template>
  <main>
    <div class="row nav items-center">
      <div class="col">
        <img src="@/assets/arrow-left.png" alt="Icon" style="width: 20px" />
      </div>
      <div class="col">
        <span @click="backToDelivery">Back to delivery</span>
      </div>
    </div>
    <div class="row">
      <div class="col col-8">
        <div class="row shipment">
          <div class="col">
            <div class="header">Shipment</div>
          </div>
        </div>
        <div class="row shipment-box-wrapper">
          <div class="col col-4">
            <div
              @click="handleSelectShipment('1')"
              class="shipment-box"
              :class="
                shipment.active === true && shipment.val == '1' ? 'active' : ''
              "
            >
              <div class="row items-center">
                <div class="col-10">
                  <div class="shipment-box-detail">
                    <span>GO-SEND</span>
                    <span class="nominal">15,000</span>
                  </div>
                </div>
                <div
                  v-if="shipment.active === true && shipment.val == '1'"
                  class="col-3"
                >
                  <img src="@/assets/checkmark.png" alt="Icon" />
                </div>
              </div>
            </div>
          </div>
          <div class="col col-4">
            <div
              @click="handleSelectShipment('2')"
              class="shipment-box"
              :class="
                shipment.active === true && shipment.val == '2' ? 'active' : ''
              "
            >
              <div class="row items-center">
                <div class="col-10">
                  <div class="shipment-box-detail">
                    <span>JNE</span>
                    <span class="nominal">9,000</span>
                  </div>
                </div>
                <div
                  v-if="shipment.active === true && shipment.val == '2'"
                  class="col-3"
                >
                  <img src="@/assets/checkmark.png" alt="Icon" />
                </div>
              </div>
            </div>
          </div>
          <div class="col col-4">
            <div
              @click="handleSelectShipment('3')"
              class="shipment-box"
              :class="
                shipment.active === true && shipment.val == '3' ? 'active' : ''
              "
            >
              <div class="row items-center">
                <div class="col-10">
                  <div class="shipment-box-detail">
                    <span>Personal Courier</span>
                    <span class="nominal">29,000</span>
                  </div>
                </div>
                <div
                  v-if="shipment.active === true && shipment.val == '3'"
                  class="col-3"
                >
                  <img src="@/assets/checkmark.png" alt="Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row payment">
          <div class="col">
            <div class="header">Payment</div>
          </div>
        </div>
        <div class="row shipment-box-wrapper">
          <div class="col col-4">
            <div
              @click="handleSelectPayment('1')"
              class="shipment-box"
              :class="
                payment.active === true && payment.val == '1' ? 'active' : ''
              "
            >
              <div class="row items-center">
                <div class="col-10">
                  <div class="shipment-box-detail">
                    <span>e-Wallet</span>
                    <span class="nominal">1,500,000 left</span>
                  </div>
                </div>
                <div
                  v-if="payment.active === true && payment.val == '1'"
                  class="col-3"
                >
                  <img src="@/assets/checkmark.png" alt="Icon" />
                </div>
              </div>
            </div>
          </div>
          <div class="col col-4">
            <div
              @click="handleSelectPayment('2')"
              class="shipment-box"
              :class="
                payment.active === true && payment.val == '2' ? 'active' : ''
              "
            >
              <div class="row items-center">
                <div class="col-10">
                  <div class="shipment-box-detail">
                    <span>Bank Transfer</span>
                    <span class="nominal">1,500,000 left</span>
                  </div>
                </div>
                <div
                  v-if="payment.active === true && payment.val == '2'"
                  class="col-3"
                >
                  <img src="@/assets/checkmark.png" alt="Icon" />
                </div>
              </div>
            </div>
          </div>
          <div class="col col-4">
            <div
              @click="handleSelectPayment('3')"
              class="shipment-box"
              :class="
                payment.active === true && payment.val == '3' ? 'active' : ''
              "
            >
              <div class="row items-center">
                <div class="col-10">
                  <div class="shipment-box-detail">
                    <span>Virtual Account</span>
                    <span class="nominal">1,500,000 left</span>
                  </div>
                </div>
                <div
                  v-if="payment.active === true && payment.val == '3'"
                  class="col-3"
                >
                  <img src="@/assets/checkmark.png" alt="Icon" />
                </div>
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
                  {{ shipment.delivery_estimate }} by {{ shipment.name }}
                </p>
              </div>

              <div class="summary-detail">
                <div class="list">
                  <p>Cost of goods</p>
                  <p>{{ costOfGoods }}</p>
                </div>
                <div class="list">
                  <p>Dropshipping Fee</p>
                  <p>{{ dropshippingFee }}</p>
                </div>
                <div class="list">
                  <p>
                    <b>{{ shipment.name }}</b> shipment
                  </p>
                  <p>{{ shipment.fee }}</p>
                </div>
                <div class="list total">
                  <p>Total</p>
                  <p>{{ total }}</p>
                </div>
              </div>

              <button @click="handlePay" class="btn-payment">
                Pay with {{ payment.name }}
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

.icon-right
  width 20px

textarea
  resize none

label
    position relative
    font-weight: 450

.input
    width 200px
    height 40px
    font-size 18px
    margin-top 20px
    padding 15px
    border 1px solid #cccccc
    &::placeholder
      opacity 0

input[type='checkbox']
  transform scale(2)
  cursor pointer

.label-checkbox
  margin-left -15px

#input-address
  height 90px

.floating-label
    position absolute
    top 0
    left: 15px
    transform translateY(50px)
    font-size 16px
    transition-duration 300ms

label:focus-within > span,
input:not(:placeholder-shown) + span
    transform translateY(30px)
    font-size 14px

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
    -webkit-appearance none
    margin 0

input[type=number]
    -moz-appearance textfield

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
  font-size 20px
  font-weight 550
  background-color #FF8A00
  color #FFFFFF
  border none
  border-radius 2px
  width 300px
  padding 20px 30px
  margin-top 20px
  cursor pointer

  &:hover
    background-color #FFA238

.nav
    cursor pointer
    gap 15px !important

.shipment
  margin-top 15px

.payment
  margin-top 60px

.shipment-box-wrapper
  margin-top 20px

.shipment-box
  display flex
  flex-direction column
  height 40px
  width 200px
  padding 15px
  border 1px solid #cccccc
  cursor pointer

  .nominal
    font-size 18px
    font-weight 600

.shipment-box-detail
  display flex
  flex-direction column

.active
  border 2px solid #20C997
  background-color #E8FBF2
</style>
