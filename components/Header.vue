<template>
  <!-- bootstrap navbar -->
  <b-navbar variant="dark" type="light" class="header mb-2">
    <div class="container">
      <!-- bootstrap logo -->
      <b-navbar-brand to="/"> #お前らのPCデスク周り晒していけ </b-navbar-brand>
      <!-- bootstrap navigation -->
      <b-navbar-nav class="ml-auto">
        <!-- 未ログイン時　ログインボタンを表示 -->
        <template v-if="$store.state.users.user.uid === null">
          <!-- google login -->
          <b-button @click="login" class="login-button">
            Google アカウントでログイン
          </b-button>
        </template>
        <!-- ログイン時 メニューを表示 -->
        <template v-else>
          <!-- menu -->
          <b-nav-item-dropdown>
            <template v-slot:button-content>
              {{ $store.state.users.user.name }}
            </template>
            <b-dropdown-item to="/cards/create">新規投稿</b-dropdown-item>
            <b-dropdown-item to="/user">投稿一覧</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout()"
              >ログアウト</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </template>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch("users/login").then(() => {
        this.$localStorage.set("user_uid", this.$store.state.users.user.uid);
        this.$localStorage.set("user_name", this.$store.state.users.user.name);
        this.$router.push("/");
      });
    },
    logout() {
      this.$localStorage.remove("user_uid");
      this.$localStorage.remove("user_name");
      this.$store.commit("users/setUser", { uid: null, displayName: null });
      this.$router.push("/");
    },
  },
  mounted() {
    const user = {
      uid: this.$localStorage.get("user_uid", null),
      displayName: this.$localStorage.get("user_name", null),
    };
    this.$store.commit("users/setUser", user);
  },
};
</script>