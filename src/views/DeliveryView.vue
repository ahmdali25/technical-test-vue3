<script setup>
import router from "@/router";
import { ref, reactive, computed } from "vue";
import { watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const delivery = reactive({
  email: "",
  phone_number: "",
  dropshipper_name: "",
  dropshipper_phone_number: "",
  delivery_address: "",
});

const invalidEmail = ref(false);
const isInputEmail = ref(false);
const isInputPhoneNumber = ref(false);
const invalidPhoneNumber = ref(false);
const isInputDropshipperPhoneNumber = ref(false);
const invalidDropshipperPhoneNumber = ref(false);
const isInputDeliveryAddress = ref(false);
const invalidDeliveryAddress = ref(false);
const counterAddress = ref(0);
const showCounterAddress = ref(false);
const invalidDropshipperName = ref(false);
const isInputDropshipperName = ref(false);

const dropshipper = ref("");
const disableForm = ref(true);
const disableBtn = ref(true);
const cost = ref(500000);
const dropshippingFee = ref(0);

watch(dropshipper, (newDropshipper) => {
  if (newDropshipper) {
    disableForm.value = false;
    disableBtn.value = false;
    dropshippingFee.value = 5900;
  } else {
    disableForm.value = true;
    disableBtn.value = true;
    dropshippingFee.value = 0;
    clearForm();
  }
});

function clearForm() {
  let emailElement = document.getElementById("input-email");
  let phoneNumberElement = document.getElementById("input-phone-number");
  let deliveryAddressElement = document.getElementById(
    "input-delivery-address"
  );
  let dropshipperNameElement = document.getElementById(
    "input-dropshipper-name"
  );
  let dropshipperPhoneNumberElement = document.getElementById(
    "input-dropshipper-phone-number"
  );

  // Clear Form
  delivery.email = "";
  delivery.phone_number = "";
  delivery.dropshipper_name = "";
  delivery.dropshipper_phone_number = "";
  delivery.delivery_address = "";

  // Remove Invalid
  isInputEmail.value = false;
  isInputPhoneNumber.value = false;
  isInputDeliveryAddress.value = false;
  isInputDropshipperName.value = false;
  isInputDropshipperPhoneNumber.value = false;
  emailElement.classList.remove("invalid");
  phoneNumberElement.classList.remove("invalid");
  deliveryAddressElement.classList.remove("invalid");
  dropshipperNameElement.classList.remove("invalid");
  dropshipperPhoneNumberElement.classList.remove("invalid");
}

const total = computed(() => {
  return cost.value + dropshippingFee.value;
});

function handleInputEmail(e) {
  isInputEmail.value = true;
  let classList = e.target.classList;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
    invalidEmail.value = false;
    classList.add("valid");
  } else {
    invalidEmail.value = true;
    classList.add("invalid");
  }
}

function handleInputPhoneNumber(e) {
  isInputPhoneNumber.value = true;
  let numbers = /^[-+,]?[0-9]+$/;
  let classList = e.target.classList;
  if (numbers.test(e.target.value)) {
    if (e.target.value.length < 6) {
      invalidPhoneNumber.value = true;
      classList.remove("valid");
      classList.add("invalid");
    } else if (e.target.value.length >= 20) {
      invalidPhoneNumber.value = true;
      classList.remove("valid");
      classList.add("invalid");
    } else {
      invalidPhoneNumber.value = false;
      classList.remove("invalid");
      classList.add("valid");
    }
  }
}

function handleInputDropshipperPhoneNumber(e) {
  isInputDropshipperPhoneNumber.value = true;
  let numbers = /^[-+,]?[0-9]+$/;
  let classList = e.target.classList;
  if (numbers.test(e.target.value)) {
    if (e.target.value.length < 6) {
      invalidDropshipperPhoneNumber.value = true;
      classList.remove("valid");
      classList.add("invalid");
    } else if (e.target.value.length >= 20) {
      invalidDropshipperPhoneNumber.value = true;
      classList.remove("valid");
      classList.add("invalid");
    } else {
      invalidDropshipperPhoneNumber.value = false;
      classList.remove("invalid");
      classList.add("valid");
    }
  }
}

function handleInputDeliveryAddress(e) {
  isInputDeliveryAddress.value = true;
  let classList = e.target.classList;
  if (e.target.value.length === 0 || e.target.value.length > 120) {
    invalidDeliveryAddress.value = true;
    classList.remove("valid");
    classList.add("invalid");
  } else {
    invalidDeliveryAddress.value = false;
    classList.remove("invalid");
    classList.add("valid");
    counterAddress.value = 120 - e.target.value.length;
    showCounterAddress.value = true;
  }
}

function handleInputDropshipperName(e) {
  isInputDropshipperName.value = true;
  let classList = e.target.classList;
  if (e.target.value.length === 0) {
    invalidDropshipperName.value = true;
    classList.remove("valid");
    classList.add("invalid");
  } else {
    invalidDropshipperName.value = false;
    classList.remove("invalid");
    classList.add("valid");
  }
}

function onSubmit() {
  let emailElement = document.getElementById("input-email");
  let phoneNumberElement = document.getElementById("input-phone-number");
  let deliveryAddressElement = document.getElementById(
    "input-delivery-address"
  );
  let dropshipperNameElement = document.getElementById(
    "input-dropshipper-name"
  );
  let dropshipperPhoneNumberElement = document.getElementById(
    "input-dropshipper-phone-number"
  );

  if (delivery.email == "" && delivery.phone_number == "") {
    // invalid email
    isInputEmail.value = true;
    invalidEmail.value = true;
    emailElement.classList.add("invalid");
    // invalid phone number
    isInputPhoneNumber.value = true;
    invalidPhoneNumber.value = true;
    phoneNumberElement.classList.add("invalid");
    // invalid delivery address
    isInputDeliveryAddress.value = true;
    invalidDeliveryAddress.value = true;
    deliveryAddressElement.classList.add("invalid");
    // invalid dropshipper name
    isInputDropshipperName.value = true;
    invalidDropshipperName.value = true;
    dropshipperNameElement.classList.add("invalid");
    // invalid dropshipper phone number
    isInputDropshipperPhoneNumber.value = true;
    invalidDropshipperPhoneNumber.value = true;
    dropshipperPhoneNumberElement.classList.add("invalid");
    return false;
  }

  store.commit("updateCostOfGoods", cost.value);
  store.commit("updateDropshippingFee", dropshippingFee.value);
  store.commit("updateTotal", total);
  router.push("/payment");
}
</script>

<template>
  <main class="main">
    <div class="row">
      <div class="col col-8">
        <div class="row space-between items-center">
          <div class="col">
            <div class="header">Delivery details</div>
          </div>
          <div class="col">
            <div class="row">
              <input
                v-model="dropshipper"
                type="checkbox"
                id="input-checkbox"
                value="0"
              />
              <label for="input-checkbox" class="label-checkbox"
                >Send as dropshipper</label
              >
            </div>
          </div>
        </div>
        <form id="form-delivery" @submit.prevent="onSubmit" class="row">
          <div class="col">
            <label for="input-email">
              <input
                id="input-email"
                class="input"
                v-model="delivery.email"
                type="email"
                name="email"
                placeholder="Email"
                @keyup="handleInputEmail($event)"
                :disabled="disableForm"
              />
              <div v-if="isInputEmail">
                <img
                  v-if="invalidEmail"
                  class="icon-check"
                  src="@/assets/cross.png"
                  alt="Icon"
                />
                <img
                  v-else
                  class="icon-check"
                  src="@/assets/checkmark.png"
                  alt="Icon"
                />
              </div>
              <span class="floating-label">Email</span>
            </label>

            <label for="input-phone-number"
              ><input
                id="input-phone-number"
                class="input"
                v-model="delivery.phone_number"
                type="number"
                name="phone-number"
                placeholder="Phone Number"
                @input="handleInputPhoneNumber($event)"
                :disabled="disableForm"
              />
              <div v-if="isInputPhoneNumber">
                <img
                  v-if="invalidPhoneNumber"
                  class="icon-check"
                  src="@/assets/cross.png"
                  alt="Icon"
                />
                <img
                  v-else
                  class="icon-check"
                  src="@/assets/checkmark.png"
                  alt="Icon"
                />
              </div>
              <span class="floating-label">Phone Number</span></label
            >

            <label for="input-delivery-address">
              <textarea
                id="input-delivery-address"
                class="input"
                type="text"
                v-model="delivery.address"
                name="address"
                placeholder="Delivery Address"
                @input="handleInputDeliveryAddress($event)"
                :disabled="disableForm"
              />
              <div v-if="isInputDeliveryAddress">
                <img
                  v-if="invalidDeliveryAddress"
                  class="icon-check"
                  src="@/assets/cross.png"
                  alt="Icon"
                />
                <img
                  v-else
                  class="icon-check"
                  src="@/assets/checkmark.png"
                  alt="Icon"
                />
              </div>
              <span class="floating-label">Delivery Address</span>
            </label>
            <span v-if="showCounterAddress" id="counter-address"
              >{{ counterAddress }} characters left</span
            >
          </div>
          <div class="col">
            <label for="input-dropshipper-name">
              <input
                id="input-dropshipper-name"
                class="input"
                type="text"
                v-model="delivery.name"
                name="dropshipper-name"
                placeholder="Dropshipper name"
                @input="handleInputDropshipperName($event)"
                :disabled="disableForm"
              />
              <div v-if="isInputDropshipperName">
                <img
                  v-if="invalidDropshipperName"
                  class="icon-check"
                  src="@/assets/cross.png"
                  alt="Icon"
                />
                <img
                  v-else
                  class="icon-check"
                  src="@/assets/checkmark.png"
                  alt="Icon"
                />
              </div>
              <span class="floating-label">Dropshipper name</span>
            </label>

            <label for="input-dropshipper-phone-number">
              <input
                id="input-dropshipper-phone-number"
                class="input"
                type="number"
                v-model="delivery.dropshipper_phone_number"
                name="dropshipper-phone-number"
                placeholder="Dropshipper phone number"
                @input="handleInputDropshipperPhoneNumber($event)"
                :disabled="disableForm"
              />
              <div v-if="isInputDropshipperPhoneNumber">
                <img
                  v-if="invalidDropshipperPhoneNumber"
                  class="icon-check"
                  src="@/assets/cross.png"
                  alt="Icon"
                />
                <img
                  v-else
                  class="icon-check"
                  src="@/assets/checkmark.png"
                  alt="Icon"
                />
              </div>
              <span class="floating-label">Dropshipper phone number</span>
            </label>
          </div>
        </form>
      </div>
      <div class="col col-3">
        <div class="row">
          <div class="col">
            <div class="summary">
              <div class="title">Summary</div>
              <div class="items">10 items purchased</div>

              <div class="summary-detail">
                <div class="list">
                  <p>Cost of goods</p>
                  <p>
                    <b>{{ cost }}</b>
                  </p>
                </div>
                <div class="list">
                  <p>Dropshipping fee</p>
                  <p>
                    <b>{{ dropshippingFee }}</b>
                  </p>
                </div>
                <div class="list total">
                  <p>Total</p>
                  <p>
                    <b>{{ total }}</b>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                :disabled="disableBtn"
                form="form-delivery"
                class="btn-payment"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="stylus">
main
  height 550px
  margin 55px 50px
  padding-top 72px
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
    font-weight 450

.input
    width 340px
    height 60px
    margin-top 20px
    padding 15px
    border 1px solid #cccccc
    &::placeholder
      opacity 0

.input:focus
  outline none

.icon-check
  position absolute
  top 50px
  right 20px

.invalid
  border 2px solid #FF8A00

.valid
  border 2px solid #20C997

input[type='checkbox']
  transform scale(2)
  cursor pointer

.label-checkbox
  margin-left -15px

#input-delivery-address
  font-family 'Montserrat', sans-serif
  height 90px
  padding-top 40px

.floating-label
    position absolute
    top 0
    left 15px
    transform translateY(50px)
    font-size 20px
    transition-duration 300ms

label:focus-within > span,
input:not(:placeholder-shown) + span
    transform translateY(35px)
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

  .summary-detail
    margin-top 140px

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
</style>
