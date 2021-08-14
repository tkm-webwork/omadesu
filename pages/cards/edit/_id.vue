<template>
  <div>
    <div class="container" style="position: relative" id="content">
      <div class="loading"></div>
      <!-- form -->
      <b-form
        @submit.prevent="updateCard"
        enctype="multipart/form-data"
        class="form-create"
      >
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8">
            <!-- title -->
            <b-form-group label="タイトル" label-for="title">
              <b-form-input
                id="title"
                :value="$store.state.card.card.title"
                required
                placeholder="タイトル"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8">
            <!-- image upload -->
            <b-form-file
              placeholder="画像ファイルを選択してください"
              drop-placeholder="画像ファイルをドラッグ＆ドロップしてください"
              accept="image"
              id="image"
              class="mt-3 mb-3"
              plain
            ></b-form-file>
            <img :src="$store.state.card.card.image" class="img-fluid" />
          </div>
        </div>
        <div class="row justify-content-center mt-4">
          <div class="col-12 col-sm-2">
            <!-- submit -->
            <b-button block type="submit" variant="outline-light"
              >編集</b-button
            >
          </div>
        </div>
      </b-form>
    </div>
    <div class="mt-4 mb-4 text-center">
      <nuxt-link to="/" class="back">トップページに戻る</nuxt-link>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  methods: {
    updateCard(e) {
      document.querySelector(".loading").style.display = "block";

      let card = {
        old_id: this.$store.state.card.card.id,
        new_id: uuidv4(),
        user: {
          uid: this.$localStorage.get("user_uid"),
          name: this.$localStorage.get("user_name"),
        },
        title: e.target.title.value,
        image: e.target.image.files[0],
      };
      if (card.image) {
        this.$store
          .dispatch("card/uploadImage", {
            name: card.new_id,
            file: card.image,
          })
          .then((image) => {
            card.image = image;
            this.$store.dispatch("card/updateCard", card).then(() => {
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            });
          });
      } else {
        card.image = this.$store.state.card.card.image;
        this.$store.dispatch("card/updateCard", card).then(() => {
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        });
      }
    },
  },
  created() {
    const id = this.$route.params.id;
    const user = this.$store.state.users.user;
    this.$store.dispatch("card/fetchCard", { id }).then(() => {
      document.querySelector("#content").classList.add("visible");
      const card = this.$store.state.card.card;
      if (!user.uid) {
        this.$router.push("/");
      } else if (user.uid !== card.user.uid) {
        this.$router.push("/");
      }
    });
  },
};
</script>

<style scoped>
.form-create {
  color: #fff;
}
</style>
