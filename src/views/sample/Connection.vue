<template>
  <div class="login">
    <div class="card">
      <button type="button" @click="google">
        <img src="@/assets/images/google_logo.png" />
      </button>
    </div>
  </div>
</template>

<script>
import Firebase from "firebase";

export default {
  name: "Connection",
  data() {
    return {
      app: "",
    };
  },
  created() {
    if (!Firebase.apps.length) {
      const config = {
        apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
        appId: process.env.VUE_APP_FIREBASE_APP_ID,
        projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
        authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      };
      this.app = Firebase.initializeApp(config);
    }
  },
  methods: {
    google() {
      const provider = new Firebase.auth.GoogleAuthProvider();
      Firebase.auth()
        .signInWithPopup(provider)
        .then(async (user) => {
          let idToken;
          await Firebase.auth()
            .currentUser.getIdToken(true)
            .then((res) => (idToken = res));

          console.log(idToken);
        });
    },
  },
  computed: {},
  components: {},
};
</script>
