<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
            type="text"
            class="form-control"
            placeholder="Search by name"
            v-model="name"
        />
        <div class="input-group-append">
          <button
              class="btn btn-outline-primary"
              type="button"
              @click="searchName"

          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-7">
      <h4>Jewelry List</h4>
      <table class="jewelry-table">
        <th>Name</th>
        <th>Product type</th>
        <th>Price</th>
        <th>Delete</th>
        <th>Edit</th>
        <tr
            :class="{ active: index == currentIndex }"
            v-for="(jewelry, index) in jewelryList"
            :key="index"
            @click="setActiveJewelry(jewelry, index)">
          <td>
            {{ jewelry.name }}
          </td>
          <td>
            {{ jewelry.product_type }}
          </td>
          <td>
            {{ jewelry.price }}
          </td>
          <td>
            <button class="button_delete" @click="deleteJewelry(jewelry.id)">Delete</button>
          </td>
          <td>
            <router-link
                :to="'/tutorials/' + currentJewelry.id"
                class="button_edit"
            > Edit</router-link>
          </td>


        </tr>

      </table>
      <button class="button_remove" @click="removeAllJewelry">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentJewelry.id">
        <h4>Jewelry</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentJewelry.name }}
        </div>
        <div>
          <label><strong>Materials:</strong></label> {{ currentJewelry.materials }}
        </div>
        <div>
          <label><strong>Product Type:</strong></label> {{ currentJewelry.product_type }}
        </div>
        <div>
          <label><strong>Color:</strong></label> {{ currentJewelry.color }}
        </div>
        <div>
          <label><strong>Length:</strong></label> {{ currentJewelry.length }}
        </div>
        <div>
          <label><strong>Price:</strong></label> {{ currentJewelry.price }}
        </div>
        <div>
          <label><strong>Availability:</strong></label> {{ currentJewelry.availability ? "Available" : "Out of Stock" }}
        </div>
        <div>
          <label><strong>Popularity:</strong></label> {{ currentJewelry.popularity }}
        </div>
        <div>
          <label><strong>Brand:</strong></label> {{ currentJewelry.brand }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentJewelry.description }}
        </div>
        <div>
          <label><strong>Added Date:</strong></label> {{ currentJewelry.added_date }}
        </div>

      </div>
      <div v-else>
        <br/>
        <p>Please click on a Jewelry...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import JewelryDataService from "@/services/JewelryDataService";
import Jewelry from "@/types/Jewelry";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "jewelry-list",
  data() {
    return {
      jewelryList: [] as Jewelry[],
      currentJewelry: {} as Jewelry,
      currentIndex: -1,
      name: "",
    };
  },
  methods: {
    retrieveJewelry() {
      JewelryDataService.getAll()
          .then((response: ResponseData) => {
            this.jewelryList = response.data;
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveJewelry();
      this.currentJewelry = {} as Jewelry;
      this.currentIndex = -1;
    },

    setActiveJewelry(jewelry: Jewelry, index = -1) {
      this.currentJewelry = jewelry;
      this.currentIndex = index;
    },

    deleteJewelry(id: any) {
      JewelryDataService.delete(id)
          .then((response: ResponseData) => {
            console.log(response);
            this.refreshList();
          })
          .catch((e: Error) => {
            console.log(e);
          });
    },


    removeAllJewelry() {
      JewelryDataService.deleteAll()
          .then((response: ResponseData) => {
            console.log(response.data);
            this.refreshList();
          })
          .catch((e: Error) => {
            console.log(e);
          });
    },

    searchName() {
      JewelryDataService.findByName(this.name)
          .then((response: ResponseData) => {
            this.jewelryList = response.data;
            this.setActiveJewelry({} as Jewelry);
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.retrieveJewelry();
  },
});
</script>


<style>
.list {
  text-align: center;
  max-width: 750px;
  margin: auto;;
}

.jewelry-table {
  border-collapse: collapse;
  white-space: nowrap;


}

.jewelry-table td {
  padding: 10px;
  white-space: nowrap;
}

table, td, th {
  border: 2px solid cadetblue;
  color: black;

}



.button_edit {
  background-color: #7d38d0;
  border: none;
  color: white;
  padding: 4px 8px;
  text-align: center;
  font-size: 12px;
  margin: 4px 2px;
  opacity: 0.6;
  transition: 0.2s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  border-radius: 10%;
}

.button_edit:hover {opacity: 1}

.button_delete {
  background-color: #229df1;
  border: none;
  color: white;
  padding: 4px 8px;
  text-align: center;
  font-size: 12px;
  margin: 4px 2px;
  opacity: 0.6;
  transition: 0.2s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  border-radius: 10%;
}

.button_delete:hover {opacity: 1}

.button_remove {
  background-color: #229df1;
  border: none;
  color: white;
  padding: 4px 8px;
  text-align: center;
  font-size: 12px;
  margin: 10px 10px;
  opacity: 0.6;
  transition: 0.2s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  border-radius: 10%;
}

.button_remove:hover {opacity: 1}

h4{
  font-family: "Imprint MT Shadow" ;
  text-align: center;
}

p{
  font-family: "Imprint MT Shadow";
}

body {
  background-image: url("blue.jpg");
  background-color: rgba(204, 204, 204, 0.1);
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;

}

.form-control{
  background-color: #7ceae2;
}

</style>
