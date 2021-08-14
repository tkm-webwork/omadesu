<template>
  <div>
    <div class="container" style="position: relative">
      <div class="loading"></div>
      <div class="row justify-content-center" id="content">
        <div class="col-12 col-lg-8">
          <!-- nobodyをつけるとb-media-bodyをレンダリングしない -->
          <b-card no-body>
            <!-- head -->
            <b-card-body>
              <div class="cards-box">
                <b-card-title>{{ $store.state.card.card.title }}</b-card-title>
                <div class="card-like">
                  <img
                    src="https://img.icons8.com/officel/20/000000/hearts.png"
                    class="like"
                    @click.prevent="likeCard()"
                    :class="{ grayscale: !$store.state.card.card.like }"
                  />
                  <div
                    class="text-center card-like__number"
                    v-if="$store.state.card.card.like"
                  >
                    {{ $store.state.card.card.like }}
                  </div>
                </div>
              </div>
            </b-card-body>
            <!-- image -->
            <b-card-img :src="$store.state.card.card.image"></b-card-img>
            <!-- info -->
            <b-card-body>
              <div class="position-relative">
                <div
                  class="position-top-right"
                  v-if="$store.state.card.isOwner"
                >
                  <nuxt-link
                    :to="{
                      name: 'cards-edit-id',
                      params: { id: $store.state.card.card.id },
                    }"
                  >
                    編集
                  </nuxt-link>
                  /
                  <a href="#" @click.prevent="deleteCard()">削除</a>
                </div>
              </div>
              <b-card-text>
                by {{ $store.state.card.card.user.name }},
                {{
                  $store.state.card.card.created_at.toDate().toLocaleString()
                }}
              </b-card-text>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </div>
    <div class="mt-3 text-center">
      <nuxt-link to="/" class="back">トップページに戻る</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deleteCard() {
      if (!confirm("本当に削除しますか？")) return;
      document.querySelector(".loading").style.display = "block";
      const card = this.$store.state.card.card;
      this.$store.dispatch("card/deleteFile", { name: card.id });
      this.$store.dispatch("card/deleteCard", { card }).then(() => {
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      });
    },
    likeCard() {
      const card = this.$store.state.card.card;
      this.$store.commit("card/updateCardLike");
      this.$store.dispatch("card/likeCard", { card });
    },
  },
  created() {
    const id = this.$route.params.id;
    const user = this.$store.state.users.user;

    this.$store.dispatch("card/fetchCard", { id }).then((result) => {
      if (result === 404) {
        this.$router.push("/error/404");
      } else {
        document.querySelector("#content").classList.add("visible");

        if (user.uid === this.$store.state.card.card.user.uid) {
          this.$store.commit("card/setIsOwner", true);
        }

        const card = this.$store.state.card.card;
        this.$store
          .dispatch("card/fetchUserCards", { user: card.user, limit: 9 })
          .then(() => {
            this.$store.commit("card/updateUserCards", { card, max: 8 });
          });
      }
    });
  },
};
</script>