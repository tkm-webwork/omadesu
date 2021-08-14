<template>
  <div>
    <div class="container" style="position: relative">
      <div class="loading"></div>
      <!-- form -->
      <b-form
        @submit.prevent="addCard"
        enctype="multipart/form-data"
        class="form-create"
      >
        <!-- title -->
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8">
            <b-form-group label="タイトル" label-for="title">
              <b-form-input
                id="title"
                v-model="card.title"
                required
                placeholder="タイトル"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <!-- image upload -->
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8">
            <b-form-file
              v-model="card.image"
              placeholder="画像ファイルを選択してください"
              drop-placeholder="画像ファイルをドラッグ＆ドロップしてください"
              accept="image"
              id="image"
              class="mt-3"
              required
              plain
            ></b-form-file>
          </div>
        </div>
        <!-- submit -->
        <div class="row justify-content-center mt-4">
          <div class="col-12 col-sm-2">
            <b-button block type="submit" variant="outline-light"
              >新規投稿</b-button
            >
          </div>
        </div>
        <div class="mt-3 text-center">
      </div>
      </b-form>
    </div>
    <div class="mt-5 text-center">
      <nuxt-link to="/" class="back">トップページに戻る</nuxt-link>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      card: {
        title: null,
        image: null,
      },
    };
  },
  methods: {
    addCard() {
      document.querySelector(".loading").style.display = "block";

      let card = {
        id: uuidv4(),
        user: {
          uid: this.$localStorage.get("user_uid"),
          name: this.$localStorage.get("user_name"),
        },
        title: this.card.title,
        image: this.card.image,
      };

      this.$store
        .dispatch("card/uploadImage", {
          name: card.id,
          file: card.image,
        })
        .then((image) => {
          card.image = image;
          this.$store.dispatch("card/addCard", card).then(() => {
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          });
        });
    },
  },
  created() {
    if (!this.$store.state.users.user.uid) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.form-create {
  color: #fff;
}
</style>