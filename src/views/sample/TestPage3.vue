<template>
  <GoogleLogin :params="params" :onSuccess="onSuccess">Login</GoogleLogin>
</template>



<script>
import GoogleLogin from "vue-google-login";

export default {
  name: "TestPage",
  data() {
    return {
      params: {
        client_id:
          "56019965047-0t3qrkpa4420if93b557lp6ub32ah2e4.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  created() {},
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    }
  },
  computed: {},
  components: {
    GoogleLogin
  }
};
</script>
<style lang="scss" scoped>
</style>