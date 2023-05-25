<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="jewelry.name"
            name="name"
        />
      </div>

      <div class="form-group">
        <label for="materials">Materials</label>
        <input
            type="text"
            class="form-control"
            id="materials"
            required
            v-model="jewelry.materials"
            name="materials"
        />
      </div>

      <div class="form-group">
        <label for="productType">Product Type</label>
        <input
            type="text"
            class="form-control"
            id="productType"
            required
            v-model="jewelry.product_type"
            name="productType"
        />
      </div>

      <div class="form-group">
        <label for="color">Color</label>
        <input
            type="text"
            class="form-control"
            id="color"
            required
            v-model="jewelry.color"
            name="color"
        />
      </div>

      <div class="form-group">
        <label for="length">Length</label>
        <input
            type="text"
            class="form-control"
            id="length"
            required
            v-model="jewelry.length"
            name="length"
        />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
            type="text"
            class="form-control"
            id="price"
            required
            v-model="jewelry.price"
            name="price"
        />
      </div>

      <div class="form-group">
        <label for="addedDate">Added Date</label>
        <input
            type="date"
            class="form-control"
            id="addedDate"
            required
            v-model="jewelry.added_date"
            name="addedDate"
        />
      </div>

      <div class="form-group">
        <label for="availability">Availability</label>
        <input
            type="checkbox"
            class="form-control"
            id="availability"
            v-model="jewelry.availability"
            name="availability"
        />
      </div>

      <div class="form-group">
        <label for="popularity">Popularity</label>
        <input
            type="number"
            class="form-control"
            id="popularity"
            required
            v-model="jewelry.popularity"
            name="popularity"
        />
      </div>


      <div class="form-group">
        <label for="brand">Brand</label>
        <input
            type="text"
            class="form-control"
            id="brand"
            required
            v-model="jewelry.brand"
            name="brand"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
            class="form-control"
            id="description"
            required
            v-model="jewelry.description"
            name="description"
        ></textarea>
      </div>

      <button @click="saveJewelry" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newJewelry">Add</button>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent } from "vue";
import JewelryDataService from "@/services/JewelryDataService";
import Jewelry from "@/types/Jewelry";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-jewelry",
  data() {
    return {
      jewelry: {
        id: null,
        name: "",
        materials: "",
        product_type: "",
        color: "",
        length: 0,
        price: 0,
        availability: false,
        popularity: 0,
        brand: "",
        description: "",
        added_date: new Date()
      } as Jewelry,
      submitted: false
    };
  },
  methods: {
    saveJewelry() {
      let data = {
        name: this.jewelry.name,
        materials: this.jewelry.materials,
        product_type: this.jewelry.product_type,
        color: this.jewelry.color,
        length: this.jewelry.length,
        price: this.jewelry.price,
        availability: this.jewelry.availability,
        popularity: this.jewelry.popularity,
        brand: this.jewelry.brand,
        description: this.jewelry.description,
        added_date: new Date()
      };

      JewelryDataService.create(data)
          .then((response: ResponseData) => {
            this.jewelry.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e: Error) => {
            console.log(e);
          });
    },
    newJewelry() {
      this.submitted = false;
      this.jewelry = {
        id: null,
        name: "",
        materials: "",
        product_type: "",
        color: "",
        length: 0,
        price: 0,
        availability: false,
        popularity: 0,
        brand: "",
        description: "",
        added_date: new Date()
      } as Jewelry;
    }
  }
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.btn-success{
  width:100%;
}
</style>
