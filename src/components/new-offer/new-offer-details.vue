<template>
  <div :class="$style.details">
    <div :class="$style.details__row">
      <div :class="$style.row">
        <div :class="$style.row__col">
          <div :class="$style.col">
            <h2 :class="$style.header">Адрес</h2>
            <details-address v-model="local" @stateChange="onStateChange" />
          </div>
        </div>
        <div :class="$style.row__col">
          <div :class="$style.col">
            <h2 :class="$style.header">Параметры</h2>
            <details-apartment v-model="local" @stateChange="onStateChange" v-if="local.object === 1" />
            <details-room v-model="local" @stateChange="onStateChange" v-if="local.object === 2" />
            <details-commercial v-model="local" @stateChange="onStateChange" v-if="local.object === 3" />
            <details-cottage v-model="local" @stateChange="onStateChange" v-if="local.object === 4" />
            <details-garage v-model="local" @stateChange="onStateChange" v-if="local.object === 5" />
            <details-land v-model="local" @stateChange="onStateChange" v-if="local.object === 6" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/style.scss";

  .details {
    @media(max-width: $bp-large) {
      .row__col { width: 100%; float: none; }
    }
  }

  .details__row {
    position: relative;
    margin: 0 -10px;
  }

  .row {
    position: relative;
    &:after { @include clearfix }
  }

  .row__col {
    padding: 0 10px;
    float: left;
    width: 50%;
  }

  .col {
    position: relative;
    border: 1px solid #c2cad8;
    padding: 15px;
    margin-top: 20px;
    background-color: #fff;
  }

  .header {
    font-size: 22px;
    font-weight: 300;
    color: #444;
    margin: 0;
  }

</style>

<script>
  import DetailsAddress from './details-address.vue';
  import DetailsApartment from './details-apartment.vue';
  import DetailsRoom from './details-room.vue';
  import DetailsCommercial from './details-commercial.vue';
  import DetailsCottage from './details-cottage.vue';
  import DetailsGarage from './details-garage.vue';
  import DetailsLand from './details-land.vue';

  export default {
    name: 'new-offer-details',
    props: ['value'],
    components: { DetailsAddress, DetailsApartment, DetailsRoom, DetailsCommercial, DetailsCottage, DetailsGarage, DetailsLand },
    data() {
      return {
        local: this.value,
        fieldsGroup: {
          address: false, //TODO ITs BUG!
          parameters: false
        }
      }
    },
    watch: {
      value() {
        this.local = this.value
      },
      isValid(value) {
        this.$emit('stateChange', value, 'details')
      }
    },
    computed: {
      isValid() {
        let fieldsGroup = this.fieldsGroup;
        let res = Object.keys(fieldsGroup).every( grp => fieldsGroup[grp]);
        return res;
      }
    },
    methods: {
      onStateChange(value, group) {
        this.fieldsGroup[group] = value;
      }
    }
  }
</script>