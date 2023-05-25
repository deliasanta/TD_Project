<template>
  <div v-if="currentJewelry.id" class="edit-form">
    <h4>Jewelry</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input
            type="text"
            class="form-control"
            id="name"
            v-model="currentJewelry.name"
        />
      </div>
      <div class="form-group">
        <label for="materials">Materials</label>
        <input
            type="text"
            class="form-control"
            id="materials"
            v-model="currentJewelry.materials"
        />
      </div>

      <div class="form-group">
        <label for="product_type">Product Type</label>
        <input
            type="text"
            class="form-control"
            id="product_type"
            v-model="currentJewelry.product_type"
        />
      </div>

      <div class="form-group">
        <label for="color">Color</label>
        <input
            type="text"
            class="form-control"
            id="color"
            v-model="currentJewelry.color"
        />
      </div>

      <div class="form-group">
        <label for="length">Length</label>
        <input
            type="text"
            class="form-control"
            id="length"
            v-model="currentJewelry.length"
        />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
            type="text"
            class="form-control"
            id="price"
            v-model="currentJewelry.price"
        />
      </div>

      <div class="form-group">
        <label for="availability">Availability</label>
        <input
            type="checkbox"
            class="form-control"
            id="availability"
            v-model="currentJewelry.availability"
        />
      </div>

      <div class="form-group">
        <label for="popularity">Popularity</label>
        <input
            type="text"
            class="form-control"
            id="popularity"
            v-model="currentJewelry.popularity"
        />
      </div>


      <div class="form-group">
        <label for="brand">Brand</label>
        <input
            type="text"
            class="form-control"
            id="brand"
            v-model="currentJewelry.brand"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
            class="form-control"
            id="description"
            v-model="currentJewelry.description"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="added_date">Added Date</label>
        <input
            type="text"
            class="form-control"
            id="added_date"
            v-model="currentJewelry.added_date"
        />
      </div>

    </form>

    <button
        class="badge badge-primary mr-2"
        v-if="currentJewelry.availability"
        @click="updateAvailability(false)"
    >
      Set Unavailable
    </button>
    <button
        v-else
        class="badge badge-primary mr-2"
        @click="updateAvailability(true)"
    >
      Set Available
    </button>

    <button
        type="submit"
        class="badge badge-success"
        @click="updateJewelry"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Jewelry...</p>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import JewelryDataService from "@/services/JewelryDataService";
import Jewelry from "@/types/Jewelry";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "jewelry",
  data() {
    return {
      currentJewelry: {} as Jewelry,
      message: "",
    };
  },
  methods: {
    getJewelry(id: any) {
      JewelryDataService.get(id)
          .then((response) => {
            this.currentJewelry = response.data;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    updateAvailability(status: boolean) {
      let data = {
        id: this.currentJewelry.id,
        name: this.currentJewelry.name,
        materials: this.currentJewelry.materials,
        product_type: this.currentJewelry.product_type,
        color: this.currentJewelry.color,
        length: this.currentJewelry.length,
        price: this.currentJewelry.price,
        availability: status,
        popularity: this.currentJewelry.popularity,
        brand: this.currentJewelry.brand,
        description: this.currentJewelry.description,
        added_date: this.currentJewelry.added_date
      };

      JewelryDataService.update(this.currentJewelry.id, data)
          .then((response:ResponseData) => {
            console.log(response.data);
            this.currentJewelry.availability = status;
            this.message = "The availability was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
    },

    updateJewelry() {
      JewelryDataService.update(this.currentJewelry.id, this.currentJewelry)
          .then((response:ResponseData) => {
            console.log(response.data);
            this.message = "The jewelry was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
    },

    deleteJewelry() {
      JewelryDataService.delete(this.currentJewelry.id)
          .then((response:ResponseData) => {
            console.log(response.data);
            this.$router.push({ name: "jewelries" });
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.message = "";
    this.getJewelry(this.$route.params.id);
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
h4{
  font-family: "Imprint MT Shadow";
  text-align: center;
}
</style>
