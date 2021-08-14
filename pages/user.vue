<template>
  <div>
    <div class="container" style="position: relative">
      <div class="loading"></div>
      <div class="row justify-content-center">
        <!-- cards -->
        <div
          class="col-12 col-sm-8 py-3 px-0 border-bottom small cards-text"
          v-for="(card, key) in $store.state.cards.cards"
          v-bind:key="key"
        >
          <div class="cards-box">
            <div class="cards-info">
              <img :src="card.image" width="48" height="48" class="mr-2" />
              <h5 class="mb-1">
                <nuxt-link
                  :to="{
                    name: 'cards-id',
                    params: { id: card.id, card: card },
                  }"
                >
                  {{ card.title }}
                </nuxt-link>
              </h5>
            </div>
            <div class="cards-edit">
              <nuxt-link
                :to="{
                  name: 'cards-edit-id',
                  params: { id: card.id, card: card },
                }"
                >編集</nuxt-link
              >
              /
              <a href="#" @click.prevent="deleteCard(card)">削除</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 mb-5 text-center">
      <nuxt-link to="/" class="back">トップページに戻る</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deleteCard(card) {
      if (!confirm("本当に削除しますか？")) return;
      document.querySelector(".loading").style.display = "block";
      this.$store.dispatch("card/deleteFile", { name: card.id });
      this.$store.dispatch("card/deleteCard", { card: card }).then(() => {
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      });
    },
  },
  created() {
    const user = this.$store.state.users.user;
    const max = 1000;
    this.$store.dispatch("card/fetchUserCards", { user: user, limit: max });
  },
};
</script>
