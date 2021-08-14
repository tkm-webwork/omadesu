<template>
  <div>
    <div class="container">
      <div id="content" class="grid-wrap">
        <div
          class="grid"
          v-for="(card, key) in $store.state.cards.cards"
          :key="key"
        >
          <nuxt-link :to="{ name: 'cards-id', params: { id: card.id } }">
            <b-card :img-src="card.image" img-top>
              <div class="cards-box">
                <b-card-title>{{ card.title }}</b-card-title>
                <div class="card-like">
                  <img
                    src="https://img.icons8.com/officel/20/000000/hearts.png"
                    class="like"
                    @click.prevent="likeCard(card)"
                    :class="{ grayscale: !card.like }"
                  />
                  <div class="card-like__number" v-if="card.like">
                    {{ card.like }}
                  </div>
                </div>
              </div>
            </b-card>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    likeCard(card) {
      this.$store.commit("cards/updateCardLike", { card });
      this.$store.dispatch("card/likeCard", { card });
    },
  },
  created() {
    this.$store.dispatch("cards/fetchCards").then(() => {
      if (process.client) {
        document.querySelector("#content").classList.add("visible");
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => {
        this.$nuxt.$loading.finish();
      }, 3000);
    });
  },
};
</script>