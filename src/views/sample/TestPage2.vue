<template>
  <button v-google-signin-button="clientId" class="google-signin-button">
    Continue with Google
  </button>
</template>



<script>
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  directives: {
    GoogleSignInButton
  },
  name: "TestPage",
  data() {
    return {
      clientId:
        "56019965047-0t3qrkpa4420if93b557lp6ub32ah2e4.apps.googleusercontent.com&KzUWksdB5Eu66LNLhub7B2s4"
    };
  },
  created() {},
  methods: {
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      console.log("Dsd");
      console.log("dd", idToken);
    },
    OnGoogleAuthFail(error) {
      console.log("error", error);
    }
  },
  computed: {},
  components: {}
};
</script>
<style lang="scss" scoped>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>